import * as tokenStorage from "@/storage/token-storage";
import axiosClient from "@/api/clients/rest-client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/auth-context";
import { AxiosError } from "axios";
import { toast } from "../use-toast";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  username: string;
  email: string;
  roles: string[];
  id: number;
  // Add more fields as needed
}

interface ErrorResponse {
  errorCode: string;
  message: string;
  // Add more fields as needed
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { setToken, setRole } = useAuth();

  return useMutation({
    mutationFn: (request: LoginRequest) =>
      axiosClient
        .post<LoginResponse>("/api/core/login", request)
        .then((res) => {
          console.log(res.data.accessToken);
          tokenStorage.storeToken("token", res.data.accessToken);
          tokenStorage.storeToken(
            "role",
            res.data.roles[res.data.roles.length - 1]
          );

          setToken(res.data.accessToken);
          setRole(res.data.roles[res.data.roles.length - 1]);
        }),
    onSuccess: () => {
      toast({
        title: "Login Success",
        description: "You have successfully logged in",
      });
      navigate("/dashboard");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast({
        title: "Login Failed",
        description:
          "Oops! Something went wrong : " + error.response?.data.message,
      });
    },
  });
};
