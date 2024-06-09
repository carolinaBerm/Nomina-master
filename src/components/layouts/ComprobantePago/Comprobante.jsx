// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './Comprobante.css'; // Asegúrate de crear y enlazar este archivo CSS

// const Comprobante = () => {
//     const location = useLocation();
//     const { result } = location.state || {};

//     return (
//         <div className="comprobante">
//             <h2>Comprobante de Pago</h2>
//             {result ? (
//                 <div className="comprobante-detalle">
//                     <p><span>Nombre:</span> {result.name}</p>
//                     <p><span>Apellidos:</span> {result.apellidos}</p>
//                     <p><span>Documento:</span> {result.documento}</p>
//                     <p><span>Días trabajados:</span> {result.daysWorked}</p>
//                     <p><span>Salario proporcional:</span> ${result.proportionalSalary.toFixed(2)}</p>
//                     <p><span>Auxilio de transporte proporcional:</span> ${result.proportionalTransportAllowance.toFixed(2)}</p>
//                     <p><span>Salario total:</span> ${result.totalSalary.toFixed(2)}</p>
//                     <p><span>Salario diario:</span> ${result.dailySalary.toFixed(2)}</p>
//                 </div>
//             ) : (
//                 <p>No hay datos para mostrar.</p>
//             )}
//         </div>
//     );
// };

// export default Comprobante;

// NUEVA PRUEBA

import React, { useEffect, useState } from 'react';
import './Comprobante.css'; // Ensure this file exists and is correctly linked

const Comprobante = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const savedResults = JSON.parse(localStorage.getItem('liquidationResults')) || [];
        setResults(savedResults);
    }, []);

    return (
        <div className="comprobante">
            <h2>Comprobante de Pago</h2>
            {results.length > 0 ? (
                results.map((result, index) => (
                    <div key={index} className="comprobante-detalle">
                        <p><span>Nombre:</span> {result.name}</p>
                        <p><span>Apellidos:</span> {result.apellidos}</p>
                        <p><span>Documento:</span> {result.documento}</p>
                        <p><span>Días trabajados:</span> {result.daysWorked}</p>
                        <p><span>Salario proporcional:</span> ${result.proportionalSalary.toFixed(2)}</p>
                        <p><span>Auxilio de transporte proporcional:</span> ${result.proportionalTransportAllowance.toFixed(2)}</p>
                        <p><span>Salario total:</span> ${result.totalSalary.toFixed(2)}</p>
                        <p><span>Salario diario:</span> ${result.dailySalary.toFixed(2)}</p>
                    </div>
                ))
            ) : (
                <p>No hay datos para mostrar.</p>
            )}
        </div>
    );
};

export default Comprobante;
