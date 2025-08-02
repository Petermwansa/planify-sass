import Image from "next/image";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setName(docSnap.data().name);
          setEmail(docSnap.data().email);
          setProfilePhoto(docSnap.data().profilePhoto);
          setPlan(docSnap.data().plan);
        } else {
          setName(user.displayName || "User");
        }
        setIsLoaded(true);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="panel-profile">
        <div className="image_field">
          <Image
            className="panel_image"
            alt="The profile image if the user"
            src={profilePhoto ?? "/images/apple.png"}
            width={100}
            height={100}
          />
          <div className="image_text_group">
            <h2 className="image_text">{name}</h2>
            <button className="image_edit">Upload Photo</button>
          </div>
        </div>
        <div className="profile_details">
          <div className="profile_details_plan">
            <h1>Bio</h1>
            <p>{plan}</p>
          </div>
          <div className="profile_details_plan">
            <h1>Current Plan</h1>
            <p>{plan}</p>
          </div>
          <div className="profile_details_plan">
            <h1>Industry</h1>
            <p>{plan}</p>
          </div>
          <div className="profile_details_plan">
            <h1>Role / Title</h1>
            <p>{plan}</p>
          </div>
          <div className="profile_details_plan">
            <h1>Team Size</h1>
            <p>{plan}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
