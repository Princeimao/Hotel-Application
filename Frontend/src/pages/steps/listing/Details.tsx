import ProgressBar from "@/components/ProgressBar";
import { urlConstants } from "@/constants/listingUrlConstants";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listingDetailsValidation } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Details = () => {
  const form = useForm<z.infer<typeof listingDetailsValidation>>({
    resolver: zodResolver(listingDetailsValidation),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof listingDetailsValidation>) {
    console.log(values);
  }

  return (
    <div className="w-full h-[80%]">
      <div className="w-full h-[100%] flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">
          Provide details of your{" "}
          <p className="text-red-600 inline-block">accommodation</p>
        </h1>
        <div className="w-130 mt-4 flex justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-[90%]"
            >
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

              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Details"
                        className="h-30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="basePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <ProgressBar
        progress={6.25 * 8}
        back={urlConstants["structure"].url}
        front={urlConstants["floorPlan"].url}
        isBackDisable={false}
        isFrontDisable={false}
        pathname={urlConstants["structure"].url}
      />
    </div>
  );
};

export default Details;
