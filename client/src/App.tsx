import { Routes, Route } from "react-router-dom";
//static
import { Home } from "./Pages/Home/Home";

//auth
import { Register } from "./Pages/Auth/Register";
import { Login } from "./Pages/Auth/Login";

import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import { NavigationBar } from "./Components/NavigationBar/NavigationBar";
import { Toaster } from "./Components/ui/Toast/toaster";

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/auth">
            <Route path="register/:option" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
