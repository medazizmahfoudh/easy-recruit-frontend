import { DataTable } from "@/components/data/data-table";
import { applicationColmuns } from "@/components/data/data-table-columns";
import { dummyApplications } from "@/entities/application";

const Applications = () => {
  return (
    <div>
      <DataTable columns={applicationColmuns} data={dummyApplications} />
    </div>
  );
};

export default Applications;
