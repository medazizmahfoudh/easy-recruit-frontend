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

const Interviews = () => {
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
              <InterviewForm />
            </div>
          </DialogContent>
        </Dialog>
        <DataTable columns={interviewColumns} data={[]} />
      </div>
    </div>
  );
};

export default Interviews;
