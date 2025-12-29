<script>
  // Logowanie
  const loginBtn = document.getElementById("login");
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        await auth.signInWithEmailAndPassword(email, password);
        alert("Zalogowano! Możesz dodawać rękodzieła.");
      } catch(e) { alert("Błąd logowania: " + e.message); }
    });
  }

  // Dodawanie prac
  const addBtn = document.getElementById("add");
  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      const title = document.getElementById("title").value;
      const desc = document.getElementById("desc").value;
      const file = document.getElementById("file").files[0];
      if (!title || !desc || !file) return alert("Wypełnij wszystkie pola!");

      const imgRef = storage.ref('pasja/' + file.name);
      await imgRef.put(file);
      const imgURL = await imgRef.getDownloadURL();

      await db.collection('works').add({ title, desc, imgURL, created: new Date() });
      alert("Dodano rękodzieło ✨");

      document.getElementById("title").value = "";
      document.getElementById("desc").value = "";
      document.getElementById("file").value = "";
    });
  }

  // Wczytywanie galerii
  const gallery = document.getElementById("gallery");
  if (gallery) {
    db.collection('works').orderBy('created', 'desc').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.innerHTML = `<img src="${data.imgURL}" width="100%"><h3>${data.title}</h3><p>${data.desc}</p>`;
        gallery.appendChild(div);
      });
    });
  }
</script>
