import React from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBord/KanbanBoard';
import TaskForm from './components/TaskForm/TaskForm';

function App() {
  return (
    <div className="App">
      <KanbanBoard></KanbanBoard>
    </div>
  );
}

export default App;