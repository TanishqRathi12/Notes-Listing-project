import React from "react";
import Dashboard from "./Pages/Dashboard.tsx";
import SignIn from "./Pages/Signin.tsx";
import SignUp from "./Pages/Signup.tsx";
import CreateNote from "./Pages/CreateNote.tsx";
import ProtectedRoute from "./Auth/ProtectedRoute.tsx";
import { AuthProvider } from "./Context/AuthContext.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn/>,
    },
    {
      path: "/signup",
      element: <SignUp/>,
    },
    {
      path: "/dashboard",
      element:
      <ProtectedRoute>
      <Dashboard/>
      </ProtectedRoute> ,
    },
    {
      path:"/create",
      element:
      <ProtectedRoute>
      <CreateNote/>
      </ProtectedRoute>,
    },
  ]);
  return (
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  );
};

export default App;
