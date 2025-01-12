import axiosClient from "@/api/clients/rest-client";
import { ApiResponse } from "@/api/types/api-response";
import { DataTable } from "@/components/data/data-table";
import { candidateColmuns } from "@/components/data/data-table-columns";
import { Candidate } from "@/entities/candidate";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const Candidates = () => {
  const { data, isLoading } = useQuery<AxiosResponse<ApiResponse<Candidate>>>({
    queryKey: ["candidates"],
    queryFn: () => axiosClient.get("/candidates/all"),
  });

  return (
    <div>
      <DataTable
        isLoading={isLoading}
        columns={candidateColmuns}
        data={data ? (data.data.data as Candidate[]) : []}
      />
    </div>
  );
};
export default Candidates;
