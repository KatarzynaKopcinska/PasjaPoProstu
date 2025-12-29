import { auth, db, storage } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

// Logowanie admina
const loginBtn = document.getElementById("login");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await signInWithEmailAndPassword(auth, email, password);
    alert("Zalogowano! Możesz dodawać rękodzieła.");
  });
}

// Dodawanie prac rękodzieła
const addBtn = document.getElementById("add");
if (addBtn) {
  addBtn.addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    const file = document.getElementById("file").files[0];

    const imgRef = ref(storage, `pasja/${file.name}`);
    await uploadBytes(imgRef, file);
    const imgURL = await getDownloadURL(imgRef);

    await addDoc(collection(db, "works"), { title, desc, imgURL, created: new Date() });
    alert("Dodano rękodzieło ✨");
  });
}

// Wczytywanie galerii na index.html
const gallery = document.getElementById("gallery");
if (gallery) {
  const loadGallery = async () => {
    const q = query(collection(db, "works"), orderBy("created", "desc"));
    const snapshot = await getDocs(q);
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `<img src="${data.imgURL}" width="100%"><h3>${data.title}</h3><p>${data.desc}</p>`;
      gallery.appendChild(div);
    });
  }
  loadGallery();
}
