import Link from "next/link";
import { useRouter } from "next/router";
import styles from './index.module.css';
import { ChangeEvent, FormEvent, useState } from "react";
import Back from '../post/[post_num]/images/back.svg';
import Image from "next/image";
import axios from "axios";

const Setting=()=>{
    const router = useRouter();
    const [sendingEmail, setSendingEmail] = useState<boolean>(false);
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [verified, setVerified] = useState<boolean>(false);
    const [verifiedEmail, setVerifiedEmail] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");


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

    return(
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
            <div className={styles.headerName}>Setting</div>
        </header>
        <div className={styles.border}/>
        <div className={styles.settingMainWrapper}>
          
            <button className={styles.SettingButton} onClick={tmpVerifyEmail}>
                알림
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton} onClick={tmpVerifyEmail}>
                개인정보
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton} onClick={tmpVerifyEmail}>
                보안
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton} onClick={tmpVerifyEmail}>
                계정
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton} onClick={tmpVerifyEmail}>
                도움말
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton} onClick={tmpVerifyEmail}>
                소개
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton} onClick={tmpVerifyEmail}>
                스트리밍 서비스 계정 연동
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.LogOutButton} onClick={verifyEmail} disabled={sendingEmail || authenticating}>
                LogOut $ID
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
      
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
    )
}

export default Setting;