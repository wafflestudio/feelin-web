import Link from "next/link";
import { useRouter } from "next/router";

const Profile = () => {
    const router = useRouter();
    const { username } = router.query;

    return (
        <div>
            <p>{username}'s profile page here</p>
            <ul>
                <li>
                    <Link href={`/profile/${username}/following`}>
                        <a>123 following</a>
                    </Link>
                </li>
                <li>
                    <Link href={`/profile/${username}/follower`}>
                        <a>123 follower</a>
                    </Link>
                </li>
                <li>
                    <Link href={`/profile/${username}/library`}>
                        <a>{username}'s music library</a>
                    </Link>
                </li>
                <li>
                    <button onClick={() => { router.back() }}>
                        go back
                    </button>
                </li>
            </ul>

        </div>
    )
}

export default Profile;