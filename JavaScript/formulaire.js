window.onload = init;

function init() {
    document.getElementById('nom').addEventListener('input', verifNom);
    document.getElementById('email').addEventListener('input', verifMail);
    document.getElementById('mdp').addEventListener('input', verifMdp);
    document.getElementById('mdpConf').addEventListener('input', verifMdpBis);
    document.getElementById('validation').addEventListener('click', profil);
}

let mdpA;
let mdpB;
let nomP;
let mailP;
let mdpP;
let mdpConfP;
let nomL;
let mailL;
let mdpConfL;
let liste;
let profilData = JSON.parse(localStorage.getItem("Profils")) || [];
let verifDansSession = sessionStorage.getItem("Profil");
/*export let mailC= mailP;
export let nomC = nomL;*/
import { hashPassword } from './module.js';

function profil(event) {

    if(verifDansSession !== null) { // si quelqu'un est actuellement connecté, l'inscription est impossible
        console.log("ligne 30");
        alert("Veuillez d'abord vous déconnecter :)");
        event.preventDefault();
     } else { // si personne n'est actuellement connecté, la procédure d'inscription peut se poursuivre
            if (profilData.some((profil) => profil.EMAIL === mailP)) { // Si l'adresse email existe, l'utilisateur ne peut se (ré)inscrire
                console.log("ligne 35");
                alert("Cette adresse mail est déjà connue");
                event.preventDefault(); 
            } else { // Si l'email n'existe pas dans le localStorage, on continue la procédure d'inscription
                
                if (nomP && mailP && mdpP && mdpConfP) { // si tous les champs renseignés respectent les contraintes
                    hashPassword(mdpA).then((hash) => {
                        //console.log("mot de passe crypté ? " + hash);
                        //mdpA = hash;
                        liste = {
                            EMAIL: mailL,
                            NOM: nomL,
                            MDP: hash,
                            THEME: "legumes",
                            NIVEAU: "3 x 4"
                        }
                        profilData.push(liste);
                        localStorage.setItem("Profils", JSON.stringify(profilData));
                        alert('Vous êtes bien inscrit !');
                    });
                                    
                } else {
                    alert("Formulaire incorrect, recommencez !");
                    event.preventDefault();
                }
                console.log("nomP : " + nomP);
                console.log("mailP : " + mailP);
                console.log("mdpP : " + mdpP);
                console.log("mdpConfP : " + mdpConfP);
        }
     }
    
}

function verifNom(event) {
    console.log('Me vois-tu dans le nom ?'); //OK
    let regex = new RegExp(/.{3,}/);
    let nom = event.currentTarget.value;
    console.log(' evenement : ' + event);
    if (regex.test(nom)) {
        document.getElementById('errorName').src = '../ressources/check.svg';
        document.getElementById('avertissementNom').style.display = 'none';
        nomP = true;
        nomL = nom;
        console.log('true');
    } else {
        document.getElementById('errorName').style.display = 'inline';
        document.getElementById('errorName').src = '../ressources/error.svg';
        document.getElementById('avertissementNom').style.display = 'block';
        nomP = false;
        console.log('false');
    }
}

function verifMail(event) {
    console.log('Entrée dans fonction verifMail');
    let regex = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
    let mail = event.currentTarget.value;

    if (regex.test(mail)) {
        document.getElementById('errorMail').src = '../ressources/check.svg';
        mailP = true;
        mailL = mail;

    } else {
        document.getElementById('errorMail').style.display = 'inline';
        document.getElementById('errorMail').src = '../ressources/error.svg';
        mailP = false;
    }

}



function verifMdp(event) {

    let chiffre = new RegExp(/[0-9]+/);
    let nbLettre = new RegExp(/[A-Za-z]+/);
    let symb = new RegExp(/[^A-Za-z0-9]+/);


    let nbVerif = 0;
    let saisie = event.currentTarget.value;

    if (symb.test(saisie)) {
        nbVerif++;
    }
    if (chiffre.test(saisie)) {
        nbVerif++;
    }
    if (nbLettre.test(saisie)) {
        nbVerif++;
    }
    if (saisie.length >= 6) {
        nbVerif++;
    }

    console.log('valeur de nbVerif : ' + nbVerif);

    switch (nbVerif) {
        case 0:
            document.getElementById('errorMdp').style.display = 'none';
            document.getElementById('rangeMdp').style.display = 'none';
            break;
        case 1:
            document.getElementById('faible').style.display = 'block';
            document.getElementById('faibleC').style.display = 'block';
            document.getElementById('moyen').style.display = 'none';
            document.getElementById('moyenC').style.display = 'none';
            document.getElementById('fort').style.display = 'none';
            document.getElementById('fortC').style.display = 'none';
            document.getElementById('rangeMdp').style.display = 'block';
            document.getElementById('errorMdp').style.display = 'inline';
            break;
        case 2:
            document.getElementById('faible').style.display = 'block';
            document.getElementById('faibleC').style.display = 'block';
            document.getElementById('moyen').style.display = 'block';
            document.getElementById('moyenC').style.display = 'block';
            document.getElementById('fort').style.display = 'none';
            document.getElementById('fortC').style.display = 'none';
            document.getElementById('rangeMdp').style.display = 'block';
            document.getElementById('errorMdp').style.display = 'inline';
            break;
        case 3:
            document.getElementById('faible').style.display = 'block';
            document.getElementById('faibleC').style.display = 'block';
            document.getElementById('moyen').style.display = 'block';
            document.getElementById('moyenC').style.display = 'block';
            document.getElementById('fort').style.display = 'block';
            document.getElementById('fortC').style.display = 'block';
            document.getElementById('rangeMdp').style.display = 'block';
    }

    if (nbVerif >= 3) {
        document.getElementById('errorMdp').src = '../ressources/check.svg';
        document.getElementById('errorMdp').display = 'inline';
        mdpA = saisie;
        mdpP = true
    } else {
        document.getElementById('errorMdp').src = '../ressources/error.svg';
        document.getElementById('errorMdp').display = 'inline';
        mdpP = false;
    }


}

function verifMdpBis(event) {
    let mdpB = event.currentTarget.value;
    if (mdpA == mdpB) {
        document.getElementById('imgMdpConf').src = '../ressources/check.svg';
        document.getElementById('imgMdpConf').display = 'inline';
        mdpConfL = mdpB;
        mdpConfP = true;
    } else {
        document.getElementById('imgMdpConf').src = '../ressources/error.svg';
        document.getElementById('imgMdpConf').display = 'inline';
        mdpConfP = false;
    }
}

// export async function hashPassword(password) {
//     const encoder = new TextEncoder();
//     const data = encoder.encode(password);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
//     return hashHex;
// }


