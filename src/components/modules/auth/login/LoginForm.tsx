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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "./loginValidation";
import { loginUser, reCaptchaVerification } from "@/services/AuthService";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

const LoginForm = () => {
  const { setUser } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const form = useForm({ resolver: zodResolver(loginSchema) });
  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const handleReCapTcha = async (value: string | null) => {
    const res = await reCaptchaVerification(value!);
    if (res?.success) {
      setReCaptchaStatus(true);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/profile");
        }
        setUser(res.data);
        reset(); // reset form fields
        router.push("/"); // navigate to home page
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md rounded-xl bg-white border-2 border-gray-300 flex-grow w-full p-5">
      <div className="flex flex-col items-center space-y-4">
        {/* logo */}
        <Logo />
        <div>
          <h4 className="text-xl font-bold text-center mb-2">Login Now</h4>
          <p className="font-extralight text-sm text-gray-500 mb-4">
            Welcome back!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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

          <div className="flex mt-6">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string}
              onChange={handleReCapTcha}
              className="mx-auto"
            />
          </div>

          <Button
            disabled={reCaptchaStatus ? false : true}
            className="mt-4 w-full bg-[#0060d1] hover:bg-blue-600"
            type="submit"
          >
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
          <p className="font-extralight text-lg text-gray-500 text-center">
            Do not have any account?{" "}
            <Link className="text-[#0060d1] font-bold" href="/register">
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
