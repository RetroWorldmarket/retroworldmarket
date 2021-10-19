import { useEffect, useState } from 'react';

export const useLocalStorage = (valorPorDefecto, key) => {
  //guardamos en una variable el valor de la key que hay en localStorage
  //si  no hay cogemos el valor por defecto
  const valorInicialDeLaKey =
    JSON.parse(localStorage.getItem(key)) ?? valorPorDefecto;

  //hacemos el custom hook, creamos un estado donde el valor inicial de la
  // key es la variable de arriba
  const [dato, setDato] = useState(valorInicialDeLaKey);

  //creamos un use effect para monitorizar la key y su valor en el
  //localStorage no olvidarse de enviarlo en JSON

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(dato));
  }, [dato, key]);

  //retornamos el valor de la key y la funcion que lo cambia, es decir el estado

  return [dato, setDato];
};
