import React, { useState } from 'react';

const valorInicial = { name: '' };

export const FormEditarUsuario = ({ user }) => {
  console.log('Aquí user tiene :', user);

  const [form, setForm] = useState(valorInicial);

  console.log('user.user.alias tiene :', user.user.alias);
  return (
    <>
      <h4>Formulario Editar Usuario</h4>
      <form>
        <ul>
          <li>
            <label htmlFor='nombre'>
              Nombre :
              <input
                type='text'
                name='nombre'
                placeholder={user.user.name}
                value={form.name}
              />
            </label>
          </li>
          <li>
            <label htmlFor='password'>
              Contraseña:
              <input
                type='password'
                name='password'
                placeholder={user.user.name}
                value={form.password}
              />
            </label>
          </li>
        </ul>
      </form>
    </>
  );
};
