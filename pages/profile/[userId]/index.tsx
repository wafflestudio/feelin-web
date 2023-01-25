import Link from "next/link";
import { useRouter } from "next/router";
import styles from './post.module.css';
import { ChangeEvent, FormEvent, useState } from "react";
import Back from '../../post/[post_num]/images/back.svg';
import Image from "next/image";
import musicnote from "../../../public/musicnote.png";
import { profile } from "console";

const dummyProfiles = [
{
    id : 0,
    username : "wafflestudio",
    image : 'https://image.bugsm.co.kr/album/images/500/40581/4058181.jpg',
    introduction : "it's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio hereit's wafflestudio here",
    countPosts : 1,
    following :
      {
        "content": [
            {
                "id": 1,
                "username": "admin",
                "image": ""
            },
            {
                "id": 3,
                "username": "userB",
                "image": ""
            }
        ],
        "pageable": {
            "sort": {
                "empty": true,
                "sorted": false,
                "unsorted": true
            },
            "offset": 0,
            "pageNumber": 0,
            "pageSize": 30,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 2,
        "totalPages": 1,
        "last": true,
        "size": 30,
        "number": 0,
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
        },
        "numberOfElements": 2,
        "first": true,
        "empty": false
    },
    followers : {
      "content": [
          {
              "id": 2,
              "username": "userA",
              "image": ""
          },
          {
              "id": 3,
              "username": "userB",
              "image": ""
          }
      ],
      "pageable": {
          "sort": {
              "empty": true,
              "unsorted": true,
              "sorted": false
          },
          "offset": 0,
          "pageSize": 30,
          "pageNumber": 0,
          "paged": true,
          "unpaged": false
      },
      "totalPages": 1,
      "totalElements": 2,
      "last": true,
      "size": 30,
      "number": 0,
      "sort": {
          "empty": true,
          "unsorted": true,
          "sorted": false
      },
      "numberOfElements": 2,
      "first": true,
      "empty": false
  }
},
{
    id : 1,
    username : "flee",
    image : 'https://image.bugsm.co.kr/album/images/500/40581/4058181.jpg',
    introduction : "it's flee here",
    countPosts : 1,
    following :
      {
        "content": [
            {
                "id": 1,
                "username": "admin",
                "image": ""
            },
            {
                "id": 3,
                "username": "userB",
                "image": ""
            }
        ],
        "pageable": {
            "sort": {
                "empty": true,
                "sorted": false,
                "unsorted": true
            },
            "offset": 0,
            "pageNumber": 0,
            "pageSize": 30,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 2,
        "totalPages": 1,
        "last": true,
        "size": 30,
        "number": 0,
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
        },
        "numberOfElements": 2,
        "first": true,
        "empty": false
    },
    followers : {
      "content": [
          {
              "id": 2,
              "username": "userA",
              "image": ""
          },
          {
              "id": 3,
              "username": "userB",
              "image": ""
          }
      ],
      "pageable": {
          "sort": {
              "empty": true,
              "unsorted": true,
              "sorted": false
          },
          "offset": 0,
          "pageSize": 30,
          "pageNumber": 0,
          "paged": true,
          "unpaged": false
      },
      "totalPages": 1,
      "totalElements": 2,
      "last": true,
      "size": 30,
      "number": 0,
      "sort": {
          "empty": true,
          "unsorted": true,
          "sorted": false
      },
      "numberOfElements": 2,
      "first": true,
      "empty": false
  }
}]

