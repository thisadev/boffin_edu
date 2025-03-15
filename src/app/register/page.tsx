import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import RegisterFormClient from '@/components/register/RegisterFormClient';

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
