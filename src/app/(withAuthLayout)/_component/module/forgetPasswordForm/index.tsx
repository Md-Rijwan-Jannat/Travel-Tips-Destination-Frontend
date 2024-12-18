'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import React from 'react';
import GlassLoader from '@/src/components/shared/glassLoader';
import { secondaryColor } from '@/src/styles/button';
import { resetPasswordSchema } from '@/src/schema/auth';
import { Button } from '@nextui-org/button';
import { useForgetPasswordMutation } from '@/src/redux/features/auth/authApi';

type TForgetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

export default function ForgetPasswordForm() {
  const [forgetPasswordFn, { isLoading: forgetPasswordIsLoading }] =
    useForgetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const resetToken = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: TForgetPasswordFormInputs) => {
    try {
      const res = await forgetPasswordFn({
        email: email,
        newPassword: data.password,
        token: resetToken,
      });

      if (res?.data?.success) {
        toast.success('Password has been successfully reset. Please log in.');
        router.push('/login');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full md:min-h-screen flex items-center justify-center max-w-7xl">
      {forgetPasswordIsLoading && <GlassLoader />}
      <div className="flex max-w-xl mx-auto bg-default-100 rounded-lg shadow-lg w-full overflow-hidden my-5">
        <div className="w-full flex flex-col justify-center">
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
                  {...register('password')}
                  className="font-semibold"
                  isInvalid={!!errors.password}
                  label="New Password"
                  placeholder="Enter your new password"
                  type="password"
                  validationState={errors.password ? 'invalid' : undefined}
                  variant="underlined"
                />
                {errors.password && (
                  <p className="text-danger-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mx-auto">
                <Button className="secondary-button" type="submit">
                  Reset Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
