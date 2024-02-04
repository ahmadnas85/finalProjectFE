import logo from './logo.svg';
import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import Registration from './components/registration/Registration';
import Login from './components/registration/Login';
import { getAllItems } from './services/api';
import {UserProvider} from './components/context/UserContext';
import { CartProvider} from './components/context/CartContext';
import CartComp from './components/home/CartComp'
import OrdersList from './components/home/OrdersList'



function App() {
  
  return (
    <UserProvider>
      <CartProvider>
        <div className="App">
          <NavBar />
          <div>
            <Routes>
              <Route path="/Orders" element={<OrdersList />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<CartComp />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          
        </div>
        </CartProvider>
    </UserProvider>
  );
}

export default App;
