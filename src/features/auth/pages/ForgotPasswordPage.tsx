import { Link } from 'react-router-dom';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';

export const ForgotPasswordPage = () => (
  <main className="auth-layout">
    <h1>Forgot your password?</h1>
    <p>Enter your email and we'll send you a link to reset it.</p>

    <ForgotPasswordForm />

    <p>
      Remembered it? <Link to="/login">Back to sign in</Link>
    </p>
  </main>
);