import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Container } from '@/components/ui/container';

// Use dynamic import to avoid server-side rendering issues
const RegisterFormClient = dynamic(
  () => import('@/components/register/RegisterFormClient'),
  { ssr: false }
);

export default function RegisterPage() {
  return (
    <Container>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>}>
        <RegisterFormClient />
      </Suspense>
    </Container>
  );
}
