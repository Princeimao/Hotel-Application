import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  sessionIdVerify,
  userSigninVerify,
  userSignupVerify,
} from "@/api/userApi";
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
import { login } from "@/context/features/UserContext";
import { OptValidation } from "@/validation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const UserOtpVerification = ({ type }: { type: string }) => {
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const dispactch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const redirect_url = searchParams.get("redirect_url");
  const roomId = searchParams.get("roomId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const bookingSession = searchParams.get("bookingSession");
  const queryParams: Record<string, string> = {};

  const form = useForm<z.infer<typeof OptValidation>>({
    resolver: zodResolver(OptValidation),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    async function session() {
      console.log(sessionId);
      if (!sessionId) {
        console.log("session id not found");
        // navigate("/404");
        return;
      }
      const response = await sessionIdVerify(sessionId);

      if (response.success !== true) {
        throw new Error("something went wrong while verifying sessionId");
      }
      setPhone(response.phone);
    }

    session();
  }, [navigate, sessionId]);

  const onSubmit = async (data: z.infer<typeof OptValidation>) => {
    try {
      if (type === "signup") {
        if (!phone) {
          console.log("Phone number not found - host otp verification");
          return;
        }
        const response = await userSignupVerify(Number(data.otp), phone);

        if (response.success !== true) {
          throw new Error("something went wrong while signing up user");
        }

        if (!sessionId) {
          throw new Error("session id is not defined");
        }

        navigate(`/userDetails/?sessionId=${sessionId}`);
      } else {
        if (!phone) {
          console.log("Phone number not found - user otp verification");
          return;
        }
        const response = await userSigninVerify(Number(data.otp), phone);

        if (response.success !== true) {
          console.log("something went wrong");
          throw new Error("something went wrong while verifying user");
        }

        if (response.user === undefined) {
          return;
        }

        const user = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          phone: response.user.phone,
        };

        dispactch(login({ user, isAuthenticated: true, status: "succeeded" }));

        if (roomId) {
          queryParams.roomId = roomId;
        }
        if (checkIn) {
          queryParams.checkIn = checkIn;
        }
        if (checkOut) {
          queryParams.checkOut = checkOut;
        }
        if (bookingSession) {
          queryParams.bookingSession = bookingSession;
        }

        if (redirect_url) {
          navigate(`/${redirect_url}/?${new URLSearchParams(queryParams)}`);
        } else {
          navigate("/")
        }
      }
    } catch (error) {
      if (type === "signup") {
        console.log("something went wrong while veriying signup otp", error);
      } else {
        console.log("something went wrong while veriying signin otp", error);
      }
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
            name="otp"
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
