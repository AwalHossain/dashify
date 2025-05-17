import React from 'react';
import { useNavigate } from 'react-router';
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from '../../context/AuthContext';
import useFormValidation from '../../hooks/useFormValidation';
import { useLoginMutation } from '../../services/auth';
import AuthLayout from "./AuthPageLayout";

export default function SignIn() {
  const { values, errors, handleChange, validateForm } = useFormValidation({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const { login: loginContext } = useAuth();

  const validationRules = {
    email: (value: string) => {
      if (!value) return 'Email is required';
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return 'Invalid email format';
      return null;
    },
    password: (value: string) => {
      if (!value) return 'Password is required';
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(validationRules)) {
      return;
    }
    try {
      await loginMutation.mutateAsync({ email: values.email, password: values.password });
      loginContext();
      navigate('/');
    } catch (err) {
      console.error("Login failed in component handleSubmit catch block:", err);
    }
  };

  return (
    <>
      <PageMeta
        title="SignIn Dashboard"
        description="This is SignIn Tables Dashboard page"
      />
      <AuthLayout>
        <div className="flex min-h-screen items-center justify-center p-4 dark:bg-gray-900">
          <div className="w-full max-w-lg rounded-xl p-8 bg-gray-100 shadow-lg shadow-black/10 dark:bg-gray-800">
            <div className="mb-8 text-center">
              <h1 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
              <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
            </div>

            {loginMutation.error && (
              <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                {loginMutation.error instanceof Error ? loginMutation.error.message : 'An unexpected error occurred.'}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="mb-2.5 block font-medium text-gray-800 dark:text-white"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-2.5 block font-medium text-gray-800 dark:text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Remember me
                  </label>
                </div>

                <a
                  href="#"
                  className="text-sm font-medium text-blue-500 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full rounded-lg bg-blue-500 px-4 py-2.5 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Test credentials: user@test.com / usertest2025@#
              </p>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
