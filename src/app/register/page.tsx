import { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import MultiStepRegisterForm from '@/components/register/MultiStepRegisterForm';

export const metadata: Metadata = {
  title: 'Register | Boffin Institute of Data Science',
  description: 'Register for courses at Boffin Institute of Data Science',
};

export default function RegisterPage() {
  return (
    <div className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-boffin-primary mb-8">Course Registration</h1>
          <p className="text-center text-gray-600 mb-12">
            Complete the registration form below to enroll in your selected course. 
            All fields marked with an asterisk (*) are required.
          </p>
          
          <MultiStepRegisterForm />
        </div>
      </Container>
    </div>
  );
}
