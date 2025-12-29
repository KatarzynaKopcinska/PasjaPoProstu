document.addEventListener("DOMContentLoaded", function() {

  const loginBtn = document.getElementById("login");
  const addBtn = document.getElementById("add");

  const loginPanel = document.getElementById("login-panel");
  const addPanel = document.getElementById("add-panel");

  // Sprawdzenie stanu zalogowanego użytkownika
  auth.onAuthStateChanged(user => {
    if (user) {
      // Admin zalogowany
      loginPanel.style.display = "none";
      addPanel.style.display = "block";
    } else {
      // Nie zalogowany
      loginPanel.style.display = "block";
      addPanel.style.display = "none";
    }
  });

  // Logowanie admina
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email || !password) return alert("Wpisz email i hasło!");

      try {
        await auth.signInWithEmailAndPassword(email, password);
        alert("Zalogowano! Panel dodawania jest aktywny.");
      } catch(e) {
        console.error(e);
        alert("Błąd logowania: " + e.message);
      }
    });
  }

  // Dodawanie prac
  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      const title = document.getElementById("title").value;
      const desc = document.getElementById("desc").value;
      const file = document.getElementById("file").files[0];

      if (!title || !desc || !file) return alert("Wypełnij wszystkie pola!");

      try {
        const imgRef = storage.ref('works/' + Date.now() + "_" + file.name);
        await imgRef.put(file);
        const imgURL = await imgRef.getDownloadURL();

        await db.collection('works').add({
          title,
          desc,
          imgURL,
          created: new Date()
        });

        alert("Dodano rękodzieło ✨");

        document.getElementById("title").value = "";
        document.getElementById("desc").value = "";
        document.getElementById("file").value = "";
      } catch(e) {
        console.error(e);
        alert("Błąd dodawania pracy: " + e.message);
      }
    });
  }

});
