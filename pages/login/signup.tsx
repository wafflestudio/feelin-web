import Link from "next/link";

const Signup=()=>{


    return(
    <div>
        <p>SIGN UP</p>
        <input></input>
        <input></input>
        <button>
            <Link href={"/login"}>
            <a>sign up</a>
            </Link>
        </button>
    </div>
    )
}

export default Signup;