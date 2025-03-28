import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import Saved from './pages/Saved';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="saved" element={<Saved />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
