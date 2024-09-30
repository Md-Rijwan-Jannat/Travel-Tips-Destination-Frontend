"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { loginSchema } from "@/src/schema/auth";
import CButton from "@/src/components/ui/CButton/CButton";
import { secondaryColor } from "@/src/styles/button";
import { FaApple } from "react-icons/fa";
import LoginRightContent from "./loginRightContent";
import GoogleButton from "../registerForm/googleButton";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { useAppDispatch } from "@/src/redux/hook";
import { useRouter } from "next/navigation";
import { setCredentials } from "@/src/redux/features/auth/authSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import GlassLoader from "@/src/components/shared/glassLoader";

type LoginFormInputs = z.infer<typeof loginSchema>;
interface TDecodedData {
  id: string;
  email: string;
  role: string;
}

export default function LoginForm() {
  const [loginUser, { isLoading: LoginIsLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log("Login", data);
      const res = await loginUser(data);

      if (res?.data?.success && res?.data?.data?.accessToken) {
        const decodedUser = jwtDecode(
          res.data.data.accessToken
        ) as TDecodedData;

        console.log(decodedUser);

        const userData = {
          id: decodedUser.id,
          email: decodedUser.email,
          role: decodedUser.role,
        };

        dispatch(
          setCredentials({ user: userData, token: res.data.data.accessToken })
        );
        router.push("/");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full md:min-h-screen flex items-center justify-center max-w-7xl">
      {LoginIsLoading && <GlassLoader />}
      <div className="flex flex-col-reverse md:flex-row bg-default-100 rounded-lg shadow-lg w-full overflow-hidden my-5">
        {/* Left side - Form Section */}
        <div className="w-full md:w-[500px] xl:w-[530px] flex flex-col justify-center">
          <div className="flex flex-col gap-6 p-2 md:p-16">
            <h2 className="text-2xl font-bold text-center">
              Log in to your account
            </h2>
            <p className="text-center text-default-500">
              Welcome back! Please login to continue.
            </p>
            <div className="flex items-center justify-center flex-col md:flex-row gap-5">
              <GoogleButton />
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              {/* Email Input */}
              <div className="h-16">
                <Input
                  {...register("email")}
                  className="font-semibold"
                  type="email"
                  variant="underlined"
                  placeholder="you@domain.com"
                  label="Email address"
                  isInvalid={!!errors.email}
                  validationState={errors.email ? "invalid" : undefined}
                />
                {errors.email && (
                  <p className="text-danger-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="h-16">
                <Input
                  {...register("password")}
                  className="font-semibold"
                  type="password"
                  variant="underlined"
                  placeholder="Must be at least 8 characters"
                  label="Password"
                  isInvalid={!!errors.password}
                  validationState={errors.password ? "invalid" : undefined}
                />
                {errors.password && (
                  <p className="text-danger-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="w-full mt-5">
                <CButton
                  text="Login"
                  link="#"
                  bgColor={secondaryColor}
                  type="submit"
                />
              </div>
            </form>

            <p className="text-center text-default-500 text-xs">
              New here?{" "}
              <Link className="text-blue-500 text-xs" href="/register">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Info Section */}
        <LoginRightContent />
      </div>
    </div>
  );
}
