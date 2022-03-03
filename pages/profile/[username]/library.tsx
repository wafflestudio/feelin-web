import Link from "next/link";
import { useRouter } from "next/router";

const Library=()=>{
    const router = useRouter();
    const {username}= router.query;

    return(
    <div>
        <p>{username}'s music library page here</p>
        <button>
            <Link href={"/"}>
                <a>go back</a>
            </Link>
        </button>
    </div>
    )
}

export default Library;