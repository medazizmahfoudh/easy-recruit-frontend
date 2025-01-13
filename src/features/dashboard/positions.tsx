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
import { usePositions } from "@/hooks/api/use-position";

const Positions = () => {
  const { positions, isLoading } = usePositions();

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
          data={positions ? (positions as Position[]) : []}
        />
      </div>
    </div>
  );
};

export default Positions;
