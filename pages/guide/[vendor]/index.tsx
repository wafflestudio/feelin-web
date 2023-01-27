import { useRouter } from "next/router";
import styles from './index.module.css';
import Image from "next/image";
import Slider from "react-slick"
import React from 'react';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styled from "styled-components";
import ApplemusicGuideImage1 from '../guideImages/applemusic/applemusic-1.png';
import ApplemusicGuideImage2 from '../guideImages/applemusic/applemusic-2.png';
import ApplemusicGuideImage3 from '../guideImages/applemusic/applemusic-3.png';
import SpotifyGuideImage1 from '../guideImages/spotify/spotify-1.png';
import SpotifyGuideImage2 from '../guideImages/spotify/spotify-2.png';
import SpotifyGuideImage3 from '../guideImages/spotify/spotify-3.png';



const Guide=()=>{
    const router = useRouter();
    const { vendor } = router.query;
    

    const ApplemusicGuideText : any[] = 
      [<p className={styles.text}><span className={styles.red}>Press the menu button</span>(...) on the top right corner</p>,
       <p className={styles.text}>Select <span className={styles.red}>Share Playlist...</span> from the menu</p>,
       <p className={styles.text}>Select <span className={styles.red}>Copy</span> and you’re done!</p>]
    const applemusicGuideImages : any[][] = [[ApplemusicGuideImage1, ApplemusicGuideText[0]], [ApplemusicGuideImage2, ApplemusicGuideText[1]], [ApplemusicGuideImage3, ApplemusicGuideText[2]]];
    
    const SpotifyGuideText : any[] = 
      [<p className={styles.text}><span className={styles.red}>Press the menu button</span>(...) on the left</p>,
       <p className={styles.text}>Select <span className={styles.red}>Share</span> from the menu</p>,
       <p className={styles.text}>Select <span className={styles.red}>Copy link</span> and you’re done!</p>]
    const spotifyGuideImages : any[][] = [[SpotifyGuideImage1, SpotifyGuideText[0]], [SpotifyGuideImage2, SpotifyGuideText[1]], [SpotifyGuideImage3, SpotifyGuideText[2]]];

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };


    const Wrap = styled.div`
      .slick-prev:before {
        opaicty: 1;
        color: black;
      }
      .slick-next:before {
        opacity: 1;
        color: black;
      }`

    const StyledSlider = styled(Slider)`
      height: fit-content;
      .slick-list {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
      }
      .slick-track {
        position: relative;
        display: flex;
        width: 100%;
        height: fit-content;
      }
      .slick-slide {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        padding: 4% 4% 0% 4%;
      }
      `

    return(
      <Wrap className={styles.wrapper}>
        <StyledSlider {...settings} className={styles.slider}>
          {vendor==='applemusic' ? 
          applemusicGuideImages.map((image) => {
            return <div className={styles.ImageWrapper}>
              <div className={styles.guideImage}>
                <Image
                src={image[0]}
                alt='applemusicGuideImage'
                />
              </div>
              {image[1]}
            </div>
          })
          : vendor==='spotify' ?
          spotifyGuideImages.map((image) => {
            return <div className={styles.ImageWrapper}>
              <div className={styles.guideImage}>
                <Image
                  src={image[0]}
                  alt='spotifyGuideImage'
                  className={styles.guideImage}
                />
              </div>
              {image[1]}
            </div>
          })
          :
          <div>
            No Guide for this streaming service
          </div>
          }
        </StyledSlider>
      </Wrap>
    )
}

export default Guide;