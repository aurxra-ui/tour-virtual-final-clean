import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';

// Config de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBs0hW5qNPW8MCN9tbhYSuWSaU0_XZjO7c",
  authDomain: "aurora-70383.firebaseapp.com",
  projectId: "aurora-70383",
  storageBucket: "aurora-70383.firebasestorage.app",
  messagingSenderId: "511930677766",
  appId: "1:511930677766:web:bdb1cf52c427b3c9b16187",
  measurementId: "G-442QW1BQKG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      alert("Error al iniciar sesión: " + err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      alert("Error al registrarse: " + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "tour360");

      const response = await fetch("https://api.cloudinary.com/v1_1/dzszemwzd/image/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setUrl(data.secure_url);
    }
  };

  if (!user) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold">Login o Registro</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-1"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={e => setPass(e.target.value)}
          className="border p-1"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2">Login</button>
        <button onClick={handleRegister} className="bg-green-500 text-white p-2">Registrarse</button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Bienvenido, {user.email}</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white p-2">Cerrar sesión</button>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-600 text-white p-2">Subir imagen 360°</button>
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