import { utilisateurConnecte } from './module.js';

window.onload = init;

function init() {
    initialisation();
    document.querySelectorAll('img').forEach((elem) => {
        elem.addEventListener('click', compar);
    });
    document.addEventListener('keydown', function(event) {
        if(event.key === ' ') {
            init();
        }
    });
    gestionScores();
    document.addEventListener('keydown', doKonamiCode);
}

let cliqueAB = 0;
let nbCoups = 0;
const NB_PAIRES = combienDePaires();
const NB_CASES = NB_PAIRES * 2;
let theme = JSON.parse(utilisateurConnecte()).THEME;
let extension = quelleExtension(theme);
let question = '../ressources/question.svg';

let carteA;
let carteB;
let nbPairesTrouvees = 0;
let disposition = new Array(NB_CASES);
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiCompteur = 0;



function compar(event) {
    console.log('fonction compar');
    cliqueAB++;


    if (cliqueAB == 1) {
        carteA = this.id;
        affichageCarte(carteA);
        console.log('valeur carteA');
    } else if (cliqueAB == 2) {
        carteB = this.id;
        if (carteA != carteB) {
            nbCoups++;
            document.getElementById('nb_coups_joues').innerText = nbCoups;
            console.log('valeur carteB');
            affichageCarte(carteB);
            cliqueAB = 0;
            if (disposition[carteA] != disposition[carteB]) {
                document.getElementById('plateau').style="pointer-events:none";
                setTimeout(faceCachee, 1000, carteA, carteB);
                console.log("arrives-tu jusqu'ici ?")
            } else {
                nbPairesTrouvees++;
                document.getElementById(carteA).style="pointer-events:none";
                document.getElementById(carteB).style="pointer-events:none";
                console.log("Nombre de paires trouvées jusqu'ici : " + nbPairesTrouvees);
            }

            if (nbPairesTrouvees == NB_PAIRES) {
                console.log('gagné');
                document.getElementById('victoire').innerText = "Bravo ! Tu as gagné en " + nbCoups + " coups !";
                
                ajoutScore(nbCoups);

                // Ajouter la fonction d'affichage du chat victorieux
                afficherVictoire();
            }
        } else {
            cliqueAB = 1;
            carteB = null;
        }

    }
}

function initialisation(event) {

    let verifSession = sessionStorage.getItem('Profil');
    document.querySelectorAll('img').forEach((image) => {
        if(image.style.pointerEvents) {
            image.style.removeProperty('pointer-events');
        }
    })

    if(!verifSession) {
        alert("Veuillez d'abord vous connecter :)");
        document.location.href="connexion.html"; 

     } else {
        console.log('fonction initialisation');

        disposition = new Array(NB_CASES);
        nbPairesTrouvees = 0;
        nbCoups = 0;
        cliqueAB = 0;
    
        document.getElementById('nb_coups_joues').innerText = nbCoups;
        /* document.querySelectorAll('img').forEach((elem) => {
            elem.src=question;
            //elem.style='pointer-events:all';
            console.log("valeur des images : " + elem );
        }); */

        // Appeler une fonction qui créé le tableau contenant les images
        creationTableauImages();
    
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < NB_PAIRES; i++) {
                let alea;
                do {
                    alea = Math.trunc(Math.random() * NB_CASES);
                    console.log(alea);
                } while (disposition[alea] != undefined);
                disposition[alea] = "../ressources/" + theme + "/" + (i + 1) + extension;//adresseImg[i];
            }
        }
        console.log(disposition.toString());
        document.getElementById('victoire').innerHTML = "";
    }
    
}

function affichageCarte(carte) {
    document.getElementById(carte).src = disposition[carte];
}

function faceCachee(carte_a, carte_b) {
    document.getElementById(carte_a).src = question;
    document.getElementById(carte_b).src = question;
    document.getElementById('plateau').style="pointer-events:all";
}

function combienDePaires() {
    let profil = JSON.parse(utilisateurConnecte());
    let niveau = profil.NIVEAU;
    let nbColonnes = niveau[0];
    let nbLignes = niveau[4];
    
    return nbColonnes * nbLignes / 2;
}

function creationTableauImages() {
    let profil = JSON.parse(utilisateurConnecte());
    let niveau = profil.NIVEAU;
    let nbColonnes = niveau[0];
    let nbLignes = niveau[4];
    let elemTable = document.getElementById("plateau");
    let compteur = 0;
    
    while(elemTable.firstChild) {
        elemTable.removeChild(elemTable.firstChild);
    }

    for(let i = 0 ; i < nbLignes ; i++) {
        let nouvelleLigne = document.createElement("tr");

        for (let j = 0 ; j < nbColonnes ; j++) {
            let nouvelleCase = document.createElement("td");
            let nouvelleImage = document.createElement("img");
            nouvelleImage.id = compteur++;
            nouvelleImage.src = "../ressources/question.svg";
            nouvelleImage.alt = "Point d'interrogation";
            nouvelleCase.appendChild(nouvelleImage);
            nouvelleLigne.appendChild(nouvelleCase);
        }
        elemTable.appendChild(nouvelleLigne);
    }
}

function quelleExtension(theme) {
    let extension;
    if (theme === "animaux" || theme === "animauxAnimes" || theme === "chiens") {
        extension = ".webp";
    } else if (theme === "animauxDomestiques" || theme === "dinosaures" || theme === "dinosauresAvecNom") {
        extension = ".jpg";
    } else if (theme === "legumes") {
        extension = ".svg";
    } else {
        extension = ".png";
    }

    return extension;
}

