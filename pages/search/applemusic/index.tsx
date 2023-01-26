import styles from './index.module.css';
import { useEffect} from "react";
import router from "next/router";
import React from 'react';


const Applemusic = () => {

  useEffect(() => {
    router.push('../../apple-music-login.html')
  },[]);



  return (
    <div className={styles.wrapper}>
      applemusic Authorizing..
    </div>
  );
}


export default Applemusic;