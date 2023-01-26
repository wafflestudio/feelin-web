import styles from './index.module.css';
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import axios from "axios";


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