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
<<<<<<< HEAD
import { Politica_privacidad } from './components/politicaPrivacidad/Politica_privacidad';
=======
import { CrearProducto } from './components/crearProducto/CrearProducto';
import { Ventas } from './components/ventas/Ventas';
>>>>>>> main

const PrivateRoute = ({ children }) => {
    const [token] = useContext(AuthTokenContext);

    return token ? (
        children
    ) : (
        <p>No estás logueado, haz login en la barra superior</p>
    );
};

function App() {
<<<<<<< HEAD
    // Importamos el token para saber cuándo el usuario está logueado o no.

    return (
        <div className='App'>
            <BrowserRouter>
                <InicioHeader />
                <Switch>
                    <Route exact path='/'>
                        <Inicio />
                    </Route>
                    <Route exact path='/catalogo' component={Catalogo} />

                    <Route exact path='/product/:idProduct'>
                        <Producto />
                    </Route>

                    <Route
                        exact
                        path='/product/:idProduct'
                        component={Producto}
                    />
                    <Route exact path='/editarUsuario'>
                        <PrivateRoute>
                            <EditarUsuario />
                        </PrivateRoute>
                    </Route>
                    <Route
                        exact
                        path='/contacto'
                        component={FormularioContacto}
                    />
                    <Route
                        exact
                        path='/politicaPrivacidad'
                        component={Politica_privacidad}
                    />

                    <Route path='*' component={Error404} />
                </Switch>
            </BrowserRouter>
        </div>
    );
=======
  // Importamos el token para saber cuándo el usuario está logueado o no.

  return (
    <div className='App'>
      <BrowserRouter>
        <InicioHeader />
        <Switch>
          <Route exact path='/'>
            <Inicio />
          </Route>
          <Route exact path='/catalogo' component={Catalogo} />
          <Route exact path='/ventas' component={Ventas} />

          <Route exact path='/product/:idProduct'>
            <Producto />
          </Route>

          <Route exact path='/product/:idProduct' component={Producto} />
          <Route exact path='/editarUsuario'>
            <PrivateRoute>
              <EditarUsuario />
            </PrivateRoute>
          </Route>
          <Route exact path='/contacto' component={FormularioContacto} />

          <Route path='*' component={Error404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
>>>>>>> main
}

export default App;
