import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { post_num } = router.query;

  return (
    <div>
      <p>post {post_num}'s page is here</p>
      <button
        onClick={() => {
          router.back();
        }}
      >
        go back
      </button>
    </div>
  );
};

export default Post;
