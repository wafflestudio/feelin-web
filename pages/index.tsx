import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
    return (
      <ul>
        <li>
          <Link href="/post/abc">
            <a>Go to pages/post/[pid].js</a>
          </Link>
        </li>
        <li>
          <Link href="/post/abc?foo=bar">
            <a>Also goes to pages/post/[pid].js</a>
          </Link>
        </li>
        <li>
          <Link href="/post/abc/a-comment">
            <a>Go to pages/post/[pid]/[comment].js</a>
          </Link>
        </li>
        <li>
          <Link href={"/login"}>
            <a>logout</a>
          </Link>
        </li>
      </ul>
    )
}

export default Home
