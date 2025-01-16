import { DataTable } from "@/components/data/data-table";
import { interviewColumns } from "@/components/data/data-table-columns";
import InterviewForm from "@/components/forms/interview-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InterviewReduced } from "@/entities/interview";
import { useCandidates } from "@/hooks/api/use-candidate";
import { useDeleteInterviews, useInterviews } from "@/hooks/api/use-interview";
import { usePositions } from "@/hooks/api/use-position";
import { useRecruiters } from "@/hooks/api/use-recruiter";
import { toast } from "@/hooks/use-toast";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

const Interviews = () => {
  const { interviews, isLoading, refetch } = useInterviews();
  const { recruiters } = useRecruiters();
  const { candidates } = useCandidates();
  const { positions } = usePositions();

  const recruitersReduced =
    recruiters?.map((recruiter) => ({
      value: recruiter.uuid,
      label: `${recruiter.firstname} ${recruiter.lastname}`,
    })) || [];
  const candidateReduced =
    candidates?.map((candidate) => ({
      value: candidate.uuid,
      label: `${candidate.firstname} ${candidate.lastname}`,
    })) || [];

  const positionReduced =
    positions?.map((position) => ({
      value: position.uuid,
      label: position.name,
    })) || [];

  const [selectedRows, setSelectedRows] = useState<Row<InterviewReduced>[]>([]);
  const deleteMutation = useDeleteInterviews();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="items-start">
              Schedule an interview
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule a new interview</DialogTitle>
              <DialogDescription>
                Fill out the details below to schedule a new interview.
              </DialogDescription>
            </DialogHeader>
            <div>
              <InterviewForm
                setFormOpen={setOpen}
                refetch={refetch}
                positions={positionReduced}
                recruiters={recruitersReduced}
                candidates={candidateReduced}
              />
            </div>
          </DialogContent>
        </Dialog>
        <DataTable
          filterable={true}
          filterColumn="candidate_name"
          filterPlaceholder="Search by candidate name..."
          isLoading={isLoading}
          columns={interviewColumns}
          data={interviews ? (interviews as InterviewReduced[]) : []}
          setSelectedRows={setSelectedRows}
          deletable={true}
          deleteAction={() => {
            deleteMutation
              .mutateAsync(selectedRows.map((row) => row.original.uuid))
              .then(() => {
                toast({
                  title:
                    "You have succesffully deleted the selected interviews",
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

export default Interviews;
