"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { registerSchema } from "@/src/schema/auth";
import { primaryColor } from "@/src/styles/button";
import CButton from "@/src/components/ui/CButton/CButton";
import RegisterRightContent from "./registerRightContent";
import GoogleButton from "./googleButton";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import { useAppDispatch } from "@/src/redux/hook";
import { setCredentials } from "@/src/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import GlassLoader from "@/src/components/shared/glassLoader";

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [registerUser, { isLoading: RegisterLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      console.log("Register Data", data);
      const res = await registerUser(data);

      if (res?.data?.success && res?.data?.data?.accessToken) {
        const userData = {
          id: res.data.data.result._id,
          email: res.data.data.result.email,
          role: res.data.data.result.role,
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
    <div className="w-full mt-5 md:mt-0 md:min-h-screen flex items-center justify-center max-w-7xl">
      {/* Conditionally render the GlassLoader */}
      {RegisterLoading && <GlassLoader />}
      <div className="relative flex flex-col-reverse md:flex-row bg-default-100 rounded-lg shadow-lg w-full overflow-hidden my-5">
        {/* Left side - Form Section */}
        <div className="w-full md:w-[500px] xl:w-[530px] flex flex-col justify-center">
          <div className="flex flex-col gap-6 p-2 py-10 md:px-12">
            <h2 className="text-2xl font-bold text-center">
              Create an account
            </h2>
            <p className="text-center text-default-500">
              Start your 30 day free trial
            </p>
            <div className="flex items-center justify-center flex-col md:flex-row gap-5">
              <GoogleButton />
            </div>
            {/* Form Fields */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              <div className="h-16">
                <Input
                  {...register("name")}
                  className="font-semibold"
                  type="text"
                  variant="underlined"
                  placeholder="What shall we call you?"
                  label="Name"
                  isInvalid={!!errors.name}
                  validationState={errors.name ? "invalid" : undefined}
                />
                {errors.name && (
                  <p className="text-danger-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

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

              <div className="mt-5">
                <CButton
                  text={RegisterLoading ? "Register..." : "Register"}
                  link="#"
                  bgColor={primaryColor}
                  type="submit"
                />
              </div>
            </form>

            <p className="text-center text-default-500 text-xs">
              Already have an account?{" "}
              <Link className="text-blue-500 text-xs" href="/login">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Info Section with rainbow blur background */}
        <RegisterRightContent />
      </div>
    </div>
  );
}
