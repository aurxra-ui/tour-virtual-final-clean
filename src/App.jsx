const handleUpload = async () => {
  if (!image) {
    alert("Por favor seleccioná una imagen antes de subir.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "tour360");

    const response = await fetch("https://api.cloudinary.com/v1_1/dzszemwzd/image/upload", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Error en la carga: " + response.statusText);
    }

    const data = await response.json();
    setUrl(data.secure_url);
    alert("Imagen cargada con éxito");
  } catch (error) {
    alert("Error al subir la imagen: " + error.message);
    console.error("Error de Cloudinary:", error);
  }
};