import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OptValidation } from "@/validation";
import { Link } from "react-router-dom";

const UserOtpVerification = ({ type }: { type: string }) => {
  const form = useForm<z.infer<typeof OptValidation>>({
    resolver: zodResolver(OptValidation),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = (data: z.infer<typeof OptValidation>) => {
    if (type === "signin") {
      console.log(data);
    } else {
      console.log(data);
    }
  };

  return (
    <div className="bg-background flex h-[80%] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex flex-col items-center gap-2">
        <Link to="/" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-8 items-center justify-center rounded-md">
            <svg
              width="35"
              height="35"
              viewBox="0 0 128 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M64 8C37 8 16 29 16 56.5C16 84 64 120 64 120C64 120 112 84 112 56.5C112 29 91 8 64 8Z M64 30C55 30 48 37 48 46V74H80V46C80 37 73 30 64 30Z"
                stroke="#fb2c36"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <span className="sr-only">RoamInn</span>
        </Link>
        <h1 className="text-xl font-bold text-red-500">Welcome to RoamInn</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default UserOtpVerification;
