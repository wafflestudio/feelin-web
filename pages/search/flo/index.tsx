import type { NextPage } from "next";
import Image from "next/image";
//import styles from "../styles/Home.module.css";
import styles from './index.module.css';
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import axios from "axios";

axios.defaults.baseURL = 'https://api-feelin.kro.kr/api/v1';

export interface Track {
    id: number;
    title : string;
    artists: Artist[];
    album: Album;
  }
  
  export interface Artist {
    id : number;
    name : string;
  }
  
  export interface Album {
    id : number;
    title : string;
    thumbnail : string;
  }

  const dummyTrack : Track[] = [
    {
      id : 1,
      title : 'love',
      artists : [
        {
          id : 1,
          name : '브라운아이드걸스',
        },
      ],
      album : {
        id : 1,
        title : 'Love',
        thumbnail : ''
      }
    },
  ]

const Search = () => {

  const floURL = 'https://www.music-flo.com/api/search/v2/search';
  
  const [searchFinished, setSearchFinished] = useState<boolean>(false);

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
        searchResultsPost(floDataModify(response.data));
      })
      .catch((e) => {
        console.log("flo 검색 에러");
      });
  };


  const searchResultsPost= (searchResultList : any) => {
    localStorage.setItem('searchResults', JSON.stringify(searchResultList));
    const searchResults = JSON.parse(localStorage.getItem("searchResults") || '{}');
    console.log(searchResults);
    setSearchFinished(true);
  };

  var i;

  const floDataModify = (data : any) => {
    var trackList : Track[] = 
    data.data.list[0].list.map((track : any) => (
      {
        id : track.id,
        title : track.name,
        artists : track.artistList.map((artist: any) => ({
          id : artist.id,
          name : artist.name,
      })),
        album : {
          id : track.album.id,
          title : track.album.title,
          thumbnail : track.album.imgList[5]
        }
      }
    ));
    return trackList;
  }


  useEffect(() => {
    floSearch();
  },[]);

  useEffect(()=> {
    if(searchFinished){
      setSearchFinished(false);
      console.log("searched");
    }
  });


  return (
    <div>
        Searching Flo..
    </div>
  );
}


export default Search;