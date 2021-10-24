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
  }
) {
  try {
    const respuesta = await fetch(url, {
      headers: {
        //no se pone el method porque por defecto es get
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    if (respuesta.ok) {
      const body = await respuesta.json();
      funcionSuceso(body);

      // Tests:
      console.log('body tiene', body);
      console.log('token tiene:', token);
    } else {
      const body = await respuesta.json();
      console.log('el error es: ', body);
    }
  } catch (msg) {
    ErrorDeConexion(msg);
  }
}
