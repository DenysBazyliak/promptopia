'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

import Form from "../../components/Form";


const EditPrompt = () => {
    const [promptValues, setPromptValues] = useState({})

    const router = useRouter();

    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    console.log('promptId', promptId)

    async function editePrompt(data) {
        try {
            const response = await fetch(`/api/prompt/${promptId}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        prompt: data.prompt,
                        userId: promptId,
                        tag: data.tag
                    })
                }
            )
            console.log('response', response)
            if (response.ok) {
                router.push('/')
            }

        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            setPromptValues({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if (promptId) getPromptDetails()
    }, [promptId])
    return (
        <Form
            type={'Edit'}
            promptValues={promptValues}
            promptId={promptId}
            onPromptSubmit={editePrompt}
        />
    )
}

export default EditPrompt