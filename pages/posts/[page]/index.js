import React, { useState, useEffect } from "react";
import Head from "next/head";
import callAPI from "../../../services/api";
import SinglePost from "../../../components/HomePage/SinglePost";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import PaginationComp from "../../../components/globalComponents/PaginationComp/PaginationComp";

export default function Home({ data, header }) {
  const router = useRouter();
  const { page } = router.query;
  const [posts, setPosts] = useState(data);
  const [pageNum, setPageNum] = useState(parseInt(page));
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);
  console.log(header["x-wp-totalpages"]);
  const [totalCount, settotalCount] = useState(parseInt(header["x-wp-totalpages"]))

  const handleChange = (event, value) => {
    setPageNum(value);
  };

  useEffect(() => {
    router.push(`/posts/${pageNum}`);
    setIsLoading(true)
  }, [pageNum]);

  useEffect(() => {
    setPosts(data);
    setIsLoading(false);
  }, [page]);

  return (
    <div className="Home">
      <Head>
        <title>وبلاگ رمز ارز | عارف موحدزاده</title>
        <meta name="description" content="اطلاعات و اخبار رمز ارز. نویسنده عارف موحدزاده" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="container">
        <div className="row">
          {isLoading ? (
            <SkeletonList />
          ) : (
            posts.map((post, i) => {
              return <SinglePost key={i} post={post} page={pageNum} />;
            })
          )}
        </div>
        <PaginationComp
          totalCount={totalCount}
          pageNum={pageNum}
          handleChange={handleChange}
        />
      </main>
    </div>
  );
}


const SkeletonList = ()=>{
  let tempArr = Array.from({length: 9}, (_,i)=>i);
  return (
    <>
      {tempArr.map((_, i) => {
        return (
          <div key={i} className="col-md-4 SinglePost">
            <div className="post-box">
              <Skeleton variant="rectangular" height={250} />
            </div>
          </div>
        );
      })}
    </>
  );
}


export async function getStaticPaths() {
  const res = await await callAPI.getPosts(1);
  const header = res.headers;
  let totalCount = parseInt(header["x-wp-totalpages"]);

  // Get the paths we want to pre-render based on posts
  const paths = Array.from({ length: totalCount }, (_, i) => i).map((_, index) => ({
    params: { page: (index+1).toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}


export async function getStaticProps({ params }) {
  const res = await callAPI.getPosts(params.page);
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
