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
let verifDansSession = sessionStorage.length > 1;
/*export let mailC= mailP;
export let nomC = nomL;*/

function profil(event) {

    if(verifDansSession) {
        alert("Veuillez d'abord vous déconnecter :)");
        event.preventDefault();
     } else {
        if (localStorage.getItem(mailL) !== null) {
            alert("Cette adresse mail est déjà connue");
            event.preventDefault();
        } else {
    
            if (nomP && mailP && mdpP && mdpConfP) {
                liste = {
                    NOM: nomL,
                    MDP: mdpA
                }
                localStorage.setItem(mailL, JSON.stringify(liste));
                alert('Vous êtes bien inscrit !');
                
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

