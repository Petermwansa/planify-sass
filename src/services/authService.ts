import { auth, db } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";

// ---------- SIGN UP ----------
export const signup = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create a brand new document only at signup
  await setDoc(doc(db, "users", user.uid), {
    name,
    email: user.email,
    plan: "Free",
    profilePhoto: "",
    bio: "",
    industry: "",
    company: "",
    role: "",
    teamSize: "",
    stripeCustomerId: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    usage: {
      monthlyGenerations: 0,
      limit: 10,
    },
    savedIdeas: [],
    searchHistory: [],
  });
};

// ---------- LOGIN ----------
export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update last login time, but do not overwrite anything else
  await setDoc(
    doc(db, "users", user.uid),
    { updatedAt: serverTimestamp() },
    { merge: true }
  );

  return userCredential;
};

// ---------- GOOGLE LOGIN ----------
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // If new user, create full profile
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      profilePhoto: user.photoURL,
      plan: "free",
      bio: "",
      industry: "",
      company: "",
      role: "",
      teamSize: "",
      stripeCustomerId: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      usage: { monthlyGenerations: 0, limit: 10 },
      savedIdeas: [],
      searchHistory: [],
    });
  } else {
    // If existing user, only update timestamp and basic info
    await setDoc(
      userRef,
      {
        name: user.displayName,
        email: user.email,
        profilePhoto: user.photoURL,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  return result;
};

// ---------- LOGOUT ----------
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// ---------- FORGOT PASSWORD ----------
export const forgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Password reset email sent" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
