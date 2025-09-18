import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  hostSigninVerify,
  hostSignupVerify,
  sessionIdVerify,
} from "@/api/hostApi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { login } from "@/context/features/HostContext";
import { OptValidation } from "@/validation";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const HostOtpVerification = ({ type }: { type: string }) => {
  const [phone, setPhone] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispactch = useDispatch();

  const sessionId = searchParams.get("sessionId");
  const redirect = searchParams.get("redirect");
  const queryParams: Record<string, string> = {};
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof OptValidation>>({
    resolver: zodResolver(OptValidation),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    async function session() {
      if (!sessionId) {
        navigate("/404");
        return;
      }
      const response = await sessionIdVerify(sessionId);

      if (response.success !== true) {
        navigate("/404");
        return;
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
        setLoading(true);
        const response = await hostSignupVerify(Number(data.otp), phone);

        if (response.success !== true) {
          console.log("something went wrong");
          return;
        }

        if (sessionId) {
          queryParams.sessionId = sessionId;
        }

        if (redirect) {
          queryParams.redirect = redirect;
        }

        navigate(`/hostDetails?${new URLSearchParams(queryParams)}`);
        setLoading(false);
      } else {
        if (!phone) {
          console.log("Phone number not found - host otp verification");
          return;
        }
        setLoading(true);
        const response = await hostSigninVerify(Number(data.otp), phone);

        if (response.success !== true) {
          console.log("something went wrong");
        } // add toast

        if (response.host === undefined) {
          return;
        }

        const host = {
          id: response.host.id,
          email: response.host.email,
          name: response.host.name,
          phone: response.host.phone,
        };

        dispactch(login({ host, isAuthenticated: true, status: "succeeded" }));

        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      if (type === "signup") {
        console.log("something went wrong while veriying signup otp", error);
      } else {
        console.log("something went wrong while veriying signup otp", error);
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
        <h1 className="text-xl font-bold text-red-500 h-4">
          Enter your 6-digti code
        </h1>
        <p className="text-sm text-gray-500 text-center">
          We sent a verification code to you phone number <br /> +91-1234567891{" "}
          {phone}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex-col justify-center items-center">
                <FormControl className="flex justify-between items-center">
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-red-500 hover:bg-red-600" type="submit">
            {loading ? <Loader2 className="animate-spin" /> : "Verify"}
          </Button>
        </form>
      </Form>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-500 text-center">
          I Did't Receive a Code!
        </p>
        {/* Have to add the api call to resend the otp */}
        <p className="text-sm text-red-500 text-center">Resend</p>
      </div>
    </div>
  );
};

export default HostOtpVerification;
