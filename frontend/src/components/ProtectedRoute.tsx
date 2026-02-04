import React from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthenticated()) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;