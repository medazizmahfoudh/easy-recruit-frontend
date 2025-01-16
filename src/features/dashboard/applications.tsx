import { DataTable } from "@/components/data/data-table";
import { applicationColmuns } from "@/components/data/data-table-columns";
import { useApplications } from "@/hooks/api/use-application";

const Applications = () => {
  const { applications, isLoading } = useApplications();
  console.log(applications);

  return (
    <div>
      <DataTable
        isLoading={isLoading}
        columns={applicationColmuns}
        data={applications || []}
      />
    </div>
  );
};

export default Applications;
