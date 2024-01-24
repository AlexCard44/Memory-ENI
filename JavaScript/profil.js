window.onload = init;

function init() {
    document.getElementById('supprSess').addEventListener('click', deconnexion);
    document.getElementById('theme').addEventListener('change', vignette);
    document.getElementById("enregistrer").addEventListener('click', preferences);
    inputNomEtMail();
}

function inputNomEtMail() {
    let profilConnecte = JSON.parse(sessionStorage.getItem("Profil"));
    let profilLocalConnecte = JSON.parse(localStorage.getItem("Profils")).find((profil) => profil.EMAIL === profilConnecte.EMAIL);
    let nom = profilConnecte.NOM;
    let email = profilConnecte.EMAIL;
    let theme = profilLocalConnecte.THEME;
    let niveau = profilLocalConnecte.NIVEAU;
    document.getElementById("nom").value = nom;
    document.getElementById("email").value = email;
    document.getElementById("theme").value = theme;
    document.getElementById("taille").value = niveau;
    vignette();
}

function deconnexion() {
    sessionStorage.clear();
    alert('Vous avez bien été déconnecté, au revoir !');
}

function vignette(event) {
    let valeur = document.getElementById('theme').value;
    let vignette;
    switch(valeur) {
        case "legumes": vignette = insertionVignette("legumes/memory_detail");
        break;
        case "dinosauresAvecNom": vignette = insertionVignette("dinosauresAvecNom/memory_details_dinosaures_avec_nom");
        break;
        case "dinosaures": vignette = insertionVignette("dinosaures/memory_detail_dinosaures");
        break;
        case "chiens": vignette = insertionVignette("chiens/memory_details_chiens");
        break;
        case "animauxDomestiques": vignette = insertionVignette("animauxDomestiques/memory_detail_animaux_domestiques");
        break;
        case "animauxAnimes": vignette = insertionVignette("animauxAnimes/memory_detail_animaux_animes");
        break;
        case "animaux": vignette = insertionVignette("animaux/memory_detail_animaux");
        break;
        case "scrabble": vignette = insertionVignette("scrabble/memory_detail_scrabble");
    }

    let div = document.getElementById('appercu');
    let act = document.getElementById('actuelle');
    
    div.replaceChild(vignette, act);
    majNiveau(valeur);


}

function insertionVignette(theme) {
    let image = document.createElement("img");
    image.setAttribute("src", "../ressources/" + theme + ".png");
    image.setAttribute('alt', 'Jolie image');
    image.setAttribute('id', 'actuelle');
    return image;
}

function preferences() {
    let verifDansLocal = localStorage.getItem("Profils");
    let verifDansSession = sessionStorage.getItem("Profil");
    let profilSession = JSON.parse(verifDansSession);
    let emailUtilisateurConnecte = profilSession.EMAIL;
    let tableauProfils = JSON.parse(verifDansLocal);
    let profil = tableauProfils.find((profil) => profil.EMAIL === emailUtilisateurConnecte);
    profil.THEME = document.getElementById("theme").value;
    profil.NIVEAU = document.getElementById("taille").value;

    localStorage.setItem("Profils", JSON.stringify(tableauProfils));

}

function majNiveau(theme) {

    const liste = document.getElementById("taille");
    liste.options.length = 2;

    if (theme === "dinosauresAvecNom" || theme === "dinosaures" || theme === "chiens" || theme === "animauxDomestiques" || theme === "animauxAnimes" || theme === "animaux" || theme === "scrabble") {
        // ajouter l'option "4 x 4" dans le select
        ajoutOptionNiveau("4 x 4");
    }

    if (theme === "dinosauresAvecNom" || theme === "dinosaures" || theme === "chiens" || theme === "animauxDomestiques" || theme === "animaux" || theme === "scrabble") {
        // ajouter l'option "4 x 5" dans le select
        ajoutOptionNiveau("4 x 5");
    }

    if (theme === "chiens" || theme === "animaux" || theme === "scrabble") {
        // ajouter l'option "4 x 6" dans le select
        ajoutOptionNiveau("4 x 6");
    }
}

function ajoutOptionNiveau(value) {
    const select = document.getElementById("taille");
    let option = document.createElement("option");
    option.value = value;
    option.text = value;
    select.add(option);
}