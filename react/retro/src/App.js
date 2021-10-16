import './App.css';
import { Inicio } from './components/Inicio';
import { InicioHeader } from './components/InicioHeader';
import { PlusArticuloModal } from './components/articulo/PlusArticuloModal';
// import Modales from './components/Modales';

function App() {
  return (
    <div className='App'>
      <InicioHeader />
      <PlusArticuloModal />
      <Inicio />
    </div>
  );
}

export default App;
