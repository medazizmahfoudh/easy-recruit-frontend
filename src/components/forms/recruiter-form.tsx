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
import { useSumbitRecruiter } from "@/hooks/api/use-recruiter";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  firstname: z.string().min(2, {
    message: "*First Name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "*Last Name must be at least 2 characters.",
  }),
  department: z.string().min(2, {
    message: "*Department must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "*Title must be at least 2 characters.",
  }),
});

interface RecruiterFormProps {
  refetch: () => void;
  setFormOpen: (open: boolean) => void;
}

const RecruiterForm = ({ refetch, setFormOpen }: RecruiterFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      department: "",
      title: "",
    },
  });

  const mutation = useSumbitRecruiter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation
      .mutateAsync({
        firstname: data.firstname,
        lastname: data.lastname,
        department: data.department,
        title: data.title,
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
      .catch(() => {
        toast({
          title: "Error",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <p className="text-white">{mutation.error?.message}</p>
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
            <Label>First Name</Label>
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Label htmlFor="lastname">Last Name</Label>
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Department" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
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

export default RecruiterForm;
