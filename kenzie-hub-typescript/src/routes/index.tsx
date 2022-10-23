import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Dashbord } from "../pages/dashbord";

import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { ProtectedRoutes } from "../component/protectedRoutes";

export function RoutesMain() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashbord" element={<Dashbord />} />
        </Route>

        <Route path="*" element={<h1>Página não encontrada.</h1>} />
      </Routes>
    </>
  );
}
