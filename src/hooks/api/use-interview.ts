import axiosClient from "@/api/clients/rest-client";
import { ApiResponse } from "@/api/types/api-response";
import { InterviewSubmissionRequest } from "@/api/types/requests";
import { Interview, InterviewReduced } from "@/entities/interview";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useInterviews() {
  const mapToInterviewReduced = (
    interviews: Interview[]
  ): InterviewReduced[] => {
    return interviews.map((interview) => ({
      uuid: interview.uuid,
      position_name: interview.position.name,
      recruiter_name: `${interview.recruiter.firstname} ${interview.recruiter.lastname}`,
      candidate_name: `${interview.candidate.firstname} ${interview.candidate.lastname}`,
      date: interview.date,
      status: interview.status,
      comment: interview.comment,
      location: interview.location,
    }));
  };

  const { data, isLoading, refetch } = useQuery<
    AxiosResponse<ApiResponse<InterviewReduced[]>>
  >({
    queryKey: ["interviews"],
    queryFn: async () => {
      const response = await axiosClient.get("/interviews/all");
      const interviews = response.data.data as Interview[];
      const reducedInterviews = mapToInterviewReduced(interviews);
      return {
        ...response,
        data: { ...response.data, data: reducedInterviews },
      };
    },
  });

  return {
    interviews: data?.data.data as InterviewReduced[],
    isLoading,
    refetch,
  };
}

export function useSumbitInterview() {
  const mutation = useMutation({
    mutationKey: ["submitInterview"],
    mutationFn: async (request: InterviewSubmissionRequest) => {
      await axiosClient.post("/interviews/create", request);
    },
  });

  return mutation;
}

export function useDeleteInterviews() {
  const mutation = useMutation({
    mutationKey: ["deleteInterviews"],
    mutationFn: async (uuids: string[]) => {
      await axiosClient.post(`/interviews/delete-bulk`, uuids);
    },
  });

  return mutation;
}
