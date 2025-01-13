import { DataTable } from "@/components/data/data-table";
import { candidateColmuns } from "@/components/data/data-table-columns";
import { Candidate } from "@/entities/candidate";
import { useCandidates } from "@/hooks/api/use-candidate";

const Candidates = () => {
  const { candidates, isLoading } = useCandidates();

  return (
    <div>
      <DataTable
        isLoading={isLoading}
        columns={candidateColmuns}
        data={candidates ? (candidates as Candidate[]) : []}
      />
    </div>
  );
};
export default Candidates;
