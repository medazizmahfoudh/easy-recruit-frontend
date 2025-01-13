import axiosClient from "@/api/clients/rest-client";
import { ApiResponse } from "@/api/types/api-response";
import { Interview, InterviewReduced } from "@/entities/interview";
import { useQuery } from "@tanstack/react-query";
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
    }));
  };

  const { data, isLoading } = useQuery<
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

  return { interviews: data?.data.data as InterviewReduced[], isLoading };
}
