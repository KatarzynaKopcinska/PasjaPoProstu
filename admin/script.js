const owner = 'katarzynakopcinska';
const repo = 'PasjaPoProstu';
const branch = 'main';

document.getElementById('add').addEventListener('click', async () => {
  const token = document.getElementById('token').value;
  const title = document.getElementById('title').value;
  const desc = document.getElementById('desc').value;
  const file = document.getElementById('file').files[0];

  if (!token || !title || !desc || !file) return alert("Wypełnij wszystkie pola!");

  // Konwertujemy plik do Base64
  const reader = new FileReader();
  reader.onloadend = async () => {
    const content = reader.result.split(',')[1]; // usuń nagłówek data:image

    const filename = `uploads/${Date.now()}-${file.name}`;
    const productData = {
      title,
      desc,
      image: filename
    };

    try {
      // 1️⃣ Upload zdjęcia
      await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filename}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Dodano zdjęcie ${file.name}`,
          content: content,
          branch
        })
      });

      // 2️⃣ Zapis produktu w JSON
      const productFilename = `content/products/${Date.now()}-${title.replace(/\s/g,'_')}.json`;
      await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${productFilename}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Dodano produkt ${title}`,
          content: btoa(JSON.stringify(productData, null, 2)),
          branch
        })
      });

      alert("Produkt dodany!");
      document.getElementById('title').value = '';
      document.getElementById('desc').value = '';
      document.getElementById('file').value = '';

    } catch (e) {
      console.error(e);
      alert("Błąd dodawania produktu");
    }
  };
  reader.readAsDataURL(file);
});
