import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/Button';
import { InputField } from '@/shared/components/InputField';
import { useResetPassword } from '../hooks/useResetPassword';
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '../schemas/auth.schemas';

export const ResetPasswordForm = () => {
  const { tokenState, resetPassword, isLoading, error } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  if (tokenState === 'checking') {
    return <p role="status">Checking your link...</p>;
  }

  if (tokenState === 'invalid') {
    return (
      <div role="alert">
        <p className="form-error">
          {error ?? 'This reset link is invalid or has expired.'}
        </p>
        <p>
          <Link to="/forgot-password">Request a new link</Link>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(({ password }) => resetPassword(password))}
      noValidate
    >
      <InputField
        label="New password"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />

      <InputField
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button type="submit" isLoading={isLoading}>
        Update password
      </Button>
    </form>
  );
};