import Link from "next/link";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import React from 'react';

type TLoginForm = {
  username: string;
  password: string;
};



const Login = () => {

  
  const [input, setInput] = useState<TLoginForm>({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleLogin = () => {
    axios
      .post("https://api-feelin.kro.kr/api/v1/auth/user/signin", {
        account: input.username,
        password: input.password,
      })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        router.push('./');
        //sendToFlutter();
      })
      .catch((e) => {
        console.log("로그인 에러");
      });
  };


  const handleTempLogin = () => {
    localStorage.setItem("token", "token");
    console.log(localStorage.getItem("token"));
    router.push('./index.html');
  }

  const handleToMain = () => {
    localStorage.setItem("token", "token");
    console.log(localStorage.getItem("token"));
    router.push('./');
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  
  return (
    <div className={styles.wrapper}>
      
      <div className={styles.logo}>
        <span>로고</span>
      </div>
      <form onSubmit={onSubmit}>
        <input
          className={styles.username}
          name={"username"}
          value={input.username}
          onChange={onChange}
          placeholder={"아이디 또는 이메일 또는 전화번호"}
          autoComplete={"off"}
        />
        <input
          className={styles.password}
          name={"password"}
          value={input.password}
          type={"password"}
          onChange={onChange}
          placeholder={"비밀번호"}
        />
          <button
            className={styles.login}
            onClick={() => 
              handleLogin}
            disabled={input.username === "" || input.password === ""}
          >
            <a>로그인</a>
          </button>
          <button
            onClick={handleTempLogin}
          >
            <a>임시로그인</a>
          </button>
          <button
            onClick={handleToMain}
          >
            <a>to Main</a>
          </button>
        <p>
          <b>version 0.0.19</b>
        </p>
      </form>
      <button className={styles.signup}>
        <Link href={"./email-verify"}>  
          <a>회원가입</a>
        </Link>
      </button>
      {/* css */}
      <style jsx>{`
        span {
          color: white;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          width: 100%;
          top: 35%;
        }
        p {
          font-size: 13px;
          line-height: 16px;
          color: #00c19c;
          margin-top: 6px;
        }
        input {
          width: 258px;
          height: 22px;
          border: solid #cccccc;
          border-width: 0 0 1px;
          margin-top: 18px;
          padding-left: 3px;

          font-size: 14px;
          line-height: 18px;
        }
        input:focus {
          outline: none;
          border-bottom: 1px solid #00c19c;
        }
        button {
          width: 258px;
          height: 38px;
          font-weight: 700;
          font-family: "Spoqa Han Sans Neo", sans-serif;
          margin-top: 3px;
        }
        `}</style>
        
        
      </div>
  );
};

export default Login;
