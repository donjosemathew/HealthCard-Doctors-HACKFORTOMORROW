import React, { createContext, useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { provider, auth, db } from "../firebase/firebase";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { Redirect } from "react-router-dom";
export const AuthContext = createContext();

const AuthContextprovider = (props) => {
  const [currentuser, setUser] = useState("");
  const [load, setLoading] = useState(true);
  //////////Current User

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          phonenum: user.phoneNumber,
          photo: user.photoURL,
          uid: user.uid,
        });
      } else {
      }
    });
  }, []);
  ///////////SignIn
  const SignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser({
          name: result.user.displayName,
          email: result.user.email,
          phonenum: result.user.phoneNumber,
          photo: result.user.photoURL,
          uid: result.user.uid,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!load && currentuser) {
      console.log(currentuser, "user");
      AddData();
    }
  }, [currentuser]);
  function AddData() {
    const colRef2 = doc(db, "doctors", currentuser.uid);
    getDoc(colRef2).then((docu) => {
      console.log(docu.exists());
      if (!docu.exists()) {
        setDoc(doc(db, "doctors", currentuser.uid), {
          personaldata: {
            name: currentuser.name ? currentuser.name : "Not vilable",
            hospital: "Not Avilable",
            phoneNumber: "Not Available",
          },
        });
      }
    });
  }
  /////////////////Signout
  const SignOut = () => {
    console.log("logout");
    signOut(auth)
      .then(() => {
        setUser(false);
        <Redirect to="/" />;
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <AuthContext.Provider
      value={{ load: load, user: currentuser, SignIn, SignOut }}
    >
      {load ? <h1>Loading</h1> : props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextprovider;
