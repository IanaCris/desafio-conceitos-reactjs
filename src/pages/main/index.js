import React, { useState, useEffect }  from 'react';
import api from '../../services/api';

import "./styles.css";

export default function Main() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Iana ${Date.now()}`,
      url: 'https://github.com/ianacris',
      techs: ['Node', 'ReactJS']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <>   
    
    <div className="repositories-list">
      <h1>My repositories</h1>
      <h4>Contagem de repositorios: {repositories.length}</h4>

      {repositories.map(repository => (
        <article key={repository.id}>
          <strong>{repository.title}</strong>

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </article>
      ))}

      <button onClick={handleAddRepository}>Adicionar</button>
{/*       
      <button onClick={handleAddRepository}>Adicionar</button>
 
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
*/}
    </div>
    </>
  );
}