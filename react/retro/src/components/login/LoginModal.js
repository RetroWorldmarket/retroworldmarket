import './LoginModal.css';
import React, { useContext, useState } from 'react';
import { post } from '../../api/post';
import { AuthTokenContext } from '../../index';

const LoginModal = ({ abierto, cerrarModal }) => {
  const handelModalContenedorClick = (e) => e.stopPropagation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useContext(AuthTokenContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    const respuestaServidor = (body) => {
      console.log(body);
      setToken(body.token);
    };
    post('http://localhost:4000/users/login', body, respuestaServidor);
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
            <label htmlFor='nombre'>Email:</label>
            <input
              type='text'
              name='email'
              placeholder='Escribe aquí tu email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <br />

            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              name='password'
              placeholder='Escribe aquí tu password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type='submit'>Enviar</button>
          </form>
        </section>

        <button>Cancelar</button>
      </div>
    </div>
  );
};

export default LoginModal;
