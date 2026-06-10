import { db } from "./firebase-config.js";

import {
    doc,
    setDoc,
    getDoc
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const joueurs = [
    "Olivier",
    "Pierre-Jean",
    "Ingrid",
    "Hélène",
    "Fouzia",
    "Clara",
    "Aurélie",
    "Daiana",
    "Pauline",
    "Amélie",
    "Sylvie"
];

const matchs = [
    {
        id: "france-bresil",
        equipe1: "France",
        equipe2: "Brésil"
    },
    {
        id: "espagne-japon",
        equipe1: "Espagne",
        equipe2: "Japon"
    }
];

const container =
    document.getElementById("matchs-container");


async function afficherMatchs() {

    let html = "";

    for (const match of matchs) {

        html += `
        <div class="match-card">

            <h2>
                ${match.equipe1}
                vs
                ${match.equipe2}
            </h2>

            <table>

                <tr>
                    <th>Joueur</th>
                    <th>${match.equipe1}</th>
                    <th>${match.equipe2}</th>
                </tr>
        `;

        joueurs.forEach(joueur => {

            html += `
            <tr>

                <td>${joueur}</td>

                <td>
                    <input
                        type="number"
                        id="${match.id}-${joueur}-1"
                    >
                </td>

                <td>
                    <input
                        type="number"
                        id="${match.id}-${joueur}-2"
                    >
                </td>

            </tr>
            `;
        });

        html += `
            </table>

            <button
                class="save-btn"
                onclick="window.sauvegarder('${match.id}')"
            >
                💾 Enregistrer
            </button>

        </div>
        `;
    }

    container.innerHTML = html;

    chargerPronostics();
}


window.sauvegarder =
async function(matchId) {

    const donnees = {};

    joueurs.forEach(joueur => {

        const score1 =
            document.getElementById(
                `${matchId}-${joueur}-1`
            ).value;

        const score2 =
            document.getElementById(
                `${matchId}-${joueur}-2`
            ).value;

        donnees[joueur] = {
            score1,
            score2
        };
    });

    await setDoc(
        doc(db, "pronostics", matchId),
        donnees
    );

    alert("Pronostics sauvegardés !");
};


async function chargerPronostics() {

    for (const match of matchs) {

        const ref =
            doc(db, "pronostics", match.id);

        const snapshot =
            await getDoc(ref);

        if (snapshot.exists()) {

            const data =
                snapshot.data();

            joueurs.forEach(joueur => {

                if (data[joueur]) {

                    document.getElementById(
                        `${match.id}-${joueur}-1`
                    ).value =
                        data[joueur].score1;

                    document.getElementById(
                        `${match.id}-${joueur}-2`
                    ).value =
                        data[joueur].score2;
                }
            });
        }
    }
}

afficherMatchs();
