import Link from "next/link";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
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
        <Link href={"/"}>
          <button className={styles.login}>
            <a>로그인</a>
          </button>
        </Link>
        <p>
          <b>! 비밀번호가 일치하지 않습니다.</b>
        </p>
      </form>
      <Link href={"/login/signup"}>
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
          position: absolute;
          width: 100%;
          top: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
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
        button:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Login;
