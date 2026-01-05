import { useAddHashtag } from "@/hooks/hashtags/useAddHashtag";
import {
  addHashtagSchema,
  type addHashtagSchemaType,
} from "@/schemas/hashtags";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@insta-puppeteer/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@insta-puppeteer/ui/components/form";
import { Input } from "@insta-puppeteer/ui/components/input";
import { Slider } from "@insta-puppeteer/ui/components/slider";
import { Spinner } from "@insta-puppeteer/ui/components/spinner";
import { Switch } from "@insta-puppeteer/ui/components/switch";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";

type AddHashtagFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddHashtagForm = ({ setOpen }: AddHashtagFormProps) => {
  const form = useForm<addHashtagSchemaType>({
    resolver: zodResolver(addHashtagSchema),
    defaultValues: {
      tag: "",
      active: true,
      priority: 1,
    },
  });

  const { mutateAsync, isPending } = useAddHashtag();

  const onSubmit = useCallback(
    async (values: addHashtagSchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync, setOpen],
  );

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">Tag</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Tag" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-4 items-center">
                <FormLabel className="flex items-center">Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    disabled={field.disabled}
                    onBlur={field.onBlur}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Priority: {field.value}
              </FormLabel>
              <FormControl>
                <Slider
                  disabled={field.disabled}
                  max={5}
                  min={1}
                  onBlur={field.onBlur}
                  onValueChange={(value) => field.onChange(value[0])}
                  value={[field.value]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isPending} type="submit">
          {!isPending && "Add"}
          {isPending && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
