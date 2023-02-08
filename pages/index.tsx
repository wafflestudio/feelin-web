import type { NextPage } from "next";
import styles from './index.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import React from "react";
import FeelinLogo from '../public/favicon.ico';


axios.defaults.baseURL = 'https://api-feelin.kro.kr/api/v1';

export interface Track {
  id: number;
  title : String;
  artists: Artist[];
  album: Album;
}

export interface Artist {
  id : number;
  name : String;
}

export interface Album {
  id : number;
  title : String;
  thumbnail : String;
}

export interface UserDataJSON {
  id : String;
}

interface Props {
  userAgent: string
  header : any
}

const Home : NextPage<Props> = ({ userAgent,header } : Props) => {

  const router = useRouter();

  const [token, SetToken] = useState<string | number | boolean>(0);

  const appleMusicUserToken = () => {
    router.push('./apple-music-login.html?id={id}&token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjQ3QzZESEc5R1AiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJLOTg4M1lCNFZSIiwiZXhwIjoxNjgxMzkyMTAxLCJpYXQiOjE2NzM2MTYxMDF9.KWgXFRF0iAG_Gqpsd-k9YOIPUFew-ydOL3BLGjsUEItlUYD25ZREk5JLtY3F3IQZWgGcTPJda-mpZB5pfnxbmw');
  }
  const appleMusicGuide = () => {
    router.push('./guide/applemusic');
  }
  const spotifyGuide = () => {
    router.push('./guide/spotify');
  }
  const privacyPolicy = () => {
    router.push('./privacy-policy.html');
  }
  const termsOfUse = () => {
    router.push('./terms-of-use.html');
  }


  return (
    <div className={styles.wrapper}>
      <Image
        src={FeelinLogo}
        alt='FeelinLogo'
        width={200}
        height={200}
      />
      <h1>Feelin' Web</h1>
      <ul>
        <li>
          <button onClick={()=> appleMusicUserToken()}>
            get appleMusic user token
          </button>
        </li>
        <li>
          <button onClick={()=> appleMusicGuide()}>
            Guide : get applemusic playlist link 
          </button>
        </li>
        <li>
          <button onClick={()=> spotifyGuide()}>
            Guide : get spotify playlist link 
          </button>
        </li>
        <li>
          <button onClick={()=> privacyPolicy()}>
            Privacy Policy
          </button>
        </li>
        <li>
          <button onClick={()=> termsOfUse()}>
            Terms of Use
          </button>
        </li>
      </ul>
      
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
      button {
        color: black;
        background-color: transparent;
        font-size: 16px;
        border: 0;
      }
      button:hover {
        cursor: pointer;
        background-color: #e0e0e0;
      }
      ul {
        list-style: none;
        padding-left: 0px;
      }
      li {
        border: 1px solid black;
        background-color: white;
        margin: 15px;
        padding: 15px;
        display : flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
      }
      li:hover {
        cursor: pointer;
        background-color: #e0e0e0;
      }
      `}
      </style>
    </div>
  );
};

export const getServerSideProps = ({ req } : any) => {
  const userAgent = req.headers['user-agent'];
  return { props: { userAgent, header: req.headers } }
}

export default Home;
