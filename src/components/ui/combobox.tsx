"use client";

import * as React from "react";
import { Check, ChevronsUpDown, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Noop } from "react-hook-form";

interface ComboboxProps {
  icon?: LucideIcon;
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  data: {
    value: string;
    label: string;
  }[];
  setSelectedItem: (selectedItem: { value: string; label: string }) => void;
}

export function Combobox({
  data,
  icon,
  setSelectedItem,
  onChange,
  onBlur,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedItemState, setSelectedItemState] = React.useState({
    value: "",
    label: "",
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedItemState.label !== ""
            ? data.find((item) => item.label === selectedItemState.label)?.label
            : "Empty"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {data &&
                data.map((item) => (
                  <CommandItem
                    onBlur={onBlur}
                    key={item.value}
                    value={item.label}
                    onSelect={() => {
                      setSelectedItemState({
                        value: item.value,
                        label: item.label,
                      });
                      setSelectedItem({
                        value: item.value,
                        label: item.label,
                      });
                      onChange(item.label);
                      setOpen(false);
                    }}
                  >
                    {icon && React.createElement(icon)}
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedItemState.label === item.label
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
