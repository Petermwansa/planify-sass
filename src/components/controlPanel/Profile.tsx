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
  const [bio, setBio] = useState<string | null>(null);
  const [company, setCompany] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [teamSize, setTeamSize] = useState<string | null>(null);
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
          setBio(docSnap.data().bio);
          setCompany(docSnap.data().company);
          setIndustry(docSnap.data().industry);
          setRole(docSnap.data().role);
          setTeamSize(docSnap.data().teamSize);
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
          <div className="input_field">
            <h1 className="panel_name">{name}</h1>
            <h1 className="panel_state">Edit Name</h1>
          </div>
          <div className="input_field">
            <h1 className="panel_name">{email}</h1>
            <h1 className="panel_state">Change Password</h1>
          </div>
          <div className="input_field">
            <h1 className="panel_name">{bio}</h1>
            <h1 className="panel_state">Set Bio</h1>
          </div>
          <div className="input_field">
            <h1 className="panel_name">{company}</h1>
            <h1 className="panel_state">Edit Company</h1>
          </div>
          <div className="input_field">
            <h1 className="panel_name">{role}</h1>
            <h1 className="panel_state">Edit Role</h1>
          </div>
          <div className="input_field">
            <h1 className="panel_name">{teamSize}</h1>
            <h1 className="panel_state">Edit Team Size</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
