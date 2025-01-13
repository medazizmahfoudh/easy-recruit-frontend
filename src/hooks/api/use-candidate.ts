import axiosClient from "@/api/clients/rest-client";
import { ApiResponse } from "@/api/types/api-response";
import { Candidate } from "@/entities/candidate";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useCandidates() {
  const { data, isLoading } = useQuery<AxiosResponse<ApiResponse<Candidate>>>({
    queryKey: ["candidates"],
    queryFn: () => axiosClient.get("/candidates/all"),
  });

  return { candidates: data?.data.data as Candidate[], isLoading };
}
