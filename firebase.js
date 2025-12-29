<!-- firebase.js -->
<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCJug-WWwnAjTbyPJBf5rgLdZD2oKWg_e4",
  authDomain: "pasjapoprostu-386fb.firebaseapp.com",
  projectId: "pasjapoprostu-386fb",
  storageBucket: "pasjapoprostu-386fb.firebasestorage.app",
  messagingSenderId: "1025672670668",
  appId: "1:1025672670668:web:f2f114204eab7d32aa8169",
  measurementId: "G-23E3MK83SS"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
</script>
