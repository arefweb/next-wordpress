import React from 'react'
import { useRouter } from "next/router";
import callAPI from '../../../../services/api';
import { removeTags } from '../../../../functions/functions';
import Image from "next/image";

const Post = ({data}) => {
  const router = useRouter();
  const { id } = router.query;

  console.log(data);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container post">
      <div className="featured-img">
        <Image
          loader={myLoader}
          src={data?.featured_img}
          alt=""
          layout="fill"
          unoptimized
        />
      </div>
      <h2 className="post__title">{removeTags(data?.title.rendered)}</h2>
      <p className="post__content">{removeTags(data?.content.rendered)}</p>
    </main>
  );
}

const myLoader = ({ src, width, quality }) => {
  return src;
};

export async function getStaticPaths() {
  const res = await callAPI.getPosts(1);
  const posts = res.data;

  // Get the paths we want to pre-render based on posts
  const paths = posts.map(
    (post, index) => ({
      params: { id: (post.id).toString(), page: "1"},
    })
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await callAPI.getPost(params.id);
  const data = res.data;
  const header = res.headers;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, header },
  };
}

export default Post
