import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, provider } from "../config/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import { addUser, getUserById } from "../libs/firebase/db/user";
import { IUserData, RoleTypes } from "../globals/types";

interface ICreateContext {
  loading: boolean;
  currentUser: UserCredential["user"] | undefined;
  logout: () => void;
  userData: IUserData | undefined;
  registerWithGoogle: () => void;
}

const defaultContextVal: ICreateContext = {
  currentUser: undefined,
  loading: true,
  logout: () => {},
  registerWithGoogle: () => {},
  userData: undefined,
};

const AuthContext = createContext<ICreateContext>(defaultContextVal);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  // auth user

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserCredential["user"]>();
  const [userDataError, setUserDataError] = useState<string | null>(null);
  // db user info
  const [userData, setUserData] = useState<IUserData>();

  const registerWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);

        // The signed-in user info.
        const user = result.user;
        const docUser = await getUserById(user.uid);

        if (!docUser)
          await addUser({
            id: user.uid,
            email: user.email!,
            role: RoleTypes.user,
          });

        setUserData(docUser!);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.log("error is ", error);
      });
  };

  function logout() {
    return signOut(auth).then(() => {
      setUserData(undefined);
    });
  }

  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe method
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // this code for setting the error to '' might not work if we don't track the error but if we add it to dependencies this will get called a bunch, would have to add it as a ref if need be
      if (userDataError) setUserDataError(null);

      if (user) {
        setCurrentUser(user);
        const userData = await getUserById(user.uid);
        setUserData(userData);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logout,
    userData,
    registerWithGoogle,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
