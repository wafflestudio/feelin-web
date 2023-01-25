import Link from "next/link";
import { useRouter } from "next/router";
import styles from './index.module.css';
import { ChangeEvent, FormEvent, useState } from "react";
import Back from '../post/[post_num]/images/back.svg';
import Image from "next/image";
import axios from "axios";

const Setting=()=>{
    const router = useRouter();


    const handleLogOut = () => {
        axios
          .post("https://api-feelin.kro.kr/api/v1/auth/user/signout", {

          })
          .then(response => {
            console.log("로그아웃 성공");
            router.push('./');
          })
          .catch((e) => {
            console.log("로그아웃 에러");
          });
      };

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
          
            <button className={styles.SettingButton}>
                알림
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton}>
                개인정보
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton}>
                보안
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton}>
                계정
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton}>
                도움말
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton}>
                소개
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.SettingButton}>
                스트리밍 서비스 계정 연동
                <div className={styles.goIn}>
                    <Image
                    alt="goBack"
                    src={Back}
                    width={20}
                    height={20}/>
                </div>
            </button>
            <button className={styles.LogOutButton} onClick={handleLogOut}>
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