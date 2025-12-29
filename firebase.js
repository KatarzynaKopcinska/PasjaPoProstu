<!-- firebase.js -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>

<script>
const firebaseConfig = {
  apiKey: "AIzaSyCJug-WWwnAjTbyPJBf5rgLdZD2oKWg_e4",
  authDomain: "pasjapoprostu-386fb.firebaseapp.com",
  projectId: "pasjapoprostu-386fb",
  storageBucket: "pasjapoprostu-386fb.appspot.com",
  messagingSenderId: "1025672670668",
  appId: "1:1025672670668:web:f2f114204eab7d32aa8169",
  measurementId: "G-23E3MK83SS"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
</script>

