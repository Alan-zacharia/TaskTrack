"use client";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import RegisterPage from "../components/register/RegisterPage";
import useLogin from "../hooks/useLogin";
import { useRouter } from "next/navigation";

const formSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { error, loading, login } = useLogin();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: zod.infer<typeof formSchema>) => {
   login(data).then(()=>{
    setTimeout(()=>{
      router.push("/")
    },500)
   })
  };

  const handleRegister = () => setIsLogin(false);
  const handleLogin = () => setIsLogin(true);

  return (
    <main className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[500px] p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl text-black mb-6 text-center font-bold">
          {isLogin ? "Login" : "Register"}
        </h1>
        {isLogin ? (
          <AnimatePresence>
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex flex-col gap-4 text-black"
                >
                  {error && (
                    <div className="text-red-500 font-bold">{error}</div>
                  )}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email..."
                            {...field}
                            className="border rounded-md px-3 py-2 "
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
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password..."
                            {...field}
                            className="border rounded-md px-3 py-2 "
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
                  <button
                    className="text-end underline text-xs"
                    onClick={handleRegister}
                  >
                    Don't have an account? Register
                  </button>
                  <Button type="submit" className="w-full" disabled={loading}>
                    Submit
                  </Button>
                </form>
              </Form>
            </motion.div>
          </AnimatePresence>
        ) : (
          <RegisterPage handleLogin={handleLogin} />
        )}
      </div>
    </main>
  );
};

export default LoginPage;
