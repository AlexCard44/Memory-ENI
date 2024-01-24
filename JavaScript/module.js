export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export function utilisateurConnecte() {
    let verifDansLocal = localStorage.getItem("Profils");
    let verifDansSession = sessionStorage.getItem("Profil");
    let profilSession = JSON.parse(verifDansSession);
    let emailUtilisateurConnecte = profilSession.EMAIL;
    let tableauProfils = JSON.parse(verifDansLocal);
    let profil = tableauProfils.find((profil) => profil.EMAIL === emailUtilisateurConnecte);

    return JSON.stringify(profil);
}