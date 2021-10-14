import './App.css';
import { Inicio, Articulo } from './components/Inicio';
import { InicioHeader } from './components/InicioHeader';

function App() {
  return (
    <div className='App'>
      <Inicio />
      <InicioHeader />
    </div>
  );
}

export default App;
