import * as tokenStorage from "@/storage/token-storage";
import axiosClient from "@/api/clients/rest-client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useToast } from "../use-toast";
import { useAuth } from "@/context/auth-context";
import { JwtPayload } from "@/api/types/authentication";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  // Add more fields as needed
}

interface ErrorResponse {
  errorCode: string;
  message: string;
  // Add more fields as needed
}

export const useLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setToken } = useAuth();

  return useMutation({
    mutationFn: (request: LoginRequest) =>
      axiosClient.post<LoginResponse>("", request).then((res) => {
        tokenStorage.storeToken("token", res.data.access_token);
        setToken(res.data.access_token);
      }),
    onSuccess: () => {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode<JwtPayload>(token as string);
      // Handle success
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      // Handle error
    },
  });
};
