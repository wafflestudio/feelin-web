import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
//import styles from "../styles/Home.module.css";
import styles from './index.module.css';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const dummyTrack= [
  {
    id:1,
    title:'love',

  }
]

interface Props {
  userAgent: string
  header : any
}

const Home : NextPage<Props> = ({ userAgent,header } : Props) => {

  const floURL = 'https://www.music-flo.com/api/search/v2/search';
  const melonURL = 'https://www.melon.com/search/song/index.htm';
  const spotifyURL = 'https://api.spotify.com/v1/tracks/6kLCHFM39wkFjOuyPGLGeQ';
  const proxy = 'https://cors-anywhere.herokuapp.com'

  const router = useRouter();


  const [token, SetToken] = useState<string | number | boolean>(0);


  useEffect(() => {
    localStorage.getItem("token") === null && router.push("./login");
  });

  const Logout = ()=> {
      localStorage.removeItem("token");
      router.push("./login");
  }

  const spotifySearch= () => {
    axios
      .get( spotifyURL, {
        params: {
          keyword: dummyTrack[0].title,
          searchType: 'TRACK',
          sortType: 'ACCURACY',
          size: 100,
          page: 1,
      },
      })
      .then(response => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log("flo 검색 에러");
      });
  };

  const floSearch= () => {
    axios
      .get( floURL, {
        params: {
          keyword: dummyTrack[0].title,
          searchType: 'TRACK',
          sortType: 'ACCURACY',
          size: 100,
          page: 1,
      },
      })
      .then(response => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log("flo 검색 에러");
      });
  };

  const melonSearch= () => {
    axios.get(proxy + '/' + melonURL, {
            params: {
                startIndex: 1,
                pageSize: 50,
                q: dummyTrack[0].title,
                sort: 'weight',
                section: 'song',
            },
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
              Authorization : token,
          },
      })
      .then(response => {
        console.log(response.data);

      })
      .catch((e) => {
        console.log("melon 검색 에러");
      });
  };



  return (
    <div className={styles.wrapper}>

      <ul>
        <li >main page here</li>
        <hr></hr>
        <li>
          <Link href="./profile/0">
            <a>Go to wafflestudio's profile page</a>
          </Link>
        </li>
        <li>
          <Link href="./profile/1">
            <a>Go to Flee's profile page</a>
          </Link>
        </li>
        <li>
          <Link href="./post/0">
            <a>Go to 1st post's page</a>
          </Link>
        </li>
        <li>
          <Link href="./post/1">
            <a>Go to 2nd post's page</a>
          </Link>
        </li>
        <li>
          <Link href="./notification">
            <a>Go to notification page</a>
          </Link>
        </li>
        <li>
          <Link href="./setting">
            <a>Go to setting page</a>
          </Link>
        </li>
        <li>
          <Link href="./write">
            <a>Write your post</a>
          </Link>
        </li>
        <li>
          <button
            onClick={Logout}
          >
            LogOut
          </button>
        </li>
        <li>
          <button
            onClick={floSearch}
          >
            flo search API
          </button>
          <button
            onClick={melonSearch}
          >
            melon search API
          </button>
          <button
            onClick={spotifySearch}
          >
            spotify search API
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
      button:hover {
        cursor: pointer;
      }
      ul {
        list-style: none;
        padding-left: 0px;
      }
      li {
        border : 1px solid black;
        margin: 15px;
        padding: 15px;
        display : flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
      }
      `}
      </style>
    </div>
  );
};

/*
export async function getServerSideProps(context) {
  
  //context는 자바스크립트 오브젝트인데 여기 유용한게 많이 들어 있습니다. 공식문서 보시면 자세히 설명되어 있습니다.
  
  //아래 코드는 쿠키를 빼서 쓰는 모습입니다.
  const cookie = context.req ? context.req.headers.cookie : "";
  
  const token = tokenFromCookie(cookie);//쿠키에서 토큰만 빼는 함수가 위에 어디 있습니다.
  
  //이것은 그냥 데이터를 위한 API 엔드포인트입니다.
  const userProfileEndpoint = endpointMania("/api/user/profile");
  
  //자유롭게 자바스크립트 코드를 이용해서 데이터를 가져와서 지지고 볶고 할 수 있습니다.
  if (token === "") {
    const profile = { success: false, token: "없음" };
    return { props: { profile } };
  }
  try {
      //저는 그냥 fetch를 썼는데 axios를 써도 상관 없습니다.
    const res = await fetch(userProfileEndpoint, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const profile = await res.json();
    return {
      props: {
        profile,
      },
    };
  } catch (e) {
    console.log(e);
    const profile = { success: false };
    return { props: { profile } };
  }
}*/

export const getServerSideProps = ({ req } : any) => {
  const userAgent = req.headers['user-agent'];
  return { props: { userAgent, header: req.headers } }
}

export default Home;
