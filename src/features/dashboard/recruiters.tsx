import axiosClient from "@/api/clients/rest-client";
import { ApiResponse } from "@/api/types/api-response";
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
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const Recruiters = () => {
  const { data, isLoading } = useQuery<AxiosResponse<ApiResponse<Recruiter>>>({
    queryKey: ["recruiters"],
    queryFn: () => axiosClient.get("/recruiters/all"),
  });

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
          data={data?.data ? (data.data.data as Recruiter[]) : []}
        />
      </div>
    </div>
  );
};

export default Recruiters;
