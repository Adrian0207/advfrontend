import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return ( 
        <div className="sm::w-1/3 md:w-1/4 xl:w-1/5 bg-gray-800">
            <div className="p-6">
                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">Pico y Placa</p>

                <p className="mt-3 text-gray-600">Consulta si puedes circular hoy:</p>

                <nav className="mt-10">
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" end to="/">Consultas</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" end to="/nuevo-auto">Nuevo Auto</NavLink>
                </nav>
            </div>
        </div>
     );
}
 
export default Sidebar;