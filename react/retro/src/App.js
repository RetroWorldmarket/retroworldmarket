import './App.css';
import { Inicio, Articulo } from './components/Inicio';
import { InicioHeader } from './components/InicioHeader';
import Modales from './components/Modales';

function App() {
  return (
    <div className='App'>
      <InicioHeader />
      <Inicio />
      <Modales />
    </div>
  );
}

export default App;
