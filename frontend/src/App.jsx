import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Companies from "./pages/Companies";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (<BrowserRouter> <Navbar />

    ```
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/companies"
        element={
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>


  );
}

export default App;
