const gallery = document.getElementById("galleryGrid");
const modal = document.getElementById("inquiryModal");
const modalTitle = document.getElementById("modalTitle");

db.collection("works").orderBy("created", "desc").get().then(snapshot => {
  snapshot.forEach(doc => {
    const d = doc.data();

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${d.imgURL}">
      <div class="card-content">
        <h3>${d.title}</h3>
        <p>${d.desc}</p>
        <button class="btn-primary">Zapytaj o produkt</button>
      </div>
    `;

    card.querySelector("button").onclick = () => {
      modal.style.display = "flex";
      modalTitle.innerText = d.title;
      sendInquiry.dataset.product = d.title;
    };

    gallery.appendChild(card);
  });
});

closeModal.onclick = () => modal.style.display = "none";

sendInquiry.onclick = async () => {
  await db.collection("inquiries").add({
    product: sendInquiry.dataset.product,
    name: inqName.value,
    email: inqEmail.value,
    message: inqMessage.value,
    created: new Date()
  });

  inqStatus.innerText = "Wiadomość wysłana 🤍";
  inqName.value = "";
  inqEmail.value = "";
  inqMessage.value = "";
};
