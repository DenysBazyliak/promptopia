'use client'

import {useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Form from '../../components/Form'

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const createPrompt = async (e) => {

    }
    return (
        <Form
            type={'Create'}
            post={post}
            submitting={submitting}
            setPost={setPost}
            setSubmitting={setSubmitting}
            handleSubmit={createPrompt}
        />
    )


}
export default CreatePrompt