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

interface ComboboxProps {
  icon?: LucideIcon;
  data: {
    value: string;
    label: string;
  }[];
  setSelectedValue: (value: string) => void;
}

export function Combobox({ data, icon, setSelectedValue }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedLabel, setSelectedLabel] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedLabel !== ""
            ? data.find((item) => item.label === selectedLabel)?.label
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
                    key={item.value}
                    value={item.label}
                    onSelect={(currentValue) => {
                      setSelectedLabel(currentValue);
                      setSelectedValue(item.label);
                      setOpen(false);
                    }}
                  >
                    {icon && React.createElement(icon)}
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedLabel === item.label
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
