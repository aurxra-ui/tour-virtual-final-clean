// Proyecto base: Aplicación web de tours virtuales 360° sin login
// Tecnologías: React + Cloudinary + A-Frame

import { useState } from 'react';

export default function App() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const handleUpload = async () => {
    if (!image) {
      alert("Por favor seleccioná una imagen primero.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "tour360");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dzszemwzd/image/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log("Respuesta de Cloudinary:", data);

      if (data.secure_url) {
        setUrl(data.secure_url);
      } else {
        alert("No se pudo subir la imagen. Verificá el Cloud name o preset.");
      }
    } catch (err) {
      alert("Error al subir la imagen: " + err.message);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Subí tu imagen 360°</h1>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-600 text-white p-2">Subir imagen</button>
      {url && (
        <div>
          <h2 className="text-lg font-semibold">Vista 360°</h2>
          <a-scene embedded>
            <a-sky src={url} rotation="0 -130 0"></a-sky>
          </a-scene>
        </div>
      )}
    </div>
  );
}