import './App.css';
import { Inicio } from './paginas/Inicio';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { PlusArticuloModal } from './components/articulo/PlusArticuloModal';
import { Mensajes } from './paginas/Mensajes';
import { Catalogo } from './paginas/Catalogo';
import { Error404 } from './components/error404/Error404';
import { Producto } from './components/producto/Producto';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Inicio} />
          <Route exact path='/catalogo' component={Catalogo} />
          <Route exact path='/product/:idProduct' component={Producto} />
          <Route path='*' component={Error404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
