import Link from "next/link";
import { useRouter } from "next/router";

const Setting=()=>{
    const router = useRouter();

    return(
    <div>
        <p>setting page here</p>
        <button onClick={() => { router.back() }}>
            go back
        </button>
    </div>
    )
}

export default Setting;