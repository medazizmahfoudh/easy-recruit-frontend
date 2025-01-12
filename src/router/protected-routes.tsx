import Authenticated from "@/components/utils/authenticated";
import { Navigate, Outlet, Route, Routes } from "react-router";
import PATHS from "@/router/paths";
import DashboardPage from "@/features/dashboard/page";
import Applications from "@/features/dashboard/applications";
import Positions from "@/features/dashboard/positions";
import Candidates from "@/features/dashboard/candidates";
import Interviews from "@/features/dashboard/interviews";
import Configuration from "@/features/dashboard/configuration";
import Classification from "@/features/dashboard/classification";
import { Dashboard } from "@/features/dashboard/dashboard";
import Recruiters from "@/features/dashboard/recruiters";

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
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route path="" element={<Dashboard />} />
          <Route path="applications" element={<Applications />} />
          <Route path="positions" element={<Positions />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="recruiters" element={<Recruiters />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="configuration" element={<Configuration />} />
          <Route path="classification" element={<Classification />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
