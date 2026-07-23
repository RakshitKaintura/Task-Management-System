import { Metadata } from 'next';
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Register - TaskFlow AI',
  description: 'Create a new account',
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
        <p className="text-muted-foreground">
          Enter your details to get started with TaskFlow AI
        </p>
      </div>

      <RegisterForm />

      <p className="px-8 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
