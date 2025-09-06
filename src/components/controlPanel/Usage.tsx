"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import ProgressBar from "@/app/UI/ProgressBar";

export default function Usage() {
  const [progress, setProgress] = useState(0);
  const [limit, setLimit] = useState<number | null>(null);
  const [used, setUsed] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const usage = docSnap.data().usage;
          if (usage) {
            const usedCount = usage.monthlyGenerations || 0;
            const limitCount = usage.limit ?? 0;

            setUsed(usedCount);
            setLimit(limitCount);

            if (limitCount > 0) {
              setProgress(Math.min(100, Math.round((usedCount / limitCount) * 100)));
            } else {
              setProgress(0); // if no limit is set
            }
          }
        }
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="usage">
      {limit !== null ? (
        <>
          <p className="usage_text">
            You have used {used}/{limit} of your available generate tokens.
          </p>

          <ProgressBar progress={progress} />
          <p className="progress">{progress}%</p>

          <p className="usage_text_bottom">
            Upgrade to Premium Plan to get unlimited tokens.
          </p>
        </>
      ) : (
        <p className="usage_text">Loading usage data...</p>
      )}
    </div>
  );
}
