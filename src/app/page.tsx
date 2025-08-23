"use client";

import LogoutButton from "@/components/LogoutButton";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setName(docSnap.data().name);
        } else {
          setName(user.displayName || "User");
        }
        setIsLoaded(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <ProtectedRoute>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="landing">
            <div className="landing_top">
              <h1 className="logo_landing">Planify.Ai</h1>
            </div>
            <div className="landing_bottom">
              {isLoaded && name && (
                <h1 className="welcome">Welcome back {name}</h1>
              )}
              {/* <h1 className="welcome">Welcome back {name}</h1> */}

              <button onClick={handleGoToDashboard} className="landing_button">
                Go to my Dashboard
              </button>
              <LogoutButton />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
