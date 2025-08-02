import { auth, db } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";

export const signup = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name,
    email: user.email,
    plan: "free",
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

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  await setDoc(
    doc(db, "users", user.uid),
    {
      email: user.email,
      plan: "free",
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
    },
    { merge: true }
  );
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "password reset email sent" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
