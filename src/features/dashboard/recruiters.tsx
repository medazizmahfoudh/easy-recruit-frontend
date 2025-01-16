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
import { useDeleteRecruiters, useRecruiters } from "@/hooks/api/use-recruiter";
import { toast } from "@/hooks/use-toast";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

const Recruiters = () => {
  const { recruiters, isLoading, refetch } = useRecruiters();
  const [selectedRows, setSelectedRows] = useState<Row<Recruiter>[]>([]);
  const deleteMutation = useDeleteRecruiters();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
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
              <RecruiterForm refetch={refetch} setFormOpen={setOpen} />
            </div>
          </DialogContent>
        </Dialog>
        <DataTable
          isLoading={isLoading}
          columns={recruiterColumns}
          data={recruiters ? (recruiters as Recruiter[]) : []}
          setSelectedRows={setSelectedRows}
          deletable={true}
          deleteAction={() => {
            deleteMutation
              .mutateAsync(selectedRows.map((row) => row.original.uuid))
              .then(() => {
                toast({
                  title:
                    "You have succesffully deleted the selected recruiters.",
                });
                refetch();
              })
              .catch(() => {
                toast({
                  title: deleteMutation.error?.message,
                });
              });
          }}
        />
      </div>
    </div>
  );
};

export default Recruiters;
