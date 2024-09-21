'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import Button from '@/components/shadcn-ui/Button';
import Input from '@/components/shadcn-ui/Input';
import { authenticationAction, logoutAction } from './actions';

export default function Page() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, formActionOrigin] = useFormState(authenticationAction, {
    error: true,
    message: '',
  });

  useEffect(() => setIsLoading(false), [formState]);

  useEffect(() => {
    if (searchParams.get('action') === 'log_out') {
      logoutAction();
      redirect('/admin/login');
    }
  }, []);

  function formAction(form: FormData) {
    if (!isLoading) {
      setIsLoading(true);
      formActionOrigin(form);
    }
  }

  return (
    <main className="grid h-screen w-full place-items-center bg-gradient-to-tl from-zinc-950 to-zinc-800">
      <form
        className="w-[30%] rounded-xl border border-zinc-600 bg-zinc-950 p-7"
        action={formAction}
      >
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Login
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            A admin panel for managing the whole my portfolio. And, just for
            ADMIN can login!
          </p>
        </div>

        <div className="space-y-3 pb-10 pt-8">
          <Input type="email" id="email" name="email" placeholder="Email" />

          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />

          <small
            className={`inline-block text-sm font-medium leading-none ${formState.error ? 'text-red-300' : 'text-green-300'}`}
          >
            {formState.message}
          </small>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" className="w-full" type="reset" size="lg">
            Reset
          </Button>

          <Button
            className="w-full"
            type="submit"
            size="lg"
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            {isLoading ? 'Loading' : 'Login'}
          </Button>
        </div>
      </form>
    </main>
  );
}
