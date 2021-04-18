import React from 'react'
import {Routes, Route} from 'react-router'

import Autos from './components/paginas/NuevoAuto';
import Consulta from './components/paginas/Consulta';

import Sidebar from './components/ui/Sidebar';

function App() {
  return (
    <div className="md:flex min-h-screen">
     <Sidebar />
     <div className="md:w-3/5 xl:w-4/5 p-6">
      <Routes>
        <Route path="/" element={<Consulta />} />
        <Route path="/nuevo-auto" element={<Autos />} />
      </Routes>
     </div>
   </div>
  );
}

export default App;
