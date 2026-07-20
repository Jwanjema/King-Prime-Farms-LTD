"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, createUserProfile, getUserProfile } from "@/lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const p = await getUserProfile(firebaseUser.uid);
        setProfile(p);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signUp = useCallback(async ({ name, email, password, phone }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    const p = await createUserProfile(cred.user.uid, { name, email, phone });
    setProfile(p);
    return cred.user;
  }, []);

  const signIn = useCallback(async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const p = await getUserProfile(cred.user.uid);
    setProfile(p);
    return { user: cred.user, profile: p };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const cred = await signInWithPopup(auth, new GoogleAuthProvider());
    let p = await getUserProfile(cred.user.uid);
    if (!p) {
      p = await createUserProfile(cred.user.uid, {
        name: cred.user.displayName || "",
        email: cred.user.email || "",
      });
    }
    setProfile(p);
    return { user: cred.user, profile: p };
  }, []);

  const signOutUser = useCallback(() => signOut(auth), []);

  const value = { user, profile, loading, signUp, signIn, signInWithGoogle, signOutUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
