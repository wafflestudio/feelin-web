import Link from "next/link";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

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
        router.push("/");
      })
      .catch((e) => {
        console.log("로그인 에러");
      });
  };

  const handleTempLogin = () => {
    localStorage.setItem("token", "1");
    router.push("/");
    console.log(localStorage.getItem("token"))
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
        <p>
          <b>! 비밀번호가 일치하지 않습니다.</b>
        </p>
      </form>
      <Link href={"/email-verify"}>
        <button className={styles.signup}>
          <a>회원가입</a>
        </button>
      </Link>
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
          top: 300px;
        }
        p {
          font-size: 13px;
          line-height: 16px;
          color: #00c19c;
          margin-top: 6px;
          transform: translateX(-46px);
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
        }
      `}</style>
    </div>
  );
};

export default Login;