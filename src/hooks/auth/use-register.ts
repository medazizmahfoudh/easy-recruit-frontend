import { useNavigate } from "react-router";
import { useToast } from "../use-toast";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/api/clients/rest-client";
import { AxiosError } from "axios";

interface RegisterRequest {
  email: string;
  password: string;
  // Add more fields as needed
}

interface RegisterResponse {
  // Add fields as needed
}

interface ErrorResponse {
  errorCode: string;
  message: string;
}

export const useRegister = () => {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: (request: RegisterRequest) =>
      axiosClient.post<RegisterResponse>(
        "http://localhost:8090/api/v1/auth/register-client",
        request
      ),
    onSuccess: () => {
      // Handle success
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      // Handle error
    },
  });
};
