Retro (React) Falta por hacer:

- En Registro:

  - Validacion de datos del formulario en react (confirmar que los campos están rellenados correctamente, y si no lo están, indicarle al usuario qué debe completar para poder enviar el formulario)
  - Tiene que haber confirmado la Política de Privacidad y el Uso de Datos Privados.
    (Posible modificación del la base de datos con esta información)
  - Limpiar el formulario al enviar.
  - Cerrar modal al enviar.
  - Indicarle al usuario que se ha registrado correctamente o no mediante un alert (react-toastify).

- En Login:

  - Validacion de datos del formulario en react (confirmar que los campos están rellenados correctamente, y si no lo están, indicarle al usuario qué debe completar para poder enviar el formulario)
  - Limpiar el formulario al enviar.
  - Cerrar modal al enviar.
  - Indicarle al usuario que se ha registrado correctamente o no mediante un alert (react-toastify).

- En el componente InicioHeader:

  - Cerrar sesión del usuario.
  - El avatar también es un enlace que redirige a la pagina Perfil de Usuario.
  - Botón de Buzón de Mensajes:
    - Indica si el usuario tiene mensajes nuevos
    - Redirige a la página de Mensajes
  - Barra de busqueda (search).

- Pagina Inicio:

  - Tarjetas de productos de muestra (aleatorios??)
  - Botón Venta redirige a página Vende Retro.
  - Componente Categorias tiene que redireccionar a la página Catálogo, y devolver un conjunto de productos de una categoria específica.

- Componente Footer:
  - Redirigir a página Política de Privacidad.
  - Redirigir a página Preguntas Frecuentes.
  - Redirigiar a página Contacto.
  - Links a redes sociales:
    - Crear nuestro perfil en esas Redes Sociales.
    - Redirigir a ellos.

Página Catálogo: - Componente Categorías tiene que devorler un conjunto de productos de una categoria específica. - Componente OrdenarPor tiene que ordenar el conjunto que devuelve el componente Categorías y Ordenarlo según ciertos criterios. - Mostrar las tarjetas de los productos ordenados (Foto, precio, nombre... ubicación?? inicio de la descripcion???). Estas mismas tarjetas redireccionan a la página del producto. - Paginar los productos (Anterior y Siguiente).

- Página Producto:

  - Mostrar la información completa del producto.
  - Paginación (Anterior y Siguiente) según los critérios establecidos en Catálogo.
  - Mensajes al vendedor:
    - Si el usuario está logueado:
      - Puede enviar mensaje al vendedor
      - Puede reservar el producto
      - Puede cancelar la solicitud de reserva (Duda: creo que esto nos lo habíamos cargado en backend)
      - Sería interesante que desde aquí también se redirigiera a la página de Mensajes)
    - Si el usuario NO está logueado:
      - Abre modal de Registro y Login (sería interesante tener los dos modales abiertos para cuando el usuario esté registrado pero no se haya logueado todavía)
  - Botón redireccionar a Catálogo.

- Página de Mensajes: (Darle una vuelta)

  - CONDICIÓN Usuario Logueado.
  - Tiene que mostrar algunos datos del producto sobre el que operan los mensajes (tipo imagen mini, nombre, precio. Ubicación ??) (recordad que los mensajes vienen por los productos)
  - Tiene que mostrar mensajes.
  - Tiene que mostrar los remitentes y destinatarios de los mensajes
  - Se tiene que poder enviar mensajes.

  - Cuando el usuario compra:

    - Se tiene que poder reservar el producto.

  - Cuando el usuario vende:
    - Aquí se reciben las Solicitudes de Reserva.
    - Esta solicitude puede ser Aceptada:
      -Producto reservado.
    - Esta solicitud puede ser rechazada.

-Página Perfíl de Usuario: - CONDICIÓN Usuario Logueado. - Tiene que mostrar los datos existentes del Usuario. - Tiene que poder Editar el perfíl. - Muestra los productos comprados y algunos datos (usuario vendedor, fecha de compra, ubicación...) - Valorar al vendedor (votar). - Muestra los productos vendidos y algunos datos (usuario comprador, fecha de venta, ubicación...) - Redireccionar a página Inicio. - Redireccionar a Catálogo ??.

- Página Vende:

  - CONDICIÓN Usuario Logueado.
  - Mostrar productos en venta.
  - Tiene que poder editar los datos del producto.
  - Tiene que poder eliminar el producto.
  - Tiene que poder marcar el producto como vendido.
  - Formulario para publicar producto.
  - Validar el formulario.
  - Redireccionar a página Inicio.
  - Redireccionar a Catálogo ??.

- CSS:
  - Diseño responsivo:
    - Estilo gral de la aplicación (Móvil y Desktop).
    - Estilo particular de los componentes (Móvil y Desktop).
