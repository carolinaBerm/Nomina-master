import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
// import "../../../index.css";
import Swal from "sweetalert2";
import { connDatabase, connStorage } from "../../database/firebaseConfig";
import DireccionHome from "../DireccionHome/DireccionHome";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Registro = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [startDate, setStartDate] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [contrato, setContrato] = useState("");
  const [funcion, setFuncion] = useState("");
  const [documento, setDocumento] = useState("");

  let redireccion = useNavigate();

  async function getUsuarios() {
    let collectionUsuarios = collection(connDatabase, "empleados");
    let resultado = await getDocs(collectionUsuarios);
    setUsuarios(resultado.docs.map((doc) => ({ ...doc.data() })));
    console.log(resultado.docs.map((doc) => ({ ...doc.data() })));
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  const buscarUsuario = () => {
    let estado = usuarios.some((usuario) => usuario.user === user);
    return estado;
  };

  function confirmar() {
    Swal.fire({
      title: "Esta seguro que se quiere registrar?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si, registrarme!",
    }).then((result) => {
      if (result.isConfirmed) {
        crearUsuario();
        Swal.fire({
          title: "Registrado!",
          text: "Usuario registrado correctamente.",
          icon: "success",
        });
        redireccion("/usuarios");
      }
    });
  }

  const subirImg = async (imagen) => {
    let referenciaImg = ref(connStorage, v4());
    console.log(referenciaImg);
    await uploadBytes(referenciaImg, imagen);
    let urlImagen = await getDownloadURL(referenciaImg);
    return urlImagen;
  };

  async function crearUsuario() {
    let imgServer = await subirImg(img);
    let nuevoUsuario = {
      name,
      apellidos,
      contrato,
      documento,
      funcion,
      imgServer,
    };
    let enviarUsuario = collection(connDatabase, "empleados");
    await addDoc(enviarUsuario, nuevoUsuario);
  }

  const registrarUsuario = () => {
    if (!buscarUsuario()) {
      confirmar();

      redireccion("/usuarios");
    } else {
      Swal.fire({
        title: "Error",
        text: "Usuario ya existe en la base de datos",
        icon: "error",
      });
    }
  };

  return (
    <div class="login-page">
      <DireccionHome />
      <div class="form">
      <h1 className="Titulo">Realiza un nuevo registro.</h1><br />
        <form class="login-form">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nombre"
          />

          <input
            onChange={(e) => setApellidos(e.target.value)}
            type="text"
            placeholder="Apellidos"
          />

          <input
            onChange={(e) => setDocumento(e.target.value)}
            type="text"
            placeholder="Identificación"
          />
          <input
            onChange={(e) => setFuncion(e.target.value)}
            type="text"
            placeholder="Funcion/Cargo"
          />
          <input
            onChange={(e) => setContrato(e.target.value)}
            type="text"
            placeholder="Contrato"
          />

          <input
            FECHA
            DE
            INICIO
            DEL
            PERIODO
            CONTRATACION
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input onChange={(e) => setImg(e.target.files[0])} type="file" />

          <button onClick={registrarUsuario} type="button">
            Registro
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
