'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/input';
import Link from 'next/link';
import { toast } from 'sonner';
import React from 'react';
import GlassLoader from '@/src/components/shared/glassLoader';
import { Button } from '@nextui-org/button';
import { useResetLinkMutation } from '@/src/redux/features/auth/authApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

// Define schema using Zod for validation
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ResetLinkSendFormInputs = z.infer<typeof forgotPasswordSchema>;

export default function ResetLinkSendForm() {
  const [sendResetLink, { isLoading: forgotPasswordIsLoading }] =
    useResetLinkMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetLinkSendFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ResetLinkSendFormInputs) => {
    try {
      const res = await sendResetLink(data);

      if ('data' in res && res.data.success) {
        toast.success('Password reset email sent. Please check your inbox.');
      } else {
        const error = res.error;

        if (error) {
          if ('data' in (error as FetchBaseQueryError)) {
            const fetchError = error as FetchBaseQueryError;
            const errorMessage = (fetchError.data as { message?: string })
              ?.message;

            if (errorMessage) {
              toast.error(errorMessage);
            } else {
              toast.error('An unknown error occurred');
            }
          } else if ((error as SerializedError).message) {
            toast.error((error as SerializedError).message!);
          } else {
            toast.error('An unknown error occurred');
          }
        }
      }
    } catch (error) {
      console.error(error); // Updated to use console.error
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full md:min-h-screen flex items-center justify-center max-w-7xl">
      {forgotPasswordIsLoading && <GlassLoader />}
      <div className="flex max-w-xl mx-auto bg-default-100 rounded-lg shadow-lg w-full overflow-hidden my-5">
        <div className="w-full flex flex-col justify-center">
          <div className="flex flex-col gap-6 p-2 md:p-16">
            <h2 className="text-2xl font-bold text-center">
              Forgot your password?
            </h2>
            <p className="text-center text-default-500">
              Enter your email address and we will send you a link to reset your
              password.
            </p>

            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="h-16">
                <Input
                  {...register('email')}
                  className="font-semibold"
                  isInvalid={!!errors.email}
                  label="Email address"
                  placeholder="you@domain.com"
                  type="email"
                  validationState={errors.email ? 'invalid' : undefined}
                  variant="underlined"
                />
                {errors.email && (
                  <p className="text-danger-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mx-auto">
                <Button type="submit" className="secondary-button">
                  Send Reset Link
                </Button>
              </div>
            </form>

            <p className="text-center text-default-500 text-xs relative">
              Remembered your password?{' '}
              <Link className="text-blue-500 text-xs" href="/login">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
