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
      ErrorPeticion(respuesta);

      console.log('Respuesta errónea', respuesta.status, respuesta.statusText);
    }
  } catch (msg) {
    ErrorDeConexion(msg);
  }
}
