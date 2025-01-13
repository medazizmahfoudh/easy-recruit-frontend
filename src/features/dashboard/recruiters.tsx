import { DataTable } from "@/components/data/data-table";
import { recruiterColumns } from "@/components/data/data-table-columns";
import RecruiterForm from "@/components/forms/recruiter-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Recruiter } from "@/entities/recruiter";
import { useRecruiters } from "@/hooks/api/use-recruiter";

const Recruiters = () => {
  const { recruiters, isLoading } = useRecruiters();
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="items-start">
              Add new recruiter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Recruiter</DialogTitle>
              <DialogDescription>
                Fill out the details below to add a new recruiter.
              </DialogDescription>
            </DialogHeader>
            <div>
              <RecruiterForm />
            </div>
          </DialogContent>
        </Dialog>
        <DataTable
          isLoading={isLoading}
          columns={recruiterColumns}
          data={recruiters ? (recruiters as Recruiter[]) : []}
        />
      </div>
    </div>
  );
};

export default Recruiters;
