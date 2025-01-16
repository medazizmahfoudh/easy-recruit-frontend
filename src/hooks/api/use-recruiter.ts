import axiosClient from "@/api/clients/rest-client";
import { ApiResponse } from "@/api/types/api-response";
import { RecruiterSubmissionRequest } from "@/api/types/requests";
import { Recruiter } from "@/entities/recruiter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useRecruiters() {
  const { data, isLoading, refetch } = useQuery<
    AxiosResponse<ApiResponse<Recruiter>>
  >({
    queryKey: ["recruiters"],
    queryFn: () => axiosClient.get("/recruiters/all"),
  });

  return { recruiters: data?.data.data as Recruiter[], isLoading, refetch };
}

export function useSumbitRecruiter() {
  const mutation = useMutation({
    mutationKey: ["submitRecruiter"],
    mutationFn: async (request: RecruiterSubmissionRequest) => {
      console.log(request);
      await axiosClient.post("/recruiters/create", request);
    },
  });

  return mutation;
}

export function useDeleteRecruiters() {
  const mutation = useMutation({
    mutationKey: ["deleteRecruiters"],
    mutationFn: async (uuids: string[]) => {
      await axiosClient.post(`/recruiters/delete-bulk`, uuids);
    },
  });

  return mutation;
}
