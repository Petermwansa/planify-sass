import Image from "next/image";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing((prev) => !prev);

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

  
  // the function to persist the edited data to the database
  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userRef, {
        bio,
        company,
        industry,
        role,
        teamSize,
      });
      alert("Your profile has been updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

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
        <button className="profile_edit" onClick={toggleEditing}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>

        {isEditing ? (
          <div className="profile_edit_form">
            <div className="input_field">
              <label className="panel_name_title">Bio</label>
              <textarea
                className="panel_input"
                value={bio || ""}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Edit Your Bio"
              />
            </div>
            <div className="input_field">
              <label className="panel_name_title">Industry</label>
              <input
                className="panel_input"
                value={industry || ""}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Edit Your Industry"
              />
            </div>
            <div className="input_field">
              <label className="panel_name_title">Company</label>
              <input
                className="panel_input"
                value={company || ""}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Edit Your Company"
              />
            </div>
            <div className="input_field">
              <label className="panel_name_title">Role</label>
              <input
                className="panel_input"
                value={role || ""}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Edit Your Role"
              />
            </div>
            <div className="input_field">
              <label className="panel_name_title">Team Size</label>
              <input
                className="panel_input"
                value={teamSize || ""}
                onChange={(e) => setTeamSize(e.target.value)}
                placeholder="Edit Your Team Size"
              />
            </div>
            <button className="profile_save" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        ) : (
          isLoaded && (
            <div className="profile_details">
              <div className="input_field">
                <h1 className="panel_name_title">Name</h1>
                <h1 className="panel_name">{name}</h1>
              </div>
              <div className="input_field">
                <h1 className="panel_name_title">Email</h1>
                <h1 className="panel_name">{email}</h1>
              </div>
              <div className="input_field">
                <h1 className="panel_name_title">Current Plan</h1>

                <h1 className="panel_name">{plan}</h1>
              </div>
              <div className="input_field">
                <h1 className="panel_name_title">Bio</h1>

                <h1 className="panel_name">{bio}</h1>
              </div>
              <div className="input_field">
                <h1 className="panel_name_title">Industry</h1>

                <h1 className="panel_name">{industry}</h1>
              </div>
              <div className="input_field">
                <h1 className="panel_name_title">Company</h1>

                <h1 className="panel_name">{company}</h1>
              </div>
              <div className="input_field">
                <h1 className="panel_name_title">Role</h1>

                <h1 className="panel_name">{role}</h1>
              </div>
              <div className="input_field">
                <h1 className="panel_name_title">Team Size</h1>

                <h1 className="panel_name">{teamSize}</h1>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
