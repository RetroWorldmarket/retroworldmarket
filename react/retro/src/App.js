import './App.css';
import { useContext } from 'react';
import { Inicio } from './paginas/Inicio';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Catalogo } from './paginas/Catalogo';
import { Error404 } from './components/error404/Error404';
import { Producto } from './components/producto/Producto';
import Modales from './components/modal/Modales';
import { FormularioContacto } from './paginas/FormularioContacto';

import React from 'react';

import { EditarUsuario } from './components/editarUsuario/EditarUsuario';
import { AuthTokenContext } from './index';
import { InicioHeader } from './components/InicioHeader';
import { Ventas } from './components/ventas/Ventas';
import { Politica_privacidad } from './components/politicaPrivacidad/Politica_privacidad';
import { Preguntas_frecuentes } from './components/preguntasFrecuentes/Preguntas_frecuentes';
import { Mensajes } from './paginas/Mensajes';
import { useLocalStorage } from './hooks/useLocalStorage';
export const ContactoProducto = React.createContext(null);
const ContactoProductoProvider = ({ children }) => {
  const [interes, setInteres] = useLocalStorage(null, 'interesProductos');

  return (
    <ContactoProducto.Provider value={[interes, setInteres]}>
      {children}
    </ContactoProducto.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const [token] = useContext(AuthTokenContext);

  return token ? (
    children
  ) : (
    <p>No estás logueado, haz login en la barra superior</p>
  );
};

function App() {
  // Importamos el token para saber cuándo el usuario está logueado o no.

  return (
    <div className='App'>
      <BrowserRouter>
        <ContactoProductoProvider>
          <InicioHeader />
        </ContactoProductoProvider>

        <Switch>
          <Route exact path='/'>
            <Inicio />
          </Route>
          <Route exact path='/catalogo' component={Catalogo} />
          <Route exact path='/ventas' component={Ventas} />

          <Route exact path='/product/:idProduct'>
            <ContactoProductoProvider>
              <Producto />
            </ContactoProductoProvider>
          </Route>
          <Route exact path='/editarUsuario'>
            <PrivateRoute>
              <EditarUsuario />
            </PrivateRoute>
          </Route>
          <Route exact path='/contacto' component={FormularioContacto} />
          <Route
            exact
            path='/Politica_privacidad'
            component={Politica_privacidad}
          />
          <Route
            exact
            path='/Preguntas_frecuentes'
            component={Preguntas_frecuentes}
          />

          <Route exact path='/mensajes/:idProduct'>
            <PrivateRoute>
              <Mensajes />
            </PrivateRoute>
          </Route>
          <Route path='*' component={Error404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
