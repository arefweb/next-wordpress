import React from 'react';
import { removeTags } from '../../functions/functions';
import Image from "next/image";
import Link from "next/link";

const myLoader = ({ src, width, quality }) => {
  return src
};

const SinglePost = ({ post, page }) => {
  return (
    <div className="col-md-4 SinglePost">
      <div className="post-box">
        {/* <img src={post?.featured_img} alt="" style={{height: "200px", width: "100%"}} /> */}
        <div style={{ position: "relative", height: "200px", width: "100%" }}>
          <Image
            loader={myLoader}
            src={post?.featured_img}
            alt=""
            layout="fill"
            unoptimized
          />
        </div>
        <Link href={`/posts/${page}/${post.id}`}>
          <a>
            <h2>{removeTags(post?.title.rendered)}</h2>
          </a>
        </Link>
        <p>{removeTags(post?.excerpt.rendered)}</p>
      </div>
    </div>
  );
};

export default SinglePost
