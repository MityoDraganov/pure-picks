import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { DeliveriesProvider } from "./contexts/DeliveriesContext";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Auth/Login";
import { NavigationBar } from "./Components/NavigationBar/NavigationBar";
import { Profile } from "./Pages/Auth/Profile";
import Pusher from "pusher-js";
import { Register } from "./Pages/Auth/Register";
import { Toaster } from "./Components/ui/Toast/toaster";

function App() {
  return (
    <div className=" overflow-hidden">
      <Toaster />
      <AuthProvider>
        <CartProvider>
          <DeliveriesProvider>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/auth">
                <Route path="register/:option" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="profile/:userId" element={<Profile />} />
              </Route>

              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="*" element={<Home />} />
            </Routes>
          </DeliveriesProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
