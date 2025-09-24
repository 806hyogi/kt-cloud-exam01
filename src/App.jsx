import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Home from './pages/Home';
import Result from './pages/Result';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/result/:count' element={<Result />} />
      </Routes>
    </Router>
  )
}

export default App;
