import { useRouter } from "next/router";
import styles from './playlistItem.module.css';
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";

interface Props {
    //loadNext: boolean;
    songImg: string;
    songTitle: string;
    songSinger: string;
    //loadAgain: boolean;
    item: {
        id: Number,
        songTitle: string,
        songSinger: string,
        songImg: string,
      };
    //setLoadAgain: (boolean: boolean) => void;
  }

const PlaylistItem = ({item, songImg,songTitle,songSinger} : Props ) => {

    return (
            <li className={styles.wrapper}>
                <img className={styles.songImg} src={songImg} alt="songImg" />
                <div className={styles.songInfo}>
                    <div className={styles.songTitle}>
                        {songTitle}
                    </div>
                    <div className={styles.songSinger}>
                        {songSinger}
                    </div>
                </div>
                <div className={styles.playButton}>
                    재생
                </div>
            </li>
    );
};

export default PlaylistItem;
