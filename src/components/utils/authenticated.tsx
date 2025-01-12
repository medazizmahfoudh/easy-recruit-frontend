import React from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/api/types/authentication";

type AuthenticatedProps = {
  userRole: string;
  whenSuccess: React.ReactNode;
  whenFail: React.ReactNode;
};

const Authenticated = ({
  userRole,
  whenSuccess,
  whenFail,
}: AuthenticatedProps) => {
  const token = localStorage.getItem("token");
  let role = "";
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token as string);
    role = decoded.role;
  }

  // if (token && role === userRole) {
  if (true && role === userRole) {
    return <>{whenSuccess}</>;
  } else {
    return <>{whenFail}</>;
  }
};

export default Authenticated;
