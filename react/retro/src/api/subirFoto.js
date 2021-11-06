export const subirFoto = async (
  url,
  file,
  callback,
  token = '',
  onError = () => {},
  onCommunicationError = () => {}
) => {
  try {
    const data = new FormData();
    data.append('photo', file);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },

      body: data,
    });

    if (response.ok) {
      const body = await response.json();

      callback(body);
      // respuesta correcta, hacer algo con body
    } else {
      onError(response);
      console.log(
        'Codigo de estado no esperado',
        response.status,
        response.statusText
      );
      // respuesta erronea, informar al usuario?
    }
  } catch (msg) {
    onCommunicationError(msg);
    // fallo de comunicación, informar al usuario?
    console.error('Error', msg);
  }
};
