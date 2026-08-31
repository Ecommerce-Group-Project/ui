// app/RootLayout.tsx  — this is your App.tsx, renamed
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import Navbar from '../helpers/ui/NavBar';

export const RootLayout = () => (
  <div className="h-screen flex flex-col bg-app font-sans text-primary">
    {/* <Navbar /> */}

    <main className="flex-1 min-h-0 overflow-hidden">
      <Outlet />          {/* ← your <Routes> block was here */}
    </main>

    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      newestOnTop
      pauseOnHover
      theme="colored"
    />
  </div>
);