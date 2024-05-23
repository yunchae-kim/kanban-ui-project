import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';

function App() {
  const handleTaskSubmit = (title: string, tags: string[]) => {
    console.log('Task submitted:', title, tags);
  };

  return (
    <div className="App">
      <TaskForm onSubmit={handleTaskSubmit} />
    </div>
  );
}

export default App;