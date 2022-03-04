import Link from "next/link";
import { useRouter } from "next/router";

const Follower=()=>{
    const router = useRouter();
    const {username}= router.query;

    return(
    <div>
        <p>{username}'s follower page here</p>
        <button onClick={()=>{router.back()}}>
                go back
        </button>
    </div>
    )
}

export default Follower;