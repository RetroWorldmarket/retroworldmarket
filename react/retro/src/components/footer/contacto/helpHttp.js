// Aquí definiremos una funcion helper que nos va a permitir hacer peticiones Fetch a APIs.
// Esto es puro JavaScript, sin otras tecnologías.

export const helpHttp = () => {
  // Dentro de la función vamos a definir y tener todos los métodos que vamos a usar.

  // Aquí definiremos la petición Fetch que van a ejecutar los cuatro métodos que usaremos.
  // Esta función recibe por parámetro
  //    1) Una ruta (endpoint)
  //    2) Una serie de opciones (método, cabecera, etc.)
  const customFetch = (endpoint, options) => {
    // Definimos unas cabeceras por defecto que vamos a usar siempre.
    // Si queremos modificar la cabecera, podemos, simplemente agregarla aquí.
    const defaultHeader = {
      accept: 'application/json',
    };

    // Nos interesa que si algo va mal con la Base de Datos y esta tarda en dar respuesta
    // (por ejemplo, porque está caída), tener la opción de cancelar la petición.
    // JS nos da esta solución (AbortController()) para estos casos.
    // A las opciones que nos llegan por parámetro, le agregamos la propiedad signal
    // y la asignamos a la propiedad signal de AbortController, para que funcione correctamente.
    const controller = new AbortController();
    options.signal = controller.signal;

    // Necesitamos obtener el método que necesita el usuario (viene por options). Aquí le
    // decimos que si tiene método, queda ese, y sino, va a usar el método GET (por defecto
    // no es obligatorio señalarlo)
    options.method = options.method || 'GET';

    // Hacemos algo similar con las cabeceras. Si las trae, usamos esas además (spread operator)
    // de las que pusimos por defecto y sino, ponemos las cabeceras por defecto que definimos arriba.
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    // Necesitamos que en options venga un body.
    // Por otro lado, esablecimos las cabeceras por defecto sonde le dijimos que le enviariamos
    // application/json, así que tendremos que convertir a string el body (JSON.stringify())
    // Sucede que los métodos GET no traen body (piden información, no la llevan), por tanto
    // vamos a decirle que si existe body, lo pase a cadena y sino, que no haga nada.
    // Indepentientemente del método que se use, no sepuede asignar false a Body (ni vacío),
    // así que haremos una verificación y si tiene valor false, lo elimine.
    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    console.log('options tiene:', options);

    // Definimos un tiempo máximo de espera para abortar la peticion (AbortController())
    setTimeout(() => controller.abort(), 4000);

    // Retorna la petición Fetch, a la que le pasamos por parámetro la url (endpoint y opciones)
    return (
      fetch(endpoint, options)
        // Devuelve una promesa(la pilla .then) o un error (lo pilla catch) Si la respuesta
        // tiene la propiedad ok, la parsea a json, sino, rechaza la promesa, almacenando
        // en un objeto el error, es status y el texto. Si no trae status se le asigna 00 por defecto
        .then((res) =>
          res.ok
            ? res.json()
            : Promise.reject({
                err: true,
                status: res.status || '00',
                statusText: res.statusText || 'Algo no ha ido bien',
              })
        ) // Si devuelve error:
        .catch((err) => err)
    );
  };

  /////////////////////////////////////////////////////////////
  ///   Definimos los métodos de las distintas peticiones   ///
  /////////////////////////////////////////////////////////////

  // Método GET recibe por parámetro un endpoint y opciones, si no trae opciones,
  // asignamos por defecto un objeto vacío. Luego ejecuta la función que definimos arriba.
  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = 'POST';
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = 'PUT';
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = 'DELETE';
    return customFetch(url, options);
  };

  /////////////////////////////////////
  ///   Lo que devuelve la función  ///
  /////////////////////////////////////
  // Devuelve un objeto con las propiedades y valores: get: get, etc. (por shortcut se escriben así)

  return {
    get,
    post,
    put,
    del,
  };
};
