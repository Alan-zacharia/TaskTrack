"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useRegister from "@/app/hooks/useRegister";

const formSchema = zod
  .object({
    username: zod.string().trim().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: zod.string().email(),
    password: zod.string().min(8, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: zod.string().min(8, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Password do not match",
      path: ["confirmPassword"],
    }
  );
interface RegisterPageType {
  handleLogin: () => void;
}
const RegisterPage: React.FC<RegisterPageType> = ({ handleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { error, loading, register } = useRegister();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleSubmit = async (data: zod.infer<typeof formSchema>) => {
    try {
      await register(data);
      handleLogin();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 text-black"
      >
        {error && (
          <div className="text-red-500 font-bold text-base">{error}</div>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <input
                  type="text"
                  placeholder="Enter your username...."
                  {...field}
                  className="border rounded-md px-3 py-2 w-full"
                />
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <input
                  type="email"
                  placeholder="Enter your email...."
                  {...field}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  {...field}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              {!showPassword ? (
                <FaEye
                  size={18}
                  className="absolute top-8 right-4 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <FaEyeSlash
                  size={18}
                  className="absolute top-8 right-4 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  {...field}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </FormControl>
              {!showConfirmPassword ? (
                <FaEye
                  size={18}
                  className="absolute top-8 right-4 cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              ) : (
                <FaEyeSlash
                  size={18}
                  className="absolute top-8 right-4 cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <button className="underline text-end  text-xs" onClick={handleLogin}>
          Already have an account? Log in
        </button>
        <Button type="submit" disabled={loading}>Submit</Button>
      </form>
    </Form>
  );
};

export default RegisterPage;
