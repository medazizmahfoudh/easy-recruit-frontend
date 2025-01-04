import Authenticated from "@/components/utils/authenticated";
import { Navigate, Outlet, Route, Routes } from "react-router";
import Dashboard from "@/components/routes/dashboard";
import PATHS from "@/router/paths";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated
            userRole={""}
            whenSuccess={<Outlet />}
            whenFail={<Navigate to={PATHS.AUTH_LOGIN} />}
          />
        }
      >
        {/* Add protected routes here */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
