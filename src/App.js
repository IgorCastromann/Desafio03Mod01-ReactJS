import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";
// import Axios from "axios";

function App() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
        setProjects(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Igor Castro"
  })
  const project = response.data
 
    setProjects([...projects, project])

  
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`projects/${id}`)

    const projectIndex = projects.findIndex(project => project.id === id) 
    const projectArray = [ ...projects ]; 
    projectArray.splice(projectIndex, 1); 
    setProjects(projectArray); 

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {projects.map(project => <li key={project.id}>
          {project.title}
          
          <button onClick={() =>handleRemoveRepository(project.id)}>
            Remover
          </button>
          </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
