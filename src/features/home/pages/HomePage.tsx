import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/Button';
import { useAuthStore } from '@/features/auth/stores/authStore';

export const HomePage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <main>
      <h1>Hello, {user?.name ?? 'there'} 👋</h1>
      <Button variant="secondary" onClick={handleLogout}>
        Log out
      </Button>
    </main>
  );
};