import { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login - TaskFlow AI',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your email and password to sign in
        </p>
      </div>

      <LoginForm />

      <p className="px-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="underline underline-offset-4 hover:text-primary font-medium"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
