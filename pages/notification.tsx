import Link from "next/link";

const Notification=()=>{

    return(
    <div>
        <p>notification page here</p>
        <button>
            <Link href={"/"}>
                <a>go back</a>
            </Link>
        </button>
    </div>
    )
}

export default Notification;