import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

type TSignupForm = {
  password: string;
  lastName: string;
  firstName: string;
  username: string;
  phoneNumber: string;
};

const Signup = () => {
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
          .then(() => {
            localStorage.setItem("token", "111");
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
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input value={router.query.email} readOnly />
        <input
          type={"password"}
          name={"password"}
          value={input.password}
          onChange={onChange}
          placeholder={"Password"}
        />
        <input
          type={"password"}
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          placeholder={"Verify Password"}
        />
        <input
          name={"lastName"}
          value={input.lastName}
          onChange={onChange}
          placeholder={"Last Name"}
        />
        <input
          name={"firstName"}
          value={input.firstName}
          onChange={onChange}
          placeholder={"First Name"}
        />
        <input
          name={"username"}
          value={input.username}
          onChange={onChange}
          placeholder={"Username"}
        />
        <input
          name={"phoneNumber"}
          value={input.phoneNumber}
          onChange={onChange}
          placeholder={"Phone Number"}
        />
        <button disabled={input.password !== verifyPassword}> 회원 가입</button>
      </form>
    </div>
  );
};

export default Signup;