function gestionScores() {

    if (!localStorage.getItem("Scores")) { // Initialisation de la grille de scores dans le localStorage
        let listeScores = [
            {
                THEME: "animaux",
                NIVEAU: {
                    "3 x 4": [],
                    "4 x 4": [],
                    "4 x 5": [],
                    "4 x 6": []
                }
            },
            {
                THEME: "animauxAnimes",
                NIVEAU: {
                    "3 x 4": [],
                    "4 x 4": []
                }
            },
            {
                THEME: "animauxDomestiques",
                NIVEAU: {
                    "3 x 4": [],
                    "4 x 4": [],
                    "4 x 5": []
                }
            },
            {
                THEME: "chiens",
                NIVEAU: {
                    "3 x 4": [],
                    "4 x 4": [],
                    "4 x 5": [],
                    "4 x 6": []
                }
            },
            {
                THEME: "dinosaures",
                NIVEAU: {
                    "3 x 4": [],
                    "4 x 4": [],
                    "4 x 5": []
                }
            },
            {
                THEME: "dinosauresAvecNom",
                NIVEAU: {
                    "3 x 4": [],
                    "4 x 4": [],
                    "4 x 5": []
                }
            },
            {
                THEME: "legumes",
                NIVEAU: {
                    "3 x 4": []
                }
            },
            {
                THEME: "scrabble",
                NIVEAU: {
                    "3 x 4": [],
                    "4 x 4": [],
                    "4 x 5": [],
                    "4 x 6": []
                }
            }
        ]
        localStorage.setItem("Scores", JSON.stringify(listeScores));
    }

    // Logique d'affichage des scores...
    let elemScores = document.getElementById("lignesScores");

    while (elemScores.firstChild) {
        elemScores.removeChild(elemScores.firstChild);
    }

    let titreTableauScores = document.getElementById("themeNiveau");
    let profil = JSON.parse(utilisateurConnecte());
    let theme = profil.THEME;
    let niveau = profil.NIVEAU;
    titreTableauScores.innerText = (theme.charAt(0).toUpperCase() + theme.slice(1)) + " - " + niveau;

    let clefScores = JSON.parse(localStorage.getItem("Scores"));
    let themeScore = clefScores.find((tema) => tema.THEME === theme);
    let niveauScore = themeScore.NIVEAU;
    let tableauScores = niveauScore[niveau];
    

    for (let i = 0 ; i < 5 ; i++) {

        let tr = document.createElement("tr");
        let tdPseudo = document.createElement("td");
        let tdScore = document.createElement("td");
        let tdDate = document.createElement("td");

        if (i < tableauScores.length) {
            // remplir le tableau html avec les données du localStorage
            tdPseudo.innerText = tableauScores[i].PSEUDO;
            tdScore.innerText = tableauScores[i].NB_COUPS;
            tdDate.innerText = tableauScores[i].DATE;
        } else {
            // remlir le tableau html avec "-" car le localStorage contient moins de 5 scores
            console.log("Moins de 5 scores dans le localStorage");
            tdPseudo.innerText = "-";
            tdScore.innerText = "-";
            tdDate.innerText = "-";
        }

        tr.appendChild(tdPseudo);
        tr.appendChild(tdScore);
        tr.appendChild(tdDate);
        elemScores.appendChild(tr);
    }
}

function ajoutScore(nbCoups) {
    let profil = JSON.parse(utilisateurConnecte());
    let theme = profil.THEME;
    let niveau = profil.NIVEAU;
    let pseudo = profil.NOM;
    console.log("Foncion ajoutScores(). Le thème est " + theme + ", le niveau est " + niveau);

    let clefScores = JSON.parse(localStorage.getItem("Scores"));
    let themeScore = clefScores.find((tema) => tema.THEME === theme);
    let niveauScore = themeScore.NIVEAU;
    let dateDuJour = new Date();
    let annee = dateDuJour.getFullYear().toString();
    let mois = (dateDuJour.getMonth()+1).toString();
    let jour = dateDuJour.getDate().toString();

    if (mois.length === 1) {
        mois = "0" + mois;
    }
    if (jour.length === 1) {
        jour = "0" + jour;
    }

    let infos = {
        PSEUDO: pseudo,
        NB_COUPS: nbCoups,
        DATE: `${jour}/${mois}/${annee}`
    }

    niveauScore[niveau].push(infos); 

    niveauScore[niveau].sort((a, b) => (a.NB_COUPS > b.NB_COUPS ? 1 : -1));

    if (niveauScore[niveau].length === 6) {
        niveauScore[niveau].pop();
    }

    localStorage.setItem("Scores", JSON.stringify(clefScores));

    // appeler la fonction gestionScores() pour afficher les scores à l'utilisateur
    gestionScores();
}

function afficherVictoire() {
    document.addEventListener("click", bloquer, true);
    let victoire = document.getElementById("victoireBis");
    victoire.style.display = "block";
    victoire.style.animation = "chute 5s";
    

    window.setTimeout(() => {
        victoire.style.removeProperty("animation");
        victoire.style.display = "none";
        activer();
    }, 4950);
    
    console.log("coucou");  
  }

  function bloquer(event) {
    event.preventDefault();
  }

  function activer() {
    document.removeEventListener("click", bloquer, true);
  }

function doKonamiCode(event) {
    if (event.key === konamiCode[konamiCompteur]) {
        konamiCompteur++;
        if (konamiCompteur === konamiCode.length) {
            let body = document.getElementById("body");
            body.style.transition = "transform 1.5s linear, scale 1.5s linear";
            body.style.transform = "rotate(180deg) scale(3)";

            setTimeout(() => {
                body.style.transform = "rotate(360deg) scale(1)";
            }, 1500);

            setTimeout(() => {
                body.style.removeProperty("transition");
                body.style.removeProperty("transform");
            }, 3001);
            konamiCompteur = 0;
        }
    } else {
        konamiCompteur = 0;
    }
    console.log(konamiCompteur);
  }