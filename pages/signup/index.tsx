import styles from "./index.module.css";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import Back from '../post/[post_num]/images/back.svg';
import Image from "next/image";

type TSignupForm = {
  password: String;
  name: String;
  username: String;
  countryCode: String;
  birthDate: String;
};

const Signup = () => {
  const router = useRouter();

  const [input, setInput] = useState<TSignupForm>({
    password: "",
    name: "",
    username: "",
    countryCode: "",
    birthDate: "",
  });
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleToSignup = () => {
    setLoading(true);
    axios
      .post("https://api-feelin.kro.kr/api/v1/auth/signup", {
        email: "jmsmlove02@naver.com",
        password: "1234",
        name: "Jaemin Lee",
        username: "user4",
        countryCode: "82",
        birthDate: "2002-08-27",
      })
      .then(() => {
        axios
          .post("https://api-feelin.kro.kr/api/v1/auth/signin", {
            account: router.query.email,
            password: input.password,
          })
          .then(response => {
            localStorage.setItem("token", response.data.token);
            setLoading(false);
            router.push("./index.html");
          })
          .catch((e) => {
            console.log("로그인 에러");
            setLoading(false);
          });
      })
      .catch((e) => {
        console.log("회원가입 에러");
        setLoading(false);
      });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleToSignup();
  };

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
      <div className={styles.fill}>
        <p>
          Fill your profile
        </p>
        </div>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputName}>
          Email
        </div>
        <input value={router.query.email} readOnly className={styles.input}/>
        <div className={styles.inputName}>
          Password
        </div>
        <input
          className={styles.input}
          type={"password"}
          name={"password"}
          //value={input.password}
          onChange={onChange}
          placeholder={"Password"}
        />
        <div className={styles.inputName}>
          Verify Password
        </div>
        <input
          className={styles.input}
          type={"password"}
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          placeholder={"Verify Password"}
        />
        <div className={styles.inputName}>
          Name
        </div>
        <input
          className={styles.input}
          name={"name"}
          //value={input.name}
          onChange={onChange}
          placeholder={"name"}
        />
        <div className={styles.inputName}>
          Username
        </div>
        <input
          className={styles.input}
          name={"username"}
          //value={input.username}
          onChange={onChange}
          placeholder={"Username"}
        />
        <div className={styles.inputName}>
          Country Code
        </div>
        <input
          className={styles.input}
          name={"countryCode"}
          //value={input.countryCode}
          onChange={onChange}
          placeholder={"Country Code"}
        />
        <div className={styles.inputName}>
          Birth Date
        </div>
        <input
          className={styles.input}
          name={"birthDate"}
          //value={input.birthDate}
          onChange={onChange}
          placeholder={"Birth Date"}
        />
        <div className={styles.signUpButtonWrapper}>
          <button /*disabled={input.password !== verifyPassword}*/ className={styles.signUpButton}>Sign Up</button>
        </div>
      </form>

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

export default Signup;
