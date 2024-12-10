"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import ProfilePostCard from "./ProfilePostCard"
import { profile } from "console"

type ProfileDataType = {
    username: string;
    avatar: string;
    bio: string;
}

type FullProfileDataType = {
    profileData: ProfileDataType;
    followerCount: number;
    isFollowed: boolean
}

type PostTypeProfile = {
    id: number | bigint
    user_id: number
    content: string
    created_at: string
    updated_at: string
    _count: { 
        likes: number,
        comments: number
    }
}

type UserPostsType = {
    userPosts: PostTypeProfile[]
}

const imageLoader = (src: string | undefined, width?: number, quality?: number) => {
    return `${src}?w=${width}&q=${quality}`;
  };

export default function Profile () {

    const [ profileData, setProfileData ] = useState<FullProfileDataType | null>(null)
    const [ userPosts, setUserPosts ] = useState<UserPostsType>({ userPosts: [] })

    const urlParams = useParams<{ id: string }>();
    const profile_id = urlParams.id;

    const getProfileInfos = async (token: string) => {
        const response = await fetch(`/api/profile/${profile_id}`, {
            headers: {
                authorization: `Bearer ${token}`
              },
        })
        const profileData = await response.json()
        setProfileData(profileData)
    }

    const getAllPosts = async (token: string) => {
        const response = await fetch(`/api/user-posts/${profile_id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const userPosts = await response.json()
        setUserPosts(userPosts)
    }

    const handleFollow = async () => {
        try {

            if (profileData?.isFollowed) {
                await fetch(`/api/unfollow/${profile_id}`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${Cookies.get('token')}`
                    }
                })
                setProfileData(prev => ({...prev as FullProfileDataType, isFollowed : false}))
                return
            } 

            if (profileData?.isFollowed == false) {
                await fetch(`/api/follow/${profile_id}`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${Cookies.get('token')}`
                    }
                }) 
                setProfileData(prev => ({...prev as FullProfileDataType, isFollowed : true}))
                return
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (Cookies.get('token')) {
            getProfileInfos(Cookies.get('token') as string)
            getAllPosts(Cookies.get('token') as string)
        }
    }, [])

    return (
        <>
        {profileData &&
            <div className="flex flex-col justify-between gap-8 py-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-quicksand font-bold text-3xl text-right">{profileData.profileData.username}</h2>
                    <Image
                        loader={() => imageLoader(profileData.profileData.avatar)}
                        height={80}
                        width={80}
                        src={profileData.profileData.avatar}
                        alt=""
                        priority
                        className="rounded-full"
                         />
                </div>
                <h3 className="font-bold">{profileData.profileData.bio}</h3>
                <h4 className="text-gray-600">{profileData.followerCount} {profileData.followerCount > 1 ? "followers" : "follower"}</h4>
                <Button onClick={handleFollow} className="bg-black text-white text-md">{profileData.isFollowed ? "Unfollow" : "Follow"}</Button>
            </div>
        }
        <div className="flex flex-col gap-3 w-full">
        {userPosts.userPosts && 
            userPosts.userPosts.map((post, index) => (
                <ProfilePostCard key={index} post={post} profileData={profileData?.profileData}/>
            ))
        }
        </div>
        </>
    )
}
