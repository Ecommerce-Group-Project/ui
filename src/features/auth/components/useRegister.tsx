import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/Button';
import { InputField } from '@/shared/components/InputField';
import { useRegister } from '../hooks/useRegister';
import {
  registerSchema,
  type RegisterFormValues,
} from '../schemas/auth.schemas';

export const RegisterForm = () => {
  const { register: submitRegistration, isLoading, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = ({ name, email, password }: RegisterFormValues) =>
    submitRegistration({ name, email, password }); // drop confirmPassword

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && <p role="alert" className="form-error">{error}</p>}

      <InputField
        label="Full name"
        error={errors.name?.message}
        {...register('name')}
      />
      <InputField
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <InputField
        label="Password"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <InputField
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button type="submit" isLoading={isLoading}>
        Create account
      </Button>
    </form>
  );
};