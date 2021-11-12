import './LoginModal.css';
import React, { useContext, useState } from 'react';
import { post } from '../../api/post';
import { AuthTokenContext } from '../../index';
import { toast } from 'react-toastify';

const LoginModal = ({ abierto, cerrarModal }) => {
  const handelModalContenedorClick = (e) => e.stopPropagation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setToken] = useContext(AuthTokenContext);

  // Funcion para resetear el formulario:
  const vaciarFormulario = () => {
    setEmail('');
    setPassword('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
    };

    const respuestaServidor = (body) => {
      setToken(body.token.split(' ')[1]);
      toast.success('Te has logueado correctamente');
    };
    post('http://localhost:4000/users/login', body, respuestaServidor);
    vaciarFormulario();
  };
  return (
    <div className={`modal ${abierto && 'modal-Abrir'}`} onClick={cerrarModal}>
      <div className='contenedor-Modal' onClick={handelModalContenedorClick}>
        <h1>Login</h1>

        <button className='modal-Cerrar' onClick={cerrarModal}>
          X
        </button>

        <section>
          <form
            action='/users/login'
            method='post'
            id='login'
            onSubmit={onSubmit}
          >
            <input
              type='text'
              name='email'
              placeholder='Escribe aquí tu Email'
              id='email-login'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type='password'
              name='password'
              placeholder='Escribe aquí tu Password'
              id='password-login'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Enviar</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginModal;
