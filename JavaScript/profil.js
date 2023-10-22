window.onload = init;

function init() {
    document.getElementById('supprSess').addEventListener('click', deconnexion);
    document.getElementById('theme').addEventListener('change', vignette);
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


}

function insertionVignette(theme) {
    let image = document.createElement("img");
    image.setAttribute("src", "../ressources/" + theme + ".png");
    image.setAttribute('alt', 'Jolie image');
    image.setAttribute('id', 'actuelle');
    return image;
}