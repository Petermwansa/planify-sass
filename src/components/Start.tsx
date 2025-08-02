import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
interface SidebarProps {
  setActiveView: (view: string) => void;
}

const Start: React.FC<SidebarProps> = ({ setActiveView }) => {
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

  return (
    <div className="start">
      {isLoaded && name && <h1 className="welcome">Hey {name}</h1>}
      {/* <h1 className="start-name">Hey {name}</h1> */}
      <p className="start-p">Welcome to your AI Content creation assistant</p>
      <button
        onClick={() => setActiveView("multistepform")}
        className="generate-btn"
      >
        + New Idea
      </button>
    </div>
  );
};

export default Start;
