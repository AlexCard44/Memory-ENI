window.onload=init;

function init() {
    document.getElementById('valider').addEventListener('click', verification);
}

//import {nomC} from './formulaire.js';
import { hashPassword } from './module.js';

function verification(event) {
    let saisie_mail = document.getElementById('email').value;
    let saisie_mdp = document.getElementById('mdp').value;
    let verifDansLocal = localStorage.getItem("Profils");
    let verifDansSession = sessionStorage.getItem("Profil");
    let mdpHashe;
    
    //let mdp = localStorage.getItem
     console.log(saisie_mail);
     console.log(saisie_mdp);

     if(verifDansSession) { // si quelqu'un est déjà connecté, on ne peut pas permettre une sur-connexion
        alert("Veuillez d'abord vous déconnecter :)");
        event.preventDefault();
     } else { // si personne n'est actuellement connecté (= sessionStorage vide), la procédure de connexion continue
        let tableauProfils = JSON.parse(verifDansLocal); // récupération de toutes les données de "Profils" du LocalStorage
        let profil = tableauProfils.find((profil) => profil.EMAIL === saisie_mail); // récupération du bon utilisateur
        alert(JSON.stringify(profil));

        if(profil) { // si l'email rentrée par l'utilisateur existe bien dans le local storage
            alert('coucou');
            hashPassword(saisie_mdp).then((hash) => {
                if(profil.MDP == hash) { // connexion ok
                    console.log('les mots de passe correspondent');
                    alert('Vous êtes connecté à votre session, bienvenue ' + profil.NOM + " ! :)");
                    sessionStorage.setItem("Profil", JSON.stringify(profil));
                    //copier ce qui se trouve dans le localStorage vers le sessionStorage (pour savoir quel profil est actif parmi tous ceux présents dans le localStorage). Peut-être voir avec un fichier JSON qu'on alimenterait au fur et à mesure, et où toutes les données resteraient sans limite de temps
                } else { // connexion ratée
                    console.log("les mots de passe ne correspondent pas");
                    alert('Mot de passe incorrect :(');
                    event.preventDefault();
                    document.getElementById('email').value = saisie_mail;
                    document.getElementById('mdp').value = "";
                    document.getElementById('mdp').focus();
                }
            })
            
            
         } else { // sinon le profil n'existe pas, l'utilisateur doit s'inscrire
            console.log("Ce profil n'existe pas, veuil");
            alert("Ce profil n'existe pas :(");
            event.preventDefault();
         }
     }

     

    //alert('oyé');
}