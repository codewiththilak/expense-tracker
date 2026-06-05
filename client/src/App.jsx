import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register"; 
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route 
        path = "/"
        element={<Login />}
        />

        <Route 
        path = "/register"
        element= {<Register />}
        />

        <Route 
        path="/dashboard"
        element = {
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        />

        <Route 
        path="/add-transaction"
        element = {
          <ProtectedRoute> 
            <AddTransaction /> 
          </ProtectedRoute>
        }
        />
        
        <Route 
        path = "/edit-transaction/:id"
        element={
          <ProtectedRoute>
            <EditTransaction />
          </ProtectedRoute>
        }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App; 

