import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/Button';
import { InputField } from '@/shared/components/InputField';
import { useForgotPassword } from '../hooks/useForgotPassword';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../schemas/auth.schemas';

export const ForgotPasswordForm = () => {
  const { requestReset, isLoading, error, isSubmitted, secondsLeft } =
    useForgotPassword();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  if (isSubmitted) {
    return (
      <div role="status">
        <p>
          If an account exists for that email, we've sent a reset link. It
          expires in 30 minutes.
        </p>
        <p>Check your spam folder if it hasn't arrived in a few minutes.</p>

        {error && <p role="alert" className="form-error">{error}</p>}

        <Button
          variant="secondary"
          type="button"
          isLoading={isLoading}
          disabled={secondsLeft > 0}
          onClick={() => requestReset({ email: getValues('email') })}
        >
          {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : 'Resend link'}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(requestReset)} noValidate>
      {error && <p role="alert" className="form-error">{error}</p>}

      <InputField
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Button type="submit" isLoading={isLoading}>
        Send reset link
      </Button>
    </form>
  );
};