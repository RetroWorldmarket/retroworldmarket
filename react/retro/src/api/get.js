import { toast } from 'react-toastify';

export async function get(
  url,
  funcionSuceso,
  token,
  ErrorPeticion = (respuesta) => {
    console.error(
      'Error en la petición al servidor',
      respuesta.status,
      respuesta.statusText
    );
  },
  ErrorDeConexion = (msg) => {
    console.error('Error', msg);
    toast.error(msg);
  }
) {
  try {
    const respuesta = await fetch(url, {
      headers: {
        //no se pone el method porque por defecto es get
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (respuesta.ok) {
      const body = await respuesta.json();
      funcionSuceso(body);
      toast.success(body.message);
    } else {
      const body = await respuesta.json();
      console.log('el error es: ', body);
      toast.error(body.message);
    }
  } catch (msg) {
    ErrorDeConexion(msg);
  }
}
