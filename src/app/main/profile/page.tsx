"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"

type ProfileDataType = {
    username: string;
    avatar: string;
    bio: string;
    followersNumber: string;
}

export default function Profile () {

    const [ profileData, setProfileData ] = useState<ProfileDataType | null>(null)

    const getProfileInfos = async (token: string | undefined) => {
        const response = await fetch('/api/profile', {
            headers: {
                authorization: `Bearer ${token}`
              },
        })
        const profileData = await response.json()
        setProfileData(profileData)
        console.log(profileData)
    }

    useEffect(() => {
        getProfileInfos(Cookies.get('token'))
    })

    return <div>profile page</div>
}