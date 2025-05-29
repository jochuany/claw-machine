"use client"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import { useEffect } from "react";

export default function firebaseTest0529() {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDYYu6UQv0pIclwrRxfKsyH77c4e2xjR_0",
    authDomain: "nccu-1132-web.firebaseapp.com",
    projectId: "nccu-1132-web",
    storageBucket: "nccu-1132-web.firebasestorage.app",
    messagingSenderId: "328642400061",
    appId: "1:328642400061:web:f6b47d727f2dc3c490bf54",
    databaseURL: "https://nccu-1132-web-default-rtdb.firebaseio.com/"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const dbRef = ref(database, "/");


  //取得權限，要寫在initialize app之後
  const auth = getAuth();
  const provider = new GoogleAuthProvider();


  useEffect(() => {

    //抓取資料：onValue()
    onValue(dbRef, (snapshot) => {
      console.log(snapshot.val());
    });

    //指定路徑：ref
    const userRef = ref(database, "/accounts/001");

    //更動資料：set()
    set(userRef, {
      name: "chuan",
      point: 100
    })


  }, []);


  //新增帳號的函式
  const addNewAccount = () => {
    console.log("clicked");

    //指定路徑
    const accountRef = ref(database, "/accounts");

    //新增資料：push()
    push(accountRef, {
      name: "a",
      point: 50
    })
  }

  //登入的函式
  const login = () => {
    //登入
    signInWithPopup(auth, provider).then((result) => {
      //獲取登入帳號的資料
      console.log(result.user.uid);
      console.log(result.user.displayName);


      const uid = result.user.uid;
      const accountRef = ref(database, "/account/" + uid);

      //資料庫中沒此帳號，建立一個
      if (!accountRef) {
        push(accountRef, {
          name: uid,
          point: 0
        })
      }



      //資料庫中有此帳號，不執行
    });
  }


  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">

        <div className="px-2 py-1 my-2 bg-black rounded-full text-white w-[200px] text-center cursor-pointer"
          onClick={addNewAccount}>Add New Account</div>

        <div className="px-2 py-1 my-2 bg-black rounded-full text-white w-[200px] text-center cursor-pointer"
          onClick={login}>Log in with Google</div>

      </div>

    </>
  );
}