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
import { useInterviews } from "@/hooks/api/use-interview";
import { usePositions } from "@/hooks/api/use-position";
import { useRecruiters } from "@/hooks/api/use-recruiter";

const Interviews = () => {
  const { interviews, isLoading } = useInterviews();
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

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Dialog>
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
                positions={positionReduced}
                recruiters={recruitersReduced}
                candidates={candidateReduced}
              />
            </div>
          </DialogContent>
        </Dialog>
        <DataTable
          isLoading={isLoading}
          columns={interviewColumns}
          data={interviews ? (interviews as InterviewReduced[]) : []}
        />
      </div>
    </div>
  );
};

export default Interviews;
