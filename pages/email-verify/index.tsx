import styles from "./index.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Back from '../post/[post_num]/images/back.svg';
import React from "react";

const EmailVerify = () => {
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const router = useRouter();

  const verifyEmail = () => {
    setVerified(false);
    setSendingEmail(true);
    axios
      .post("https://api-feelin.kro.kr/api/v1/auth", {
        email: email,
      })
      .then(() => {
        setVerified(true);
        setSendingEmail(false);
        setVerifiedEmail(email);
      })
      .catch((error) => {
        setSendingEmail(false);
        console.log("이메일 인증 에러");
      });
  };

  const verifyCode = () => {
    setAuthenticating(true);
    axios
      .post("https://api-feelin.kro.kr/api/v1/auth/verify-code", {
        email: verifiedEmail,
        code: code,
      })
      .then(() => {
        setAuthenticating(false);
        router.push({
          pathname: "./signup",
          query: { email: email },
        });
      })
      .catch((e) => {
        setAuthenticating(false);
        console.log("코드 인증 에러");
      });
  };

  const tmpVerifyEmail = () => {
    setAuthenticating(false);
    router.push({
      pathname: "./signup",
      query: { email: email },
    });
  }


  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button
          onClick={router.back}
          className={styles.goBack}>
          <Image
          alt="goBack"
          src={Back}
          width={20}
          height={20}/>
        </button>
      </header>
      <div>
      <div className={styles.inputName}>Email</div>
      <form className={styles.form}>
        
      <input
      className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"이메일을 입력하세요."}
      />
      <div className={styles.EmailVerifyButtonWrapper}>
        <button className={styles.EmailVerifyButton} onClick={verifyEmail} disabled={sendingEmail || authenticating}>
          Verify
        </button>
      </div>
      
      <div className={styles.EmailVerifyButtonWrapper}>
        <button className={styles.EmailVerifyButton} onClick={tmpVerifyEmail}>
          temp Verify
        </button>
      </div>
      </form>
      
      {/*<div className={styles.EmailVerifyButtonWrapper}>
        <Link href={"/signup/"+email}>
          <button className={styles.EmailVerifyButton}>
            Sign Up
          </button>
      </Link>
  </div>*/}

      {verified && (
        <>
          <input
            className = {styles.input}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={"인증 코드를 입력하세요."}
          />
          <div className={styles.EmailVerifyButtonWrapper}>
            <button onClick={verifyCode} disabled={authenticating} className={styles.EmailVerifyButton}>
              Sign Up with <br/> {email}
            </button>
          </div>
        </>
      )}
    </div>

      <style jsx>{`
      input {
        border: solid #cccccc;
        border-width: 0 0 1px;

        font-size: 14px;
        line-height: 18px;
      }
      input:focus {
        outline: none;
        border-bottom: 1px solid #00c19c;
      }
      button:hover {
        cursor: pointer;
      }
      `}
        
      
      </style>
    </div>
    
  );
};

export default EmailVerify;
