import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

import { NavigationBar } from "./Components/NavigationBar/NavigationBar";
import { Toaster } from "./Components/ui/Toast/toaster";

//static
import { Home } from "./Pages/Home/Home";

//auth
import { Register } from "./Pages/Auth/Register";
import { Login } from "./Pages/Auth/Login";

import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Profile } from "./Pages/Auth/Profile";

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <CartProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/auth">
              <Route path="register/:option" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile isIndividual />} />
              <Route path="profile/:sellerId" element={<Profile />} />
            </Route>

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
