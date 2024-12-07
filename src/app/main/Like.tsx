import React, { SetStateAction } from 'react';
import { useRef, useState, useEffect, Dispatch } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import Cookies from "js-cookie";

type LikeStatusType = {
    postIsLike: boolean;
    likeCount: number
  }

type Props = {
    postId: bigint,
    // likeStatus: LikeStatusType
    // setLikeStatus: Dispatch<SetStateAction<LikeStatusType>>
    // handleLike: (id: bigint) => void
}

const Like = ({ postId }: Props) => {
    const container = useRef<HTMLDivElement | null>(null)
    const likeClass = `like-icon-${postId}`
    const [ likeStatus, setLikeStatus ] = useState<LikeStatusType>({postIsLike: false, likeCount: 0})

    const { contextSafe } = useGSAP();
    const colorLike = contextSafe(
        (
        color: string,
        scale: number
        ) => {
            gsap.from(`.${likeClass}`, {
                duration: 0.4,
                scale: scale,
            })
            gsap.to(`.${likeClass}`, {
                duration: 0.4,
                fill: color,
                delay: 0.1,          
            })
    });

    const getLikeStatus = async (postId: bigint) => {
        const strId = String(postId)
          const response = await fetch('/api/like-status', {
          headers: {
            authorization: `Bearer ${Cookies.get('token')}`,
            post_id: strId
          }
          })
          const likeData = await response.json()
          setLikeStatus({
            postIsLike: !!likeData.isLikedByUser, 
            likeCount: likeData.likeCount
        })
  
          if (likeData.isLikedByUser) {
              colorLike('#ff0000', 0.5)
          } else {
              colorLike('#000000', 1)
          }
      }

    const likePost = async (postId: bigint) => {
        const response = await fetch('/api/like', {
            method: "POST",
            headers: {
                authorization: `Bearer ${Cookies.get('token')}`
              },
            body: JSON.stringify({
                'post_id': postId
            })
        })
        console.log(response)
        if (!response.ok) {
            throw new Error("an error occured while liking post");
        }
    }

    const unlikePost = async (postId: bigint) => {
        const response = await fetch('/api/unlike', {
            method: "POST",
            headers: {
                authorization: `Bearer ${Cookies.get('token')}`
              },
            body: JSON.stringify({
                'post_id': postId
            })
        })
        console.log(response)

        if (!response.ok) {
            throw new Error("an error occured while unliking post");
        }
    }

    const handleLikeColor = () => {
        setLikeStatus(prev => ({
            postIsLike: !prev.postIsLike, 
            likeCount: prev.postIsLike ? prev.likeCount - 1 : prev.likeCount + 1
        }))
        if (!likeStatus.postIsLike) {
            colorLike('#ff0000', 0.5) 
            // setLikeStatus({postIsLike: !likeStatus.postIsLike, likeCount: likeStatus.likeCount +1})
        } else {
            colorLike('#000000', 1)
            // setLikeStatus({postIsLike: !likeStatus.postIsLike, likeCount: likeStatus.likeCount -1})
        }
    }

    const handleLike = async () => {
        console.log(likeStatus.postIsLike)
        if (!likeStatus.postIsLike) {
            await likePost(postId)
        } else {
            await unlikePost(postId)
        }
        handleLikeColor()
    }

    // console.log(likeStatus)

    useEffect(() => {
        getLikeStatus(postId)
    }, [])



    return (
        <div className="flex items-center justify-center" ref={container} >
            <svg width="25" height="25" viewBox="0 0 25 25"  className={likeClass}  onClick={handleLike} xmlns="http://www.w3.org/2000/svg" >
                <path fillRule="evenodd" clipRule="evenodd" d="M10.9932 3.13581C8.9938 0.798402 5.65975 0.169642 3.15469 2.31001C0.64964 4.45038 0.29697 8.029 2.2642 10.5604C3.89982 12.6651 8.84977 17.1041 10.4721 18.5408C10.6536 18.7016 10.7444 18.7819 10.8502 18.8135C10.9426 18.8411 11.0437 18.8411 11.1361 18.8135C11.2419 18.7819 11.3327 18.7016 11.5142 18.5408C13.1365 17.1041 18.0865 12.6651 19.7221 10.5604C21.6893 8.029 21.3797 4.42787 18.8316 2.31001C16.2835 0.192162 12.9925 0.798402 10.9932 3.13581Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="pr-2">{likeStatus.likeCount}</p>
        </div>
    )
}

export default Like