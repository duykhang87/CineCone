//import logo from './logo.svg';
//import './App.css';
import UserInterface from './user/UserInterface';
import AdminInterface from './admin/AdminInterface';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';




function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      <Routes>
        <Route path="/*" element={<UserInterface />} />
        <Route path="/admin/*" element={<AdminInterface />} />
      </Routes>
      </div>
      <ToastContainer />
      </BrowserRouter>
  );
}

export default App;
