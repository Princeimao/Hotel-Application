import { hostAddress, sessionIdVerify } from "@/api/hostApi";
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
import { hostAddressValidation } from "@/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import type z from "zod";

const HostAddressForm = () => {
  const [searchParams] = useSearchParams();
  const [phone, setPhone] = useState<string | null>(null);
  const sessionId = searchParams.get("sessionId");
  const redirect = searchParams.get("redirect");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof hostAddressValidation>>({
    resolver: zodResolver(hostAddressValidation),
    defaultValues: {
      houseAddress: "",
      city: "",
      country: "",
      state: "",
      pincode: "",
    },
  });

  useEffect(() => {
    async function session() {
      if (!sessionId) {
        console.log("somethign went wrong");
        return;
      }
      const response = await sessionIdVerify(sessionId);

      if (response.success !== true) {
        return;
      }
      setPhone(response.phone);
    }

    session();
  }, [navigate, sessionId]);

  const onSubmit = async (data: z.infer<typeof hostAddressValidation>) => {
    try {
      if (!phone) {
        console.log("Phone number not found - host otp verification");
        return;
      }

      const response = await hostAddress(
        data.houseAddress,
        data.city,
        data.country,
        data.state,
        data.pincode,
        phone
      );

      if (response.data !== undefined) {
        console.log("something went wrong");
        return;
      }

      navigate(`/${redirect}`);
    } catch (error) {
      console.log("something went wrong while creating Host", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-110 h-120 ">
        <div className="mx-auto w-16 flex items-center justify-center mb-2">
          <svg
            width="35"
            height="35"
            viewBox="0 0 128 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M64 8C37 8 16 29 16 56.5C16 84 64 120 64 120C64 120 112 84 112 56.5C112 29 91 8 64 8Z
       M64 30C55 30 48 37 48 46V74H80V46C80 37 73 30 64 30Z"
              stroke="#fb2c36"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 text-center">
          Your Address
        </h2>
        <p className="text-gray-600 text-xs text-center">
          Help us serve you better with your location details
        </p>

        <div className="form mt-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="houseAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="resize-none scroll-auto h-8"
                        placeholder="Enter your complete address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex gap-1">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Pincode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HostAddressForm;
