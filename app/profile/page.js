'use client'

import { useState, useEffect } from 'react' ;
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation' ;
import Profile from '../../components/Profile'

const MyProfile = () => {
    const [myPostArray,setMyPostArray]=useState([])

    const {data:session}= useSession()
    const router = useRouter();

    const handleEdit = (post)=>{
        router.push(`/edit-prompt?id=${post._id}`)
    }
    const handleDelete = async ()=>{

    }

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json()

            setMyPostArray(data.flat())
        }
        if (session?.user.id) fetchPosts()
    },[])
    return (
        <Profile
        name={'my'}
        desc={'Welcome to your personalized profile page UwU'}
        data={myPostArray}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
    )
}

export default MyProfile