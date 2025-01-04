import Home from "@/components/routes/home";
import Login from "@/components/routes/login";
import RecoverPassword from "@/components/routes/recover-password";
import Register from "@/components/routes/register";
import { Outlet, Route, Routes } from "react-router";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Outlet />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="recover-password" element={<RecoverPassword />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
