import { useState } from 'react';
import { helpHttp } from '../components/footer/contacto/helpHttp';

// Esta función encierra la lógica que van a usar los distintos formularios.
// La función va a recibir por parámetro, donde se use, dos cosas:
//  1) El valor inicial del formulario.
//  2) Las validaciones de cada formularios.
// Y va a retornar tres funciones y un objeto:
//  1) La función que maneja los cambios (handelChange)
//  2) La función que maneja el foco, donde se harán las validaciones (handleBlur)
//  3) La función que maneja el envío del formulario (handleSubmit).
//  4) El objeto con las variables de estado que se declaran.

export const useFormContacto = (initialForm, validateForm) => {
  // Declaramos las variables y las funciones.

  // Aquí asignamos a una variable el valor inicial del formulario que
  // recibimos por parámetro.
  const [form, setForm] = useState(initialForm);

  // Almacenamos los errores en un objeto vacío. Si algo no pasa las
  // validaciones, viene para aquí y se almacena en el objeto.
  const [errors, setErrors] = useState({});

  // Una variable "Cargando..." para las esperas en tareas asíncronas.
  const [loading, setLoading] = useState(false);

  // Un variable que guarde la respuesta del envío del formulario.
  const [response, setResponse] = useState(null);

  // Función que almacena los cambios en los inputs.
  // Con spread operator almacenamos una copia de form y luego le agrega los nuevos valores.
  const handleChange = (e) => {
    // Con esta destructuración la sintaxis de name y value sería más corta, pero para
    // mayor claridad preferimos la forma antigua.
    //const { name, value } = e.target;

    setForm({
      // La copia del form:
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // Función para que cuando el usuario deje de escribir (evento que recibe como parámetro),
  // pasen dos cosas:
  //    1) Se actualice el estado.
  //    2) Muestre los errores de validación, si los hubiere. (Los errores se guardan en
  //       el obj errors)
  const handleBlur = (e) => {
    // Se actualiza el estado.
    handleChange(e);

    // La funcíon que modifica la variable errors (obj) recibe como parámetro una funcíon
    // que ejecuta la validación del formulario que recibe como parámetro (validate Form(form)).
    // Si en esa validación devuelve errores, se almacenan en el objeto errors para luego mostrarlos al usuario.
    setErrors(validateForm(form));
  };

  // Función que envía un mensaje desde "contacto", a traves de email a la dirección mail especificada.
  // Volvemos a evaluar los posibles errores (setErrors(validateForm(form))).
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));

    // A mayores, tenemos que confirmar que el objeto que guarda los errores (error) esté
    // vacío antes del envío ((Object.keys(errors).length === 0) ).
    // Si cumple esta condición, procedemos al envío.
    if (Object.keys(errors).length === 0) {
      alert('Enviando Formulario');

      // Si todo ha ido bien, mostramos un mensaje "Cargando..." eso es el componente Loading
      setLoading(true);

      // Usamos fetch para la petición a la API formsubmit que nos enviará el mail.
      helpHttp()
        // Usamos el método post, que nos pide una url y un objeto con los datos que vamos a enviar
        .post('https://formsubmit.co/ajax/tiquauttattagre-6352@yopmail.com', {
          // El objeto que enviamos: el body con el formulario, los datos de cabera y el formato.
          body: form,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        // Esta petición tiene una respuesta. Aquí haremos cosas con esa respuesta:
        .then((res) => {
          // Pasar Loading a falso (el componente Loading deja de mostrarse)
          setLoading(false);

          // Pasar respuesta a true (porque ya hay respuesta) y mostrarle un mensajillo al usuario (coponente Message)
          setResponse(true);

          // Pasar el formulario a los valores iniciales (resetearlo)
          setForm(initialForm);

          // También establecemos un limite de tiempo para mostrar la respuesta, a los 5 segundos desaparece.
          setTimeout(() => setResponse(false), 5000);
        });
    } else {
      // Si no se cumple la condición del IF, no queremos que haga nada (return obligatorio)
      return;
    }
  };

  return {
    form: form,
    errors: errors,
    loading: loading,
    response: response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
