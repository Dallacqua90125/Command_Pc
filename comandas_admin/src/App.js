import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [comandas, setComandas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/comandas')
      .then(response => setComandas(response.data))
      .catch(error => console.error('Erro ao buscar comandas:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Comandas</h1>
      <ul>
        {comandas.map(comanda => (
          <li key={comanda.id}>
            {comanda.descricao} - R$ {comanda.valor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
