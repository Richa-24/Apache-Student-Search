import React from 'react';
import { Route } from 'react-router-dom'
import Add from './Pages/Add';
import Dashboard from "./Pages/Dashboard"
import Edit from "./Pages/Edit"

function App() {

  return (
    <>
      <Route path="/" exact render={(props) => <Dashboard {...props} />} />
      <Route path="/:email" render={(props) => <Edit {...props} />} />
      <Route path="/add" render={(props) => <Add {...props} />} />
    </>
  );
}

export default App;