document.addEventListener("DOMContentLoaded", function() {

  // ================= Logowanie admina =================
  const loginBtn = document.getElementById("login");
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email || !password) return alert("Wpisz email i hasło!");

      try {
        await auth.signInWithEmailAndPassword(email, password);
        alert("Zalogowano! Możesz dodawać rękodzieła.");
      } catch(e) {
        console.error(e);
        alert("Błąd logowania: " + e.message);
      }
    });
  }

  // ================= Dodawanie prac =================
  const addBtn = document.getElementById("add");
  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      const title = document.getElementById("title").value;
      const desc = document.getElementById("desc").value;
      const file = document.getElementById("file").files[0];

      if (!title || !desc || !file) return alert("Wypełnij wszystkie pola!");

      try {
        const imgRef = storage.ref('pasja/' + file.name);
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

  // ================= Wczytywanie galerii =================
  const gallery = document.getElementById("gallery");
  if (gallery) {
    db.collection('works').orderBy('created', 'desc').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.innerHTML = `
          <img src="${data.imgURL}" width="100%">
          <h3>${data.title}</h3>
          <p>${data.desc}</p>
          <button class="inquiryBtn" data-id="${doc.id}" data-title="${data.title}">Zapytaj o produkt</button>
        `;
        gallery.appendChild(div);
      });

      document.querySelectorAll('.inquiryBtn').forEach(btn => {
        btn.addEventListener('click', () => {
          const title = btn.dataset.title;
          document.getElementById('productTitle').innerText = title;
          document.getElementById('inqStatus').innerText = '';
          document.getElementById('inqName').value = '';
          document.getElementById('inqEmail').value = '';
          document.getElementById('inqMessage').value = '';
          document.getElementById('inquiryModal').style.display = 'flex';
          document.getElementById('sendInquiry').dataset.productId = btn.dataset.id;
        });
      });
    });
  }

  // ================= Modal zapytania =================
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('inquiryModal').style.display = 'none';
  });

  document.getElementById('sendInquiry').addEventListener('click', async () => {
    const name = document.getElementById('inqName').value;
    const email = document.getElementById('inqEmail').value;
    const message = document.getElementById('inqMessage').value;
    const productId = document.getElementById('sendInquiry').dataset.productId;

    if (!name || !email || !message) return alert("Wypełnij wszystkie pola!");

    try {
      await db.collection('inquiries').add({
        productId,
        name,
        email,
        message,
        createdAt: new Date()
      });
      document.getElementById('inqStatus').innerText = "Wiadomość wysłana!";
      setTimeout(() => { document.getElementById('inquiryModal').style.display = 'none'; }, 1500);
    } catch(e) {
      console.error(e);
      document.getElementById('inqStatus').innerText = "Błąd wysyłki!";
    }
  });

  // ================= Wczytywanie zapytań w adminie =================
  const inquiriesList = document.getElementById('inquiriesList');
  if (inquiriesList) {
    db.collection('inquiries').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      inquiriesList.innerHTML = '';
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.style.borderBottom = '1px solid #ccc';
        div.style.padding = '5px';
        div.innerHTML = `<strong>${data.name}</strong> (${data.email})<br>${data.message}<br><em>Produkt: ${data.productId}</em>`;
        inquiriesList.appendChild(div);
      });
    });
  }

});
