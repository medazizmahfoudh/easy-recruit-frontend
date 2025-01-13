import axiosClient from "@/api/clients/rest-client";
import { ApiResponse } from "@/api/types/api-response";
import { Position } from "@/entities/position";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function usePositions() {
  const { data, isLoading } = useQuery<AxiosResponse<ApiResponse<Position>>>({
    queryKey: ["positions"],
    queryFn: () => axiosClient.get("/positions/all"),
  });

  return { positions: data?.data.data as Position[], isLoading };
}
