import React from "react";

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

  if (token && userRole === userRole) {
    return <>{whenSuccess}</>;
  } else {
    return <>{whenFail}</>;
  }
};

export default Authenticated;
