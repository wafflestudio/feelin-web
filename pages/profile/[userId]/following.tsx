import Link from "next/link";
import { useRouter } from "next/router";

const Following=()=>{
    const router = useRouter();
    const {username}= router.query;

    return(
    <div>
        <p>{username}'s following page here</p>
        <button onClick={()=>{router.back()}}>
                go back
        </button>
    </div>
    )
}

export default Following;