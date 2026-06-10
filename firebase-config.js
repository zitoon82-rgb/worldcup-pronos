import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCFgHSt_C1PNKWz5LBDaSfOYYoSwESzrA4",
    authDomain: "pronos-coupe-monde-2026.firebaseapp.com",
    projectId: "pronos-coupe-monde-2026",
    storageBucket: "pronos-coupe-monde-2026.firebasestorage.app",
    messagingSenderId: "573811743618",
    appId: "1:573811743618:web:c88df34d212948f45ecd9b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };