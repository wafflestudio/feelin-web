import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

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
    <div>
      <p>이메일</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"이메일을 입력하세요."}
      />
      <button onClick={verifyEmail} disabled={sendingEmail || authenticating}>
        인증
      </button>
      {verified && (
        <>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={"인증 코드를 입력하세요."}
          />
          <button onClick={verifyCode} disabled={authenticating}>
            {email}로 회원가입
          </button>
        </>
      )}
    </div>
  );
};

export default EmailVerify;
