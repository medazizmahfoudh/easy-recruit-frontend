import axiosClient from "@/api/clients/rest-client";
import { ApiResponse } from "@/api/types/api-response";
import { Recruiter } from "@/entities/recruiter";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useRecruiters() {
  const { data, isLoading } = useQuery<AxiosResponse<ApiResponse<Recruiter>>>({
    queryKey: ["recruiters"],
    queryFn: () => axiosClient.get("/recruiters/all"),
  });

  return { recruiters: data?.data.data as Recruiter[], isLoading };
}
