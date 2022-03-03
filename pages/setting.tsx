import Link from "next/link";

const Setting=()=>{

    return(
    <div>
        <p>setting page here</p>
        <button>
            <Link href={"/"}>
                <a>go back</a>
            </Link>
        </button>
    </div>
    )
}

export default Setting;