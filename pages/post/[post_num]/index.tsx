import { useRouter } from "next/router";
import styles from './post.module.css';
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import PlaylistItem from "./playlistItem";
import Back from './images/back.svg';
import Image from "next/image";

const dummyPlaylist = [
  {
    id: 1,
    playlistName: '퇴근길 양화대교',
    profileImg: "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
    username: '김와플',
    musicNum: 23,
    playtime: 83,
    text: '퇴근길 양화대교의 감성을 가득 담은 플레이리스트입니다.퇴근할 때 들으면 좋아요. 아니면 코딩할 때 들어도 좋아요!',
    playlistImg: 'https://cdn.pixabay.com/photo/2020/02/04/13/47/looking-4818206_1280.jpg',
    playList: [
      {
        id: 1,
        songTitle: '운이 좋았지',
        songSinger: '권진아',
        songImg: 'http://www.akbobada.com/home/akbobada/archive/akbo/img/20190920153527.jpg',
      },
      {
        id: 2,
        songTitle: 'Warm On a Cold Night',
        songSinger: 'HONNE',
        songImg: 'https://image.bugsm.co.kr/album/images/200/5558/555871.jpg?version=20210316085012.0',
      },
      {
        id: 3,
        songTitle: '사라지나요',
        songSinger: 'PATEKO, JAyci yucca',
        songImg: 'https://image.bugsm.co.kr/album/images/500/40581/4058181.jpg',
      },
    ]
  },
  {
    id: 2,
    playlistName: '삶에 지친 나에게 전하는 따뜻한 발라드',
    profileImg: "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
    username: 'DJ celette',
    musicNum: 78,
    playtime: 303,
    text: 'GOOD. BALAD IS GOOD',
    playlistImg: 'https://cdn.pixabay.com/photo/2020/02/04/13/47/looking-4818206_1280.jpg',
    playList: [
      {
        id: 1,
        songTitle: '운이 좋았지',
        songSinger: '권진아',
        songImg: 'http://www.akbobada.com/home/akbobada/archive/akbo/img/20190920153527.jpg',
      },
      {
        id: 2,
        songTitle: 'Warm On a Cold Night',
        songSinger: 'HONNE',
        songImg: 'https://image.bugsm.co.kr/album/images/200/5558/555871.jpg?version=20210316085012.0',
      },
      {
        id: 3,
        songTitle: '사라지나요',
        songSinger: 'PATEKO, JAyci yucca',
        songImg: 'https://image.bugsm.co.kr/album/images/500/40581/4058181.jpg',
      },
      {
        id: 4,
        songTitle: '운이 좋았지',
        songSinger: '권진아',
        songImg: 'http://www.akbobada.com/home/akbobada/archive/akbo/img/20190920153527.jpg',
      },
      {
        id: 5,
        songTitle: 'Warm On a Cold Night',
        songSinger: 'HONNE',
        songImg: 'https://image.bugsm.co.kr/album/images/200/5558/555871.jpg?version=20210316085012.0',
      },
      {
        id: 6,
        songTitle: '사라지나요',
        songSinger: 'PATEKO, JAyci yucca',
        songImg: 'https://image.bugsm.co.kr/album/images/500/40581/4058181.jpg',
      },
      {
        id: 7,
        songTitle: '운이 좋았지',
        songSinger: '권진아',
        songImg: 'http://www.akbobada.com/home/akbobada/archive/akbo/img/20190920153527.jpg',
      },
      {
        id: 8,
        songTitle: 'Warm On a Cold Night',
        songSinger: 'HONNE',
        songImg: 'https://image.bugsm.co.kr/album/images/200/5558/555871.jpg?version=20210316085012.0',
      },
      {
        id: 9,
        songTitle: '사라지나요',
        songSinger: 'PATEKO, JAyci yucca',
        songImg: 'https://image.bugsm.co.kr/album/images/500/40581/4058181.jpg',
      },
    ]
  }]

const Post = () => {
  const router = useRouter();
  const { post_num } = router.query;

  console.log(post_num);
  
  const songList = dummyPlaylist[Number(post_num)].playList;


  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button className={styles.goBack} onClick={() => { router.back() }}>
          <Image src="/images/back.svg" alt='back' width={10} height={10}/>
        </button>
      </header>
      {/* <div className={styles.info}>
        <div className={styles.infoMain}>
          <img className={styles.playlistImg} src={dummyPlaylist[Number(post_num)].playlistImg} alt="playlistImg"/>
          <div className={styles.infoMainTexts}>
            <div>
              <img className={styles.profileImg} src={post_num ? dummyPlaylist[Number(post_num)].profileImg : undefined} alt="profileImg"/>
              {dummyPlaylist[Number(post_num)].username}
            </div>
            <div>
              {dummyPlaylist[Number(post_num)].playlistName}
            </div>
            <div className={styles.musicNumAndPlaytime}>
              <div className={styles.musicNum}>
                {dummyPlaylist[Number(post_num)].musicNum} 곡
              </div>
              <div className={styles.playtime}>
                {dummyPlaylist[Number(post_num)].playtime} 분
              </div>
            </div>
            <div>
              공유하기
            </div>
          </div>
        </div>
        <div className={styles.infoText}>
          {dummyPlaylist[Number(post_num)].text}
        </div>
        <div className={styles.addButtonWrapper}>
          <button className={styles.addButton}>
            내 계정에 플레이리스트 저장
          </button>
        </div>
      </div>
        <div className={styles.upperBorder}/>
      <div className={styles.listWrapper}>
        <ul className={styles.listItems}>
          {songList.map(item => (
            <PlaylistItem key={item.id} item={item} songImg={item.songImg} songTitle={item.songTitle} songSinger={item.songSinger} /> //리스트에 학생 추가
          ))}
          </ul>
      </div>
        <div className={styles.downBorder}/>
      <footer className={styles.footer}>
        <div className={styles.icon}>
          profile
        </div>
        <div className={styles.icon}>
          add
        </div>
        <div className={styles.icon}>
          folder
        </div>
      </footer> */}

      {/* css */}
      <style jsx>{`
        span {
          color: white;
        }
        form {
          position: absolute;
          width: 100%;
          top: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        p {
          font-size: 13px;
          line-height: 16px;
          color: #00c19c;
          margin-top: 6px;
          transform: translateX(-46px);
        }
        input {
          width: 258px;
          height: 22px;
          border: solid #cccccc;
          border-width: 0 0 1px;
          margin-top: 18px;
          padding-left: 3px;

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
      `}</style>
    </div>
  );
};

export default Post;
