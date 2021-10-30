import { useFormContacto } from '../hooks/useFormContacto';
import Loader from '../components/footer/contacto/Loader';
import Message from '../components/footer/contacto/Message';
import '../components/footer/contacto/FormularioContacto.css';
import { Link } from 'react-router-dom';

// Valores iniciales del formulario.
//  Nota: Las propiedades del objeto form siempre tienen que coincidir con la
//  propiedad "name" del input.
const initialForm = {
  nombre: '',
  email: '',
  asunto: '',
  comentarios: '',
};

//////////////////////////////
/////    Validaciones    /////
//////////////////////////////

// Funcíon que ejecuta la validación del formulario.
const validationsForm = (form) => {
  // en el objeto errors almacenamos los errores de validación que hubiere.
  let errors = {};

  // Usaremos expresiones regulares para las validaciones.
  // Declaramos en una variable (para cada input) los requisitos que le vamos a exigir.
  // Luego, llamaremos a la función usando el método test() de las RegExp, para testear
  // las distintas variables en cada caso.
  //    La condición se desarrolla así: if (!regexName.test(form.name.trim()))
  //    Es decir, si lo que hay en regexName NO COINCIDE con lo que nos trae el formulario, lanza el error.

  // Para "name": le decimos que acepte mayusculas, minúsculas, tíldes, dieresis y espacio(\s):
  let regexNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  // Para "email": cualquier caracter alfanumérico(\w), punto y guión(/./-), arroba, alfanuméricos y el punto.
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

  // En Comentario solo vamos a darle un tamaño mínimo y máximo al texto (min 1, max 500)
  let regexComentarios = /^.{1,500}$/;
  //

  // Si el nombre viene vacío salta el error.
  // Adicionalmente usamos el método trim() de JS para eliminar los espacios en
  // blanco tanto al principio como al final del string. Este método lo usaremos varias veces.
  if (!form.nombre.trim()) {
    errors.nombre = "El campo 'Nombre' es requerido";
  } else if (!regexNombre.test(form.nombre.trim())) {
    errors.nombre = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
  }

  if (!form.email.trim()) {
    errors.email = "El campo 'Email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Email' es incorrecto (ejemplo@ejemplo.com)";
  }

  if (!form.asunto.trim()) {
    errors.asunto = "El campo 'Asunto a tratar' es requerido";
  }

  if (!form.comentarios.trim()) {
    errors.comentarios = "El campo 'Comentarios' es requerido";
  } else if (!regexComentarios.test(form.comentarios.trim())) {
    errors.comentarios =
      "El campo 'Comentarios' no debe exceder los 500 caracteres";
  }

  return errors;
};

// Definimos PROVICIONALMENTE un estilo para mostrar los errores en pantalla:
let styles = {
  color: 'red',
};

//////////////////////////////////////////////////
////        Aquí viene el formulario          ////
//////////////////////////////////////////////////

export const FormularioContacto = () => {
  ///////////////////////////
  // Importamos la lógica. //
  ///////////////////////////
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormContacto(initialForm, validationsForm);

  //console.log('form tiene:', form);

  //////////////////////
  //     El return    //
  //////////////////////

  // Retornamos el JSX del formulario. Aquí tenemos varias caracteristicas:
  // 1) Almacenamos los valores de los inputs en el objeto form y las pasamos como estados,
  //    como propiedades del objeto, así podemos hacer cosas con ellas.
  // 2) Necesitamos manejar los cambios de estado, para eso tenemos la función onChange de useForm
  // 3) Las validaciones se harán cuando el usuario deje de escribir en el input, para esto
  //    necesitamos el evento onBlur y la función handleBlur que tendrá dentro una función para validar.
  //    Vamos a poner un renderizado condicional, donde, si hay error, lo muestre en pantalla.
  //        {errors.name && <p style={styles}>{errors.name}</p>}
  // 4) Para enviar el formulario tenemos el evento onSubmit de form y la función handleSubmit.
  return (
    <div>
      <h2>Formulario de Contacto</h2>
      <form onSubmit={handleSubmit} id='formularioContacto'>
        <input
          type='text'
          name='nombre'
          placeholder='Escribe tu nombre'
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.nombre}
          required
        />
        {errors.nombre && <p style={styles}>{errors.nombre}</p>}
        <input
          type='email'
          name='email'
          placeholder='Escribe tu email'
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.email}
          required
        />
        {errors.email && <p style={styles}>{errors.email}</p>}
        <input
          type='text'
          name='asunto'
          placeholder='Asunto a tratar'
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.asunto}
          required
        />
        {errors.asunto && <p style={styles}>{errors.asunto}</p>}
        <textarea
          name='comentarios'
          cols='50'
          rows='5'
          placeholder='Escribe tu comentario'
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.comentarios}
          required
        ></textarea>
        {errors.comentarios && <p style={styles}>{errors.comentarios}</p>}
        <input type='submit' value='Enviar' />
      </form>
      {loading && <Loader />}
      {response && (
        <Message msg='El formulario ha sido enviado' bgColor='green' />
      )}
      <button>
        <Link to='/'>Volver al inicio</Link>
      </button>
    </div>
  );
};
