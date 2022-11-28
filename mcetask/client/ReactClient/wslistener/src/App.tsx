import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import { HubConnection } from './pages/hubConnection';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HubConnection />} />
      </Routes>
    </div>
  );
}

export default App;
