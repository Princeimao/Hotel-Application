import { registerUser, sessionIdVerify } from "@/api/userApi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { login } from "@/context/features/UserContext";
import { DetailsValidation } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import type z from "zod";

const UserDetailForm = () => {
  const [searchParams] = useSearchParams();
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const sessionId = searchParams.get("sessionId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof DetailsValidation>>({
    resolver: zodResolver(DetailsValidation),
    defaultValues: {
      name: "",
      email: "",
      gender: "",
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

  const onSubmit = async (data: z.infer<typeof DetailsValidation>) => {
    console.log(data);
    try {
      if (!phone) {
        throw new Error("Phone number not found");
      }

      const response = await registerUser(
        data.name,
        data.email,
        phone,
        data.gender
      );

      if (response.success !== true) {
        console.log("something went wrong");
        return;
      }

      if (!response.user) {
        throw new Error("something went wrong while getting user");
      }

      const user = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        phone: response.user.phone,
      };

      dispatch(login({ user, isAuthenticated: true, status: "succeeded" }));

      navigate(`/`);
    } catch (error) {
      console.log("something went wrong while creating user", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-110 h-120 px-10">
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
          Tell Us About Yourself
        </h2>
        <p className="text-gray-600 text-xs text-center">
          We need some basic information to personalize your experience
        </p>

        <div className="form mt-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="PREFER_NOT_TO_SAY">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

export default UserDetailForm;
