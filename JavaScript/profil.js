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
    console.log('oyé');
    let valeur = document.getElementById('theme').value;
    let vignette;
    switch(valeur) {
        case "legumes": vignette = insertionVignette("memory-legume/memory_detail");
        break;
        case "dinosNoms": vignette = insertionVignette("dinosauresAvecNom/memory_details_dinosaures_avec_nom");
        break;
        case "dinos": vignette = insertionVignette("dinosaures/memory_detail_dinosaures");
        break;
        case "chiens": vignette = insertionVignette("chiens/memory_details_chiens");
        break;
        case "animauxDom": vignette = insertionVignette("animauxdomestiques/memory_detail_animaux_domestiques");
        break;
        case "animauxAnimes": vignette = insertionVignette("animauxAnimes/memory_detail_animaux_animes");
        break;
        case "animaux": vignette = insertionVignette("animaux/memory_detail_animaux");
        break;
        case "scrabble": vignette = insertionVignette("alphabet-scrabble/memory_detail_scrabble");
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

    if (theme === "dinosNoms" || theme === "dinos" || theme === "chiens" || theme === "animauxDom" || theme === "animauxAnimes" || theme === "animaux" || theme === "scrabble") {
        // ajouter l'option "4 x 4" dans le select
        ajoutOptionNiveau("16", "4 x 4");
    }

    if (theme === "dinosNoms" || theme === "dinos" || theme === "chiens" || theme === "animauxDom" || theme === "animaux" || theme === "scrabble") {
        // ajouter l'option "4 x 5" dans le select
        ajoutOptionNiveau("20", "4 x 5");
    }

    if (theme === "chiens" || theme === "animaux" || theme === "scrabble") {
        // ajouter l'option "4 x 6" dans le select
        ajoutOptionNiveau("24", "4 x 6");
    }
}

function ajoutOptionNiveau(value, texte) {
    const select = document.getElementById("taille");
    let option = document.createElement("option");
    option.value = value;
    option.text = texte;
    select.add(option);
}