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
      <form onSubmit={onSubmit}>
        <input
          className={styles.username}
          name={"username"}
          value={input.username}
          onChange={onChange}
          placeholder={"사용자 이름 또는 이메일 또는 전화번호"}
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
        {/*{input.username === "" && (
          <span className={styles.placeholder}>
            <b>사용자 이름</b> 또는 <b>이메일</b> 또는 <b>전화번호</b>
          </span>
        )}*/}
        {/*{input.password === "" && (
          <span className={styles.placeholder}>
            <b>비밀번호</b>
          </span>
        )}*/}

        <Link href={"/"}>
          <button className={styles.login}>
            <a>로그인</a>
          </button>
        </Link>
        <Link href={"/login/signup"}>
          <button className={styles.signup}>
            <a>회원가입</a>
          </button>
        </Link>
      </form>
      {/* css */}
      <style jsx>{`
        form {
          position: absolute;
          width: 100%;
          top: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        input {
          width: 234px;
          height: 40px;
          color: white;
          background: #000000;
          border: 1px solid #ffffff;
          border-radius: 8px;
          box-sizing: border-box;
          margin-top: 10px;
          padding-left: 12px;

          font-size: 13px;
          line-height: 16px;
        }
        button {
          width: 234px;
          height: 38px;
          margin-top: 15px;
        }
        button:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Login;
