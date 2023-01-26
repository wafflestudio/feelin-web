import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Write=()=>{
    const router = useRouter();

    return(
    <div>
        <p>Write your post here</p>
        <input></input>
        <button onClick={() => { router.back() }}>
            go back
        </button>
    </div>
    )
}

export default Write;