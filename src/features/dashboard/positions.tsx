import { DataTable } from "@/components/data/data-table";
import { positionColmuns } from "@/components/data/data-table-columns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Position } from "@/entities/position";
import PostionForm from "@/components/forms/position-form";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/clients/rest-client";
import { ApiResponse } from "@/api/types/api-response";
import { AxiosResponse } from "axios";

const Positions = () => {
  const { data, isLoading } = useQuery<AxiosResponse<ApiResponse<Position>>>({
    queryKey: ["positions"],
    queryFn: () => axiosClient.get("/positions/all"),
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="items-start">
              Create new position
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Position</DialogTitle>
              <DialogDescription>
                Fill out the details below to create a new position.
              </DialogDescription>
            </DialogHeader>
            <div>
              <PostionForm />
            </div>
          </DialogContent>
        </Dialog>
        <DataTable
          isLoading={isLoading}
          columns={positionColmuns}
          data={data ? (data.data.data as Position[]) : []}
        />
      </div>
    </div>
  );
};

export default Positions;
