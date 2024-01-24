window.onload = init;

function init() {
    initialisation();
    document.addEventListener('keydown', function(event) {
        if(event.key === ' ') {
            initialisation();
        }
    });
    document.querySelectorAll('img').forEach((elem) => {
        elem.addEventListener('click', compar);
    });
    
}

let cliqueAB = 0;
let nbCoups = 0;
const NB_PAIRES = 6;
const NB_CASES = NB_PAIRES * 2;
let coupAB = 0;
let etatCarte = 0;
let adresseImg = [
    '../ressources/memory-legume/1.svg',
    '../ressources/memory-legume/2.svg',
    '../ressources/memory-legume/3.svg',
    '../ressources/memory-legume/4.svg',
    '../ressources/memory-legume/5.svg',
    '../ressources/memory-legume/6.svg',
];
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
        document.querySelectorAll('img').forEach((elem) => {
            elem.src=question;
            //elem.style='pointer-events:all';
            console.log("valeur des images : " + elem );
        });
    
        for (j = 0; j < 2; j++) {
            for (i = 0; i < NB_PAIRES; i++) {
                let alea;
                do {
                    alea = Math.trunc(Math.random() * 12);
                } while (disposition[alea] != undefined);
                disposition[alea] = adresseImg[i];
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

function refresh() {
    initialisation();
    window.location.reload();
    
}