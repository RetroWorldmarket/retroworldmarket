import './App.css';
import { Inicio } from './components/Inicio';
import { InicioHeader } from './components/InicioHeader';
import { PlusArticuloModal } from './components/articulo/PlusArticuloModal';
import { OrdenarPor } from './components/ordenarPor/OrdenarPor';
import Modales from './components/Modales';

function App() {
  return (
    <div className='App'>
      <InicioHeader />
      <OrdenarPor />
      <PlusArticuloModal />
      <Inicio />
    </div>
  );
}

export default App;
