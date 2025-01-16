import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormMessage,
} from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { useSumbitPosition } from "@/hooks/api/use-position";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "*Name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "*Location must be at least 2 characters.",
  }),
  description: z.string().min(40, {
    message: "*Description must be at least 40 characters.",
  }),
  skills: z.array(
    z.object({
      name: z.string().min(1, {
        message: "*Skill name must be at least 1 characters.",
      }),
      level: z
        .number()
        .min(1, {
          message: "*Skill level must be at least 1.",
        })
        .max(5, {
          message: "*Skill level must be at most 5.",
        }),
    })
  ),
});

const defaultValues = {
  name: "",
  location: "",
  description: "",
  skills: [{ name: "", level: 1 }],
};

const PositionForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  const mutation = useSumbitPosition();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutation
      .mutateAsync(data)
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
        window.location.reload();
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
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  return (
    <Form {...form}>
      <ScrollArea className="h-[600px] rounded-md border p-4">
        <div className="mx-1">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="location"
                          type="text"
                          placeholder="Location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          id="location"
                          placeholder="Position description..."
                          {...field}
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <span className="font-bold">Skills</span>

              {fields.map((item, index) => (
                <div key={item.id} className="flex gap-4">
                  <div className="ml-1">
                    <Label htmlFor="skill-name">Name</Label>
                    <FormField
                      control={form.control}
                      name={`skills.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              // {...form.register(`skills.${index}.name`)}
                              id="skill-name"
                              type="text"
                              placeholder="Skill name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mr-1">
                    <Label htmlFor="skill-level">Level</Label>
                    <FormField
                      control={form.control}
                      name={`skills.${index}.level`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber || 1)
                              }
                              onBlur={field.onBlur}
                              value={field.value}
                              disabled={field.disabled}
                              name={field.name}
                              min={1}
                              id="skill-level"
                              type="number"
                              placeholder="Skill level"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ name: "", level: 1 })}
                  className="w-full"
                >
                  Add Skill
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(fields.length - 1)}
                  className="w-full"
                >
                  Remove Last Added Skill
                </Button>
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
        </div>
      </ScrollArea>
    </Form>
  );
};

export default PositionForm;
