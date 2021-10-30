import React from 'react';

// El mensaje para el usuario muestra la respuesta del dervicio solicitado.
// Recibe por parámetro una variable que es el mensaje y un color de fondo para mostralo.
const Message = ({ msg, bgColor }) => {
  let styles = {
    padding: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: bgColor,
  };

  return (
    <div style={styles}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