const dummyUserPosts = [
  {
    content: [
        {
            id: 0,
            title: "is this movie? o_0",
            createdAt: "2022-09-29T22:09:44.615901",
            thumbnail: "https://image.bugsm.co.kr/album/images/200/5558/555871.jpg?version=20210316085012.0"
        },
        {
            id: 1,
            title: "Super long playlist title that takes up two lines",
            createdAt: "2022-09-29T22:09:45.347127",
            thumbnail: "https://cdn.pixabay.com/photo/2020/02/04/13/47/looking-4818206_1280.jpg"
        },
        {
            id: 2,
            title: "test post with new playlist2",
            createdAt: "2022-09-29T22:09:46.233144",
            thumbnail: "http://www.akbobada.com/home/akbobada/archive/akbo/img/20190920153527.jpg"
        },
        {
            id: 3,
            title: "test post with new playlist3",
            createdAt: "2022-09-29T22:09:46.233144",
            thumbnail: "https://image.bugsm.co.kr/album/images/200/5558/555871.jpg?version=20210316085012.0"
        },
        {
            id: 4,
            title: "test post with new playlist4",
            createdAt: "2022-09-29T22:09:46.233144",
            thumbnail: "https://image.bugsm.co.kr/album/images/500/40581/4058181.jpg"
        }
    ],
    pageable: {
        sort: {
            empty: false,
            sorted: true,
            unsorted: false
        },
        offset: 0,
        pageSize: 30,
        pageNumber: 0,
        paged: true,
        unpaged: false
    },
    totalPages: 1,
    totalElements: 3,
    last: true,
    size: 30,
    number: 0,
    sort: {
        empty: false,
        sorted: true,
        unsorted: false
    },
    numberOfElements: 5,
    first: true,
    empty: false
},
{
  content: [
      {
          id: 0,
          title: "test post with new playlist1",
          createdAt: "2022-09-29T22:09:44.615901",
          thumbnail: "https://cdn.pixabay.com/photo/2020/02/04/13/47/looking-4818206_1280.jpg"
      },
      {
          id: 1,
          title: "test post with new playlist2",
          createdAt: "2022-09-29T22:09:45.347127",
          thumbnail: "https://cdn.pixabay.com/photo/2020/02/04/13/47/looking-4818206_1280.jpg"
      },
      {
          id: 2,
          title: "test post with new playlist3",
          createdAt: "2022-09-29T22:09:46.233144",
          thumbnail: "https://cdn.pixabay.com/photo/2020/02/04/13/47/looking-4818206_1280.jpg"
      }
  ],
  pageable: {
      sort: {
          empty: false,
          sorted: true,
          unsorted: false
      },
      offset: 0,
      pageSize: 30,
      pageNumber: 0,
      paged: true,
      unpaged: false
  },
  totalPages: 1,
  totalElements: 3,
  last: true,
  size: 30,
  number: 0,
  sort: {
      empty: false,
      sorted: true,
      unsorted: false
  },
  numberOfElements: 3,
  first: true,
  empty: false
},
]


const Profile = () => {
    const router = useRouter();
    const { userId } = router.query;

  console.log(userId);
  
  //const songList = dummyPlaylist[Number(post_num)].playList;

  const handlePlaylistClick = (id : Number) => {
    router.push(`../../post/${id}`);
  }


  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button className={styles.goBack} onClick={() => { router.back() }}>
          <Image
          src={Back}
          alt='back'
          width={25}
          height={25}/>
        </button>
        <div className={styles.username}>
          {userId ? dummyProfiles[Number(userId)].username : undefined}
        </div>
        <div className={styles.blank}/>
      </header>
      <div className={styles.info}>
        <div className={styles.infoMain}>
          <div className={styles.profileImgWrapper}>
            <img className={styles.profileImg} src={userId ? dummyProfiles[Number(userId)].image: undefined} alt="profileImg"/>
          </div>
          {/*<div className={styles.infoMainMiddleSection}>
            <ul className={styles.profileGenreList}>
              <li className={styles.profileGenre}>
                R&B
              </li>
              <li className={styles.profileGenre}>
                HipHop
              </li>
            </ul>
          </div>*/}
          <div className={styles.infoMainRightSection}>
            <div className={styles.countInfo}>
              <text className={styles.bold}>
                {userId ? dummyProfiles[Number(userId)].countPosts : undefined}
              </text>
              Posts
            </div>
            <div className={styles.countInfo}>
              <text className={styles.bold}>
                {userId ? dummyProfiles[Number(userId)].followers.content.length : undefined}
              </text>
              Followers
            </div>
            <div className={styles.countInfo}>
              <text className={styles.bold}>
                {userId ? dummyProfiles[Number(userId)].following.content.length : undefined}
              </text>
              Following
            </div>
          </div>
        </div>
        <div className={styles.infoTextWrapper}>
          <div className={styles.infoName}>
            {userId ? dummyProfiles[Number(userId)].username : undefined}
          </div>
          <div className={styles.infoText}>
            {userId ? dummyProfiles[Number(userId)].introduction : undefined}
          </div>
        </div>
        <button className={styles.followButton}>
          Follow
        </button>
      </div>
      <div className={styles.listWrapper}>
        <ul className={styles.listItems}>
          {userId ? dummyUserPosts[Number(userId)].content.map(item => (
            <li className={styles.listElm}>
              <div className={styles.playlistWrapper} onClick={()=> {handlePlaylistClick(item.id)}}>
                <img className={styles.playlistImg} src={userId ? item.thumbnail: undefined} alt="playlistImg"/>
                <div className={styles.playlistTitle}>
                  {userId ? item.title : undefined}
                </div>
              </div>
            </li> //리스트에 플레이리스트 커버 추가
          ))  : undefined}
        </ul>
        <div className={styles.coverScroll}/>
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
      </footer>

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
}

export default Profile;