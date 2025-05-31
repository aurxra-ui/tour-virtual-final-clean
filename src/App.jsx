import { useState } from 'react';

export default function App() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const handleUpload = async () => {
    if (!image) {
      alert("Seleccioná una imagen primero.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "tour360");

    const response = await fetch("https://api.cloudinary.com/v1_1/dzszemwzd/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setUrl(data.secure_url);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Subí tu imagen 360°</h1>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 mt-2">Subir imagen</button>

      {url && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Vista 360°</h2>
          <a-scene embedded>
            <a-sky src={url} rotation="0 -130 0"></a-sky>
          </a-scene>
        </div>
      )}
    </div>
  );
}