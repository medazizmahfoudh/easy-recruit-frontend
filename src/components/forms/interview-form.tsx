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

const comboboxSchema = z.object({
  value: z.string().min(1, {
    message: "*This field is required.",
  }),
});

const FormSchema = z.object({
  location: z.string().min(2, {
    message: "*Location must be at least 2 characters.",
  }),
  date: z.string().min(2, {
    message: "*Date must be a valid date.",
  }),
});

const defaultValues = {
  position: { value: "", label: "" },
  recruiter: { value: "", label: "" },
  candidate: { value: "", label: "" },
  location: "",
  date: "",
};

const InterviewForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div>
            <Label>Position</Label>
            <Combobox data={[]} />
          </div>
          <div>
            <Label htmlFor="recruiter">Recruiter</Label>
            <Combobox data={[]} />
          </div>
          <div>
            <Label htmlFor="candidate">Candidate</Label>
            <Combobox data={[]} />
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default InterviewForm;
