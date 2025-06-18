'use client';
import { useState } from 'react';
import { signIn } from '@/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [pressId, setPressId] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await signIn('credentials', {
        pressId,
        otp,
        redirect: false
      });
      if (result?.error) {
        setError('Invalid credentials. Contact your editor for verification codes.');
      } else {
        router.push('/portal/verify');
      }
    } catch (err) {
      setError('Authentication service unavailable. Try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            VerifiNet Secure Access
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Restricted to verified journalists
          </p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="pressId" className="block text-sm font-medium text-gray-700">
                Press ID
              </label>
              <input
                id="pressId"
                name="pressId"
                type="text"
                required
                value={pressId}
                onChange={(e) => setPressId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="password"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying credentials...' : 'Access Verification Hub'}
            </button>
          </div>
        </form>
        <div className="text-center text-xs text-gray-500 pt-4 border-t mt-8">
          <p>Contact your organization's VerifiNet administrator for credentials</p>
          <p className="mt-1">All access attempts are logged and monitored</p>
        </div>
      </div>
    </div>
  );
} 