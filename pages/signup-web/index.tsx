import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import Back from '../post/[post_num]/images/back.svg';
import Image from "next/image";

type TSignupForm = {
  password: string;
  lastName: string;
  firstName: string;
  username: string;
  phoneNumber: string;
};

const SignupWeb = () => {
  const router = useRouter();

  const [input, setInput] = useState<TSignupForm>({
    password: "",
    lastName: "",
    firstName: "",
    username: "",
    phoneNumber: "",
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
      .post("https://api-feelin.kro.kr/api/v1/auth/user/signup", {
        email: router.query.email,
        password: input.password,
        lastName: input.lastName,
        firstName: input.firstName,
        username: input.username,
        phoneNumber: input.phoneNumber,
      })
      .then(() => {
        axios
          .post("https://api-feelin.kro.kr/api/v1/auth/user/signin", {
            account: router.query.email,
            password: input.password,
          })
          .then(response => {
            localStorage.setItem("token", response.data.token);
            setLoading(false);
            router.push("/");
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
        <button className={styles.goBack} onClick={() => { router.back() }}>
          <Image src={Back} alt='back' width={25} height={25}/>
        </button>
        <div>
          Sign Up
        </div>
      </header>
      <div>
        Fill your profile
      </div>
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
          value={input.password}
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
          Last Name
        </div>
        <input
          className={styles.input}
          name={"lastName"}
          value={input.lastName}
          onChange={onChange}
          placeholder={"Last Name"}
        />
        <div className={styles.inputName}>
          First Name
        </div>
        <input
          className={styles.input}
          name={"firstName"}
          value={input.firstName}
          onChange={onChange}
          placeholder={"First Name"}
        />
        <div className={styles.inputName}>
          Username
        </div>
        <input
          className={styles.input}
          name={"username"}
          value={input.username}
          onChange={onChange}
          placeholder={"Username"}
        />
        <div className={styles.inputName}>
          Phone Number
        </div>
        <input
          className={styles.input}
          name={"phoneNumber"}
          value={input.phoneNumber}
          onChange={onChange}
          placeholder={"Phone Number"}
        />
        <div className={styles.signUpButtonWrapper}>
          <button disabled={input.password !== verifyPassword} className={styles.signUpButton}>Sign Up</button>
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

export default SignupWeb;
