import Link from "next/link";

const Main=()=>{


    return(
    <div>
        <p>main page here</p>
        <button>
            <Link href={"/"}>
                <a>go back</a>
            </Link>
        </button>
    </div>
    )
}

export default Main;