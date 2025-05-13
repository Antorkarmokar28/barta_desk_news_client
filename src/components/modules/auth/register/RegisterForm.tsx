/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Logo from "@/components/shared/logo/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter(); // ⬅️ added

  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      if (res?.success) {
        toast.success(res?.message);
        reset(); // reset form fields
        router.push("/login"); // navigate to login page
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md rounded-xl bg-white border-2 border-gray-300 flex-grow w-full p-5">
      <div className="flex flex-col items-center space-y-4">
        <Logo />
        <div>
          <h4 className="text-xl font-bold text-center mb-2">Register Now</h4>
          <p className="font-extralight text-sm text-gray-500 mb-4">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your bio"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* submit button */}
          <Button
            className="mt-4 w-full bg-[#0060d1] hover:bg-blue-600 cursor-pointer"
            type="submit"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
          <p className="font-extralight text-lg text-gray-500 text-center">
            Already have an account?{" "}
            <Link className="text-[#0060d1] font-bold" href="/login">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
