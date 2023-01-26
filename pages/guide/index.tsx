import { useRouter } from "next/router";
import styles from './index.module.css';
import Back from '../post/[post_num]/images/back.svg';
import Image from "next/image";
import Slider from "react-slick"

const Guide=()=>{
    const router = useRouter();


    return(
    <div className={styles.wrapper}>
        <header className={styles.header}>
            <button
                onClick={router.back}
                className={styles.goBack}>
                <Image
                alt="goBack"
                src={Back}
                width={20}
                height={20}/>
            </button>
            <div className={styles.headerName}>Guide</div>
        </header>
        <div className={styles.border}/>
        <div className={styles.settingMainWrapper}>
            <Slider>

            </Slider>
    </div>
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
      `}
      </style>
    </div>
    )
}

export default Guide;