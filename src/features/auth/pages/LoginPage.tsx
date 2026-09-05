import { Link, useSearchParams } from 'react-router-dom';
import { Divider } from '@/shared/components/Divider';
import { LoginForm } from '../components/LoginForm';
import { SocialLoginGroup } from '../components/SocialLoginGroup';

const ERROR_MESSAGES: Record<string, string> = {
  auth_failed: 'Google sign-in failed. Please try again.',
  session_expired: 'Your session expired. Please sign in again.',
};

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get('error');

  return (
    <main className="auth-layout">
      <h1>Welcome back</h1>

      {errorCode && (
        <p role="alert" className="form-error">
          {ERROR_MESSAGES[errorCode] ?? 'Something went wrong.'}
        </p>
      )}

      <LoginForm />
      <p>
        <Link to="/forgot-password">Forgot your password?</Link>
      </p>
      <Divider label="OR" />
      <SocialLoginGroup />

      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </main>
  );
};