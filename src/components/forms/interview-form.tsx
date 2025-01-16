"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Combobox } from "../ui/combobox";
import { useState } from "react";
import { useSumbitInterview } from "@/hooks/api/use-interview";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  location: z.string().min(2, {
    message: "*Location must be at least 2 characters.",
  }),
  date: z.string().min(2, {
    message: "*Date must be a valid date.",
  }),
  candidate: z.string().nonempty("*This field is required."),
  position: z.string().nonempty("*This field is required."),
  recruiter: z.string().nonempty("*This field is required."),
});

const defaultValues = {
  position: "",
  recruiter: "",
  candidate: "",
  location: "",
  date: "",
};

interface interviewFormProps {
  positions: { value: string; label: string }[];
  recruiters: { value: string; label: string }[];
  candidates: { value: string; label: string }[];
  refetch: () => void;
  setFormOpen: (open: boolean) => void;
}

type Item = {
  value: string;
  label: string;
};

const InterviewForm = ({
  positions,
  recruiters,
  candidates,
  refetch,
  setFormOpen,
}: interviewFormProps) => {
  const [recruiter, setRecruiter] = useState<Item>({ value: "", label: "" });
  const [candidate, setCandidate] = useState<Item>({ value: "", label: "" });
  const [position, setPosition] = useState<Item>({ value: "", label: "" });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  const mutation = useSumbitInterview();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation
      .mutateAsync({
        date: data.date,
        location: data.location,
        positionUuid: position.value,
        recruiterUuid: recruiter.value,
        candidateUuid: candidate.value,
      })
      .then(() => {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
        refetch();
        setFormOpen(false);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <p className="text-white">{error.data.description}</p>
            </pre>
          ),
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="position">Position</Label>
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      data={positions}
                      setSelectedItem={setPosition}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Label htmlFor="recruiter">Recruiter</Label>
            <FormField
              control={form.control}
              name="recruiter"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      data={recruiters}
                      setSelectedItem={setRecruiter}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Label htmlFor="candidate">Candidate</Label>
            <FormField
              control={form.control}
              name="candidate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      data={candidates}
                      setSelectedItem={setCandidate}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Date"
                      type="datetime-local"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Location" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InterviewForm;
