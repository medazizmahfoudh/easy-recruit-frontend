import { create } from "zustand";
import { VisibilityState } from "@tanstack/react-table";

interface ColumnsVisibilityProps {
  columnVisibility: VisibilityState;
  setColumnVisibility: (columnVisibility: VisibilityState) => void;
}
const useColumnsVisibilityStore = create<ColumnsVisibilityProps>((set) => ({
  columnVisibility: {},
  setColumnVisibility: (columnVisibility: VisibilityState) =>
    set({ columnVisibility }),
}));

export default useColumnsVisibilityStore;
