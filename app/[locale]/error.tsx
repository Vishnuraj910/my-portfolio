'use client';

import { useEffect, useLayoutEffect } from 'react';
import { messages } from '@/lib/messages';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function getLocaleFromHtml(): string {
  if (typeof window === 'undefined') return 'en';
  const html = document.documentElement;
  return html.getAttribute('data-locale') || 'en';
}

export default function Error({ error, reset }: ErrorProps) {
  const locale = typeof window !== 'undefined' ? getLocaleFromHtml() : 'en';
  const t = messages[locale as 'en' | 'ar'];

  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {locale === 'ar' ? 'حدث خطأ' : 'Something went wrong'}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {locale === 'ar'
            ? 'نعتذر عن حدوث خطأ. يرجى المحاولة مرة أخرى.'
            : 'We apologize for the inconvenience. Please try again.'}
        </p>

        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={locale === 'ar' ? 'إعادة المحاولة' : 'Try again'}
        >
          {locale === 'ar' ? 'إعادة المحاولة' : 'Try again'}
        </button>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-md text-left">
            <p className="text-sm font-mono text-red-800 dark:text-red-200 break-words">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
