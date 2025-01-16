import axiosClient from "@/api/clients/rest-client";
import { ApiResponse } from "@/api/types/api-response";
import { PositionSubmissionRequest } from "@/api/types/requests";
import { Position } from "@/entities/position";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function usePositions() {
  const { data, isLoading } = useQuery<AxiosResponse<ApiResponse<Position>>>({
    queryKey: ["positions"],
    queryFn: () => axiosClient.get("/positions/all"),
  });

  return { positions: data?.data.data as Position[], isLoading };
}

export function useSumbitPosition() {
  const mutation = useMutation({
    mutationKey: ["submitPosition"],
    mutationFn: async (request: PositionSubmissionRequest) => {
      console.log(request);
      await axiosClient.post("/positions/create", request);
    },
  });

  return mutation;
}
