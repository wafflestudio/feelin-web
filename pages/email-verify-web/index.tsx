import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Back from '../post/[post_num]/images/back.svg';

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
      .post("https://api-feelin.kro.kr/api/v1/auth/user", {
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
      .post("https://api-feelin.kro.kr/api/v1/auth/user/verify-code", {
        email: verifiedEmail,
        code: code,
      })
      .then(() => {
        setAuthenticating(false);
        router.push({
          pathname: "/signup",
          query: { email: email },
        });
      })
      .catch((e) => {
        setAuthenticating(false);
        console.log("코드 인증 에러");
      });
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button className={styles.goBack} onClick={() => { router.back() }}>
          <Image src={Back} alt='back' width={25} height={25}/>
        </button>
        <div>
          Verify your Email
        </div>
      </header>
      <div>
      <div className={styles.inputName}>Email</div>
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
