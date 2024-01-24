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
                //document.getElementById('lancement').setAttribute('disabled', 'disabled');
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