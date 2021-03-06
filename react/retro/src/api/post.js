import { toast } from 'react-toastify';

export async function post(
  url,
  body,
  funcionSuceso,
  token = '',
  ErrorPeticion = () => {},
  ErrorDeConexion = (msg) => {
    console.error('Error', msg);
  }
) {
  try {
    const respuesta = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (respuesta.ok) {
      const body = await respuesta.json();
      funcionSuceso(body);
    } else {
      const body = await respuesta.json();
      ErrorPeticion(respuesta);

      console.log('respuesta tiene: ', respuesta);
      toast.error(body.message);
      //alert(body.message);

      console.log(
        'respuesta servidor:',
        body.message,
        'otras:',
        respuesta,
        respuesta.statusText,
        respuesta.status
      );
    }
  } catch (msg) {
    ErrorDeConexion(msg);
  }
}
