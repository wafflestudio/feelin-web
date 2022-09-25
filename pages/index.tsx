import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
//import styles from "../styles/Home.module.css";
import styles from './index.module.css';
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const dummyTrack= [
  {
    id:1,
    title:'love',

  }
]

const Home: NextPage = () => {


  const router = useRouter();


  useEffect(() => {
    localStorage.getItem("token") === null && router.push("./login");
  });

  const Logout = ()=> {
      localStorage.removeItem("token");
      router.push("./login");
  }

  const melonURL = '';

  const melonSearch= () => {
    axios
      .get(`/melon/search/song/index.htm`, {
        params: {
          startIndex: 1,
          pageSize: 50,
          q: dummyTrack[0].title,
          sort: 'weight',
          section: 'song',
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
          'Access-Control-Allow-Origin': '*',
      },
      })
      .then(response => {
        console.log(response);
      })
      .catch((e) => {
        console.log("검색 에러");
      });
  };


  return (
    <div className={styles.wrapper}>

      <ul>
        <li >main page here</li>
        <hr></hr>
        <li>
          <Link href="./profile/wafflestudio">
            <a>Go to wafflestudio's profile page</a>
          </Link>
        </li>
        <li>
          <Link href="./profile/flee">
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
            onClick={melonSearch}
          >
            melon search API
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

export default Home;
