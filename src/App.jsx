import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import DownloadPage from "./pages/DownloadPage";
import MainLayout from "./layouts/MainLayout";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createContext } from "react";

export const AuthContext = createContext();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/download/:id" element={<DownloadPage />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: false,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  // Global Context States
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          token,
          setToken,
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <RouterProvider router={router} />
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
