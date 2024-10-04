"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import React from "react";
import GlassLoader from "@/src/components/shared/glassLoader";
import CButton from "@/src/components/ui/CButton/CButton";
import { secondaryColor } from "@/src/styles/button";
import { useResetPasswordMutation } from "@/src/redux/features/auth/authApi";
import { resetPasswordSchema } from "@/src/schema/auth";

type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [resetPassword, { isLoading: resetPasswordIsLoading }] =
    useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const resetToken = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    try {
      const res = await resetPassword({
        email: email,
        newPassword: data.password,
        token: resetToken,
      });

      if (res?.data?.success) {
        toast.success("Password has been successfully reset. Please log in.");
        router.push("/login");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full md:min-h-screen flex items-center justify-center max-w-7xl">
      {resetPasswordIsLoading && <GlassLoader />}
      <div className="flex flex-col-reverse md:flex-row bg-default-100 rounded-lg shadow-lg w-full overflow-hidden my-5">
        <div className="w-full md:w-[500px] xl:w-[530px] flex flex-col justify-center">
          <div className="flex flex-col gap-6 p-2 md:p-16">
            <h2 className="text-2xl font-bold text-center">Reset Password</h2>
            <p className="text-center text-default-500">
              Enter your new password.
            </p>

            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="h-16">
                <Input
                  {...register("password")}
                  className="font-semibold"
                  isInvalid={!!errors.password}
                  label="New Password"
                  placeholder="Enter your new password"
                  type="password"
                  validationState={errors.password ? "invalid" : undefined}
                  variant="underlined"
                />
                {errors.password && (
                  <p className="text-danger-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="w-full mt-5">
                <CButton
                  bgColor={secondaryColor}
                  link="#"
                  text="Reset Password"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
