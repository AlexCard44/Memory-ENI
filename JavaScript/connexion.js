window.onload=init;

function init() {
    document.getElementById('valider').addEventListener('click', verification);
}

//import {nomC} from './formulaire.js';

function verification(event) {
    let saisie_mail = document.getElementById('email').value;
    let saisie_mdp = document.getElementById('mdp').value;
    let verifDansLocal = (localStorage.getItem(saisie_mail) !== null);
    let verifDansSession = sessionStorage.length > 1;
    
    //let mdp = localStorage.getItem
     console.log(saisie_mail);
     console.log(saisie_mdp);

     if(verifDansSession) {
        alert("Veuillez d'abord vous déconnecter :)");
        event.preventDefault();
     } else {
        if(verifDansLocal) {
            let profil = JSON.parse(localStorage.getItem(saisie_mail));
            if(profil.MDP == saisie_mdp) {
                console.log('les mots de passe correspondent');
                alert('Vous êtes connecté à votre session, bienvenue ' + profil.NOM + " ! :)");
                sessionStorage.setItem(saisie_mail, JSON.stringify(profil));
                //copier ce qui se trouve dans le localStorage vers le sessionStorage (pour savoir quel profil est actif parmi tous ceux présents dans le localStorage). Peut-être voir avec un fichier JSON qu'on alimenterait au fur et à mesure, et où toutes les données resteraient sans limite de temps
            } else {
                console.log("les mots de passe ne correspondent pas");
                alert('Mot de passe incorrect :(');
                event.preventDefault();
                document.getElementById('email').value = saisie_mail;
                document.getElementById('mdp').value = "";
                document.getElementById('mdp').focus();
            }
         } else {
            console.log("Ce profil n'existe pas, veuil");
            alert("Ce profil n'existe pas :(");
            event.preventDefault();
         }
     }

     

    //alert('oyé');
}