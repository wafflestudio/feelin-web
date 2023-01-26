import type { NextPage } from "next";
import styles from './index.module.css';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";


axios.defaults.baseURL = 'https://api-feelin.kro.kr/api/v1';
//axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
const access_token = 'BQAooJtA7WhfAOP_1hL-flxf3s9j9_SHnPqBwZIcGbCvxuGqidhOC7yFkoHc70oAlS__o9-g129pPzusORgoaFxxFga4Qvji-esvOhApeNWk-bnNmN8BmCXnAh_I3wBSrSU_wYmSozAqRc0ATQZtyR0fmoSgQtQocbY0kD4XB9MNZoMn6_5esg91GM2koqa5MydotJ-BUIVP';

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

const dummyUserData : UserDataJSON =
  {
    id : '0'
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
  {
    id : 2,
    title : 'love1',
    artists : [
      {
        id : 3,
        name : '브라운아이드걸스1',
      },
    ],
    album : {
      id : 2,
      title : 'Love1',
      thumbnail : ''
    }
  },
]

interface Props {
  userAgent: string
  header : any
}

const Home : NextPage<Props> = ({ userAgent,header } : Props) => {

  const floURL = 'https://www.music-flo.com/api/search/v2/search';
  const melonURL = 'https://www.melon.com/search/song/index.htm';
  const spotifyURL = 'https://api.spotify.com/v1';
  const proxy = 'https://herokufeelin.herokuapp.com'

  const router = useRouter();


  const [token, SetToken] = useState<string | number | boolean>(0);


  useEffect(() => {
    localStorage.getItem("token") === null && router.push("./login");
  });

  const Logout = ()=> {
      localStorage.removeItem("token");
      router.push("./login");
  }

  //const imgUrl = "https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/3e/04/eb/3e04ebf6-370f-f59d-ec84-2c2643db92f1/196626945068.jpg/{w}x{h}bb.jpg";
  const propertyAdder = (tracks: Track[], weight: Number, height: Number) => {
    const addTracks = tracks.map((item) => ({...item, types: "songs"}))
    console.log(addTracks);
    return addTracks;
  }

  const spotifyTrackSearch= (id : String) => {
    axios
      .get( spotifyURL + '/tracks/' + id, {
        headers: {
          'Authorization' : `Bearer ${access_token}`,
          'Content-Type' : 'application/json'
      },
      })
      .then(response => {
        console.log(response.data);
        const trackList = response.data?.tracks?.items?.map((track : any) => {
          const artists = track?.artists?.map((artist : any) => ({
              vendor: 'spotify',
              id: artist?.id,
              name: artist?.name,
          }));
          return {
              vendor: 'spotify',
              title: track?.name,
              id: track?.id,
              artists: artists,
              album: {
                  vendor: 'spotify',
                  title: track?.album?.name,
                  id: track?.album?.id,
                  coverUrl: track?.album?.images[0].url,
              },
          };
      });
      console.log(trackList);
        
      })
      .catch((e) => {
        console.log("spotify 검색 에러");
      });
  };


  const spotifyRecentTrackSearch= () => {
    axios
      .get( spotifyURL + '/me/player/recently-played', {
        headers: {
          'Authorization' : `Bearer ${access_token}`,
          'Content-Type' : 'application/json'
      },
      })
      .then(response => {
        console.log(response.data);
        const recentTrackList = response.data?.items?.map((track : any) => {
          const artists = track.track.artists.map((artist: any) => ({
              vendor: 'spotify',
              id: artist.id,
              name: artist.name,
          }));
          const recentAlbum = track.track.album;
          return {
              vendor: 'spotify',
              title: track.track.name,
              id: track.track.id,
              artists: artists,
              album: {
                  vendor: 'spotify',
                  id: recentAlbum.id,
                  title: recentAlbum.name,
                  coverUrl: recentAlbum.images[0].url,
              },
          };
      });
      console.log(recentTrackList)
      })
      .catch((e) => {
        console.log("spotify 최근 들은 트랙 검색 에러");
      });
  };

  const spotifySearch= (query : String) => {
    axios
      .get( spotifyURL + '/search', {
        params:{
          'q' : query,
          'type' : 'track',
          'include_external' : 'audio',
          'limit' : 30,
          'offset' : 0
        },
        headers: {
          'Authorization' : `Bearer ${access_token}`,
          'Content-Type' : 'application/json'
      },
      })
      .then(response => {
        console.log(response.data);
        const trackList = response.data?.tracks?.items?.map((track : any) => {
          const artists = track?.artists?.map((artist : any) => ({
              vendor: 'spotify',
              id: artist?.id,
              name: artist?.name,
          }));
          return {
              vendor: 'spotify',
              title: track?.name,
              id: track?.id,
              artists: artists,
              album: {
                  vendor: 'spotify',
                  title: track?.album?.name,
                  id: track?.album?.id,
                  coverUrl: track?.album?.images[0].url,
              },
          };
      });
      console.log(trackList);
      })
      .catch((e) => {
        console.log("spotify 검색 에러");
      });
  };

  
  const spotifyGetUser= () : any => {
    axios.get(spotifyURL + '/me', {
        headers: {
          'Authorization' : `Bearer ${access_token}`,
          'Content-Type' : 'application/json'
      },
      })
      .then(response => {
        console.log(response.data);
        console.log(response.data.id);
        return response.data;
      })
      .catch((e) => {
        console.log("spotify 유저 정보 가져오기 에러");
        return 0;
      });
  };

  const spotifySavePlaylist= (playlistName : String, playlistDescription : String ) => {
    axios
      .post( 'https://api.spotify.com/v1/users/31ejtgomu2ablytdg2r4utgvnqwu/playlists',
       {
        'name' : '1',
        'description' : 'It is description'
      }, {
        headers: {
        'Authorization' : `Bearer ${access_token}`,
        'Content-Type' : 'application/json'
      },
    }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log("spotify 플레이리스트 생성 에러");
      });
  };

  const spotifyAddTracksToPlaylist= (urisList : String[] ) => {
    axios
      .post( 'https://api.spotify.com/v1/playlists/4ht1zod9nfEhscV7tVtdkd/tracks',
       null, {
      params:{
        'uris' : '' + urisList.map((id) => 'spotify:track:'+id)
      },
        headers: {
        'Authorization' : `Bearer ${access_token}`,
        'Content-Type' : 'application/json'
      },
    }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log("spotify 플레이리스트에 트랙 추가 에러");
      });
  };

  const spotifyGetPlaylists= () => {
    axios
      .get( 'https://api.spotify.com/v1/users/31ejtgomu2ablytdg2r4utgvnqwu/playlists',
       {
        headers: {
        'Authorization' : `Bearer ${access_token}`,
        'Content-Type' : 'application/json'
      },
    }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log("spotify 플레이리스트 생성 에러");
      });
  };

  const spotifyGetPlaylistItems= (playlistId : String) => {
    axios
      .get( `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
       {
        headers: {
        'Authorization' : `Bearer ${access_token}`,
        'Content-Type' : 'application/json'
      },
    }
      )
      .then(response => {
        console.log(response.data);
        const playlistData = response.data?.items;
        const trackList : Track[] = playlistData?.map((item : any) => ({
          vendor: 'spotify',
          title: item?.track?.name,
          id : item?.track?.id,
          artists: item?.track?.artists?.map((artist : any) => ({ vendor: 'spotify', id : artist.id, name : artist.name })),
          album: {
            vendor: 'spotify',
            title: item?.track?.album?.name,
            id: item?.track?.album?.id,
            coverUrl: item?.track.album?.images[0].url
        }
      }));
        console.log(trackList);
      })
      .catch((e) => {
        console.log("spotify 플레이리스트 생성 에러");
      });
  };


  const appleMusicUserToken = () => {
    router.push('./apple-music-login.html');
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
          <Link href="./setting">
            <a>Go to setting page</a>
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

export const getServerSideProps = ({ req } : any) => {
  const userAgent = req.headers['user-agent'];
  return { props: { userAgent, header: req.headers } }
}

export default Home;
