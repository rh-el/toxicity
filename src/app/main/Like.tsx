import { useState } from "react"
import React from 'react';
import { useCallback, useState, useRef, useEffect, createRef } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

type Props = {
    postId: number,
    handleLike: (id: number) => void
    likeStatus: boolean
}

const Like = ({ postId, handleLike, likeStatus }: Props) => {
    const container = useRef<HTMLDivElement | null>(null)
    const likeClass = `like-icon-${postId}`

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
                delay: 0.1            
            })

    });

    useEffect(() => {
        if (likeStatus) {
            colorLike('#ff0000', 0.5)
        } else {
            colorLike('#000000', 1)
        }
    }, [])

    const handleLikeColor = () => {
        handleLike(postId)
        if (!likeStatus) {
            colorLike('#ff0000', 0.5) 
        } else {
            colorLike('#000000', 1)
        }
    }

    return (
        <div ref={container} >
            <svg className={likeClass}  onClick={handleLikeColor} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.9932 3.13581C8.9938 0.798402 5.65975 0.169642 3.15469 2.31001C0.64964 4.45038 0.29697 8.029 2.2642 10.5604C3.89982 12.6651 8.84977 17.1041 10.4721 18.5408C10.6536 18.7016 10.7444 18.7819 10.8502 18.8135C10.9426 18.8411 11.0437 18.8411 11.1361 18.8135C11.2419 18.7819 11.3327 18.7016 11.5142 18.5408C13.1365 17.1041 18.0865 12.6651 19.7221 10.5604C21.6893 8.029 21.3797 4.42787 18.8316 2.31001C16.2835 0.192162 12.9925 0.798402 10.9932 3.13581Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    )
}

export default Like