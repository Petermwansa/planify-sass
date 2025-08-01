'use client';

import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/signin"); // redirect to login after logout
  };

  return (
    <button
      onClick={handleLogout}
      className="logout_button"
    >
      Logout
    </button>
  );
}
