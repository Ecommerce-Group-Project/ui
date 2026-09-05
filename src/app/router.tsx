import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { HomePage } from "@/features/home/pages/HomePage";
import { UserProfilePage } from "@/features/user/page/UserProfilePage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage"; 
import { ResetPasswordPage } from "@/features/auth/pages/ResetPassword";
import { RootLayout } from "./RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <HomePage /> },
          {path:"/profile",element: <UserProfilePage/>}
        ],
      },

      { path: "*", element: <p>Page not found</p> },
    ],
  },
]);
