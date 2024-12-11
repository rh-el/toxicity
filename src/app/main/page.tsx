"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { MutatingDots } from "react-loader-spinner";

interface PostType {
  id: bigint;
  content: string;
  users: {
    id: bigint;
    username: string;
    avatar: string;
  };
}

export default function Home() {
  const [postData, setPostData] = useState<PostType[]>([]);
  const [ lastFetchedId, setLastFetchedId ] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchNextData = async () => {

    try {

      const idToFetch = lastFetchedId - 1
      const response = await fetch(`/api/next-post/${idToFetch}`)
      if (!response.ok) {

        throw new Error("Error while fetching next post");

      }
      const postInfos = await response.json()
      setPostData(prev => ([...prev , postInfos.postInfos[0]]))
      setLastFetchedId(postInfos.postInfos[0].id)

      console.log(lastFetchedId)
      if (lastFetchedId === 607) {
        setHasMore(false)
      }

    } catch (error) {
      console.error(error)
    } 
  }


  const fetchFirstPosts = async () => {
    try {

      const response = await fetch(`/api/next-post/0`)

      if (!response.ok) {

        throw new Error("Error while fetching next post");

      }
      const postInfos = await response.json()

      setPostData(postInfos.postInfos)
      setLastFetchedId(postInfos.postInfos[7].id)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchFirstPosts()
  }, []);
  
  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        { postData.length !== 0 &&

          <InfiniteScroll
            dataLength={postData.length}
            next={fetchNextData}
            hasMore={hasMore}
            className={'flex flex-col gap-3 w-full '}
            loader={
            <MutatingDots 
              visible={true}
              height="100"
              width="100"
              color="rgb(0, 0, 0)"
              secondaryColor="rgb(0, 0, 0)"
              radius="20"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass="w-full flex justify-center"
              />
            }
          >
          {postData.map((post: PostType, index) => (
            <PostCard key={index} post={post} />
          ))}
          </InfiniteScroll>
        }
      </div>
    </>
  );
}
