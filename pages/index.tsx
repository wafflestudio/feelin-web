import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {

  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("token") === null && router.push("/login");
  });

  return (
    <ul>
      <li>main page here</li>
      <hr></hr>
      <li>
        <Link href="/profile/wafflestudio">
          <a>Go to wafflestudio's profile page</a>
        </Link>
      </li>
      <li>
        <Link href="/profile/flee">
          <a>Go to Flee's profile page</a>
        </Link>
      </li>
      <li>
        <Link href="/post/1">
          <a>Go to 1st post's page</a>
        </Link>
      </li>
      <li>
        <Link href="/post/2">
          <a>Go to 2nd post's page</a>
        </Link>
      </li>
      <li>
        <Link href="/notification">
          <a>Go to notification page</a>
        </Link>
      </li>
      <li>
        <Link href="/setting">
          <a>Go to setting page</a>
        </Link>
      </li>
      <li>
        <Link href="/write">
          <a>Write your post</a>
        </Link>
      </li>
      <li>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          로그아웃
        </button>
      </li>
    </ul>
  );
};

export default Home;
