import axiosClient from "@/api/clients/rest-client";
import { ApiResponse } from "@/api/types/api-response";
import { Application, ApplicationReduced } from "@/entities/application";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useApplications() {
  const mapToApplicationReduced = (
    applications: Application[]
  ): ApplicationReduced[] => {
    return applications.map((application) => ({
      uuid: application.uuid,
      status: application.status,
      candidate_first_name: application.candidate.firstname,
      candidate_last_name: application.candidate.lastname,
      candidate_email: application.candidate.email,
      // candidate_cv: application.cv.document,
      position_name: application.position.name,
      position_location: application.position.location,
    }));
  };

  const { data, isLoading } = useQuery<
    AxiosResponse<ApiResponse<ApplicationReduced>>
  >({
    queryKey: ["applications"],
    queryFn: async () => {
      const response = await axiosClient.get("/applications/all");
      const applications = response.data.data as Application[];
      const reducedApplications = mapToApplicationReduced(applications);
      return {
        ...response,
        data: { ...response.data, data: reducedApplications },
      };
    },
  });

  return { applications: data?.data.data as ApplicationReduced[], isLoading };
}
