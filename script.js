const loginBtn = document.getElementById("loginBtn");
const addBtn = document.getElementById("addBtn");

loginBtn.onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) return alert("Wpisz email i hasło");

  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("Zalogowano poprawnie");
  } catch (e) {
    alert("Błąd logowania: " + e.message);
  }
};

addBtn.onclick = async () => {
  if (!auth.currentUser) return alert("Najpierw się zaloguj");

  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const file = document.getElementById("file").files[0];

  if (!title || !desc || !file) return alert("Uzupełnij wszystkie pola");

  try {
    const ref = storage.ref("works/" + Date.now() + "_" + file.name);
    await ref.put(file);
    const imgURL = await ref.getDownloadURL();

    await db.collection("works").add({
      title,
      desc,
      imgURL,
      created: new Date()
    });

    alert("Produkt dodany!");
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("file").value = "";
  } catch (e) {
    alert("Błąd: " + e.message);
  }
};
