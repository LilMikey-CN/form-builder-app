import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormBuilder from './components/FormBuilder/FormBuilder';
import FormList from './components/FormList/FormList';
import FillForm from './components/FillForm/FillForm';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/create-form">Create Form</Link>
        <Link to="/list-forms">List Forms</Link>
      </nav>
      <Routes>
        <Route path="create-form" element={<FormBuilder />} />
        <Route path="list-forms" element={<FormList />} />
        <Route path="fill-form/:id" element={<FillForm />} />
        <Route path="/" element={<FormList />} />
      </Routes>
    </Router>
  );
}

export default App;

