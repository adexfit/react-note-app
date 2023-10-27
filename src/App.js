import {
  Routes, 
  Route
} from "react-router-dom";

import './App.css';
import Header from './components/Header'
import Notes from './pages/Notes'
import Note from './pages/Note'

function App() {
  return (
    <div>
      <div className="container dark">
        <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Notes />}  exact />
          <Route path="/note/:id" element={<Note />}   />
        </Routes>
        </div>
      </div>


    </div>
  );
}

export default App;



