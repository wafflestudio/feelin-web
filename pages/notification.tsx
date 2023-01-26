import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Notification=()=>{
    const router = useRouter();

    return(
    <div>
        <p>notification page here</p>
        <button onClick={() => { router.back() }}>
            go back
        </button>
    </div>
    )
}

export default Notification;