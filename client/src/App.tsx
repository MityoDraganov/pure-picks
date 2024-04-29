import { Routes, Route } from 'react-router-dom';

//static
import { Home } from './Pages/Home/Home';

//auth
import { Register } from './Pages/Auth/Register';
import { Login } from './Pages/Auth/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth'>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
