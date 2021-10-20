import './App.css';
import { Inicio } from './paginas/Inicio';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { PlusArticuloModal } from './components/articulo/PlusArticuloModal';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/mensajes'>
            <h1>Chanchito Feliz!!!</h1>
          </Route>
          <Route path='/'>
            <Inicio />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
