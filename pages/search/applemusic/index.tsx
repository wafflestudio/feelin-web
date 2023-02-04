import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Head from 'next/head';
import Script from 'next/script';

axios.defaults.baseURL = 'https://api-feelin.kro.kr/api/v1';

const Applemusic = () => {
    
    const getQuery = () => {
        return Object.fromEntries((new URLSearchParams(window.location.search)).entries()).token;
    }

    /*const Authorize = () => {
        let music = MusicKit.getInstance();
    }*/

    useEffect(()=> {
        console.log(getQuery());
    })
  

  return (
    <>
        <Head>
            <meta name="apple-music-developer-token" content="{getQuery()}"/>
            <meta name="apple-music-app-name" content="My Cool Web App"/>
            <meta name="apple-music-app-build" content="1978.4.1"/>
            <title>React App</title>
        </Head>
        <div>
            <Script
            id="musickit"
            src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"
            onLoad={() => {
                console.log("post");
            }}/>
            <Script
            id="post"
            src="https://feelin-dev.com/musickit.js"
            onLoad={() => {
                console.log("hello");
            }}/>
            Searching Applemusic..
        </div>
    </>
    );
}


export default Applemusic;