import Link from "next/link";

const Login=()=>{


    return(
    <div>
        <p>LOGIN</p>
        <input></input>
        <input></input>
        <button>
            <Link href={"/"}>
            <a>login</a>
            </Link>
        </button>
        <button>
            <Link href={"/login/signup"}>
            <a>sign up</a>
            </Link>
        </button>

    </div>
    )
}

export default Login;