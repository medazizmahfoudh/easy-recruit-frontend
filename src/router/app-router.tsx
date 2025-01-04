import { BrowserRouter, Route, Routes } from "react-router";
import ProtectedRoutes from "@/router/protected-routes";
import PublicRoutes from "@/router/public-routes";
import AuthProvider from "@/context/auth-context";
import ScrollRestoration from "@/components/utils/scroll-restoration";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollRestoration />
      <AuthProvider>
        <ProtectedRoutes />
      </AuthProvider>
      <PublicRoutes />
      <Routes>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
