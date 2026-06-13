// import { useState } from "react";

// import LoginForm from "./components/LoginForm";

// import { Routes, Route, Navigate } from "react-router-dom";

// import Dashboard from "./pages/Dashboard";
// import Students from "./pages/Students";
// import AddStudent from "./pages/AddStudent";
// import Register from "./pages/Register";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem("token")
//   );

//   if (!isLoggedIn) {
//     return (
//       <LoginForm
//         onLogin={() => setIsLoggedIn(true)}
//       />
//     );
//   }

//   return (

//     <Routes>

//       <Route
//         path="/dashboard"
//         element={
//           <Dashboard
//             onLogout={() =>
//               setIsLoggedIn(false)
//             }
//           />
//         }
//       />

//       <Route
//         path="/students"
//         element={<Students />}
//       />

//       <Route
//         path="/add-student/:id?"
//         element={<AddStudent />}
//       />

//       <Route
//         path="*"
//         element={
//           <Navigate to="/dashboard" />
//         }
//       />
     

//     </Routes>

//   );
// }

// export default App;

import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <Routes>

      {/* ---------- Public Routes ---------- */}

      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <LoginForm
              onLogin={() =>
                setIsLoggedIn(true)
              }
            />
          )
        }
      />

      <Route
        path="/register"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <Register />
          )
        }
      />

      {/* ---------- Protected Routes ---------- */}

      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard
              onLogout={() =>
                setIsLoggedIn(false)
              }
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/students"
        element={
          isLoggedIn ? (
            <Students />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/add-student/:id?"
        element={
          isLoggedIn ? (
            <AddStudent />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* ---------- Default Route ---------- */}

      <Route
        path="*"
        element={
          <Navigate
            to={
              isLoggedIn
                ? "/dashboard"
                : "/login"
            }
          />
        }
      />

    </Routes>
  );
}

export default App;