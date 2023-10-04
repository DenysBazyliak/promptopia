'use client'
import Form from "../../components/Form";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

const EditPrompt=()=>{
    const [promptValues, setPromptValues]= useState({})


    const searchParams = useSearchParams()
    const promptId  = searchParams.get('id')
    console.log('promptId',promptId)

    useEffect(()=>{
        const getPromptDetails = async ()=> {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            setPromptValues({
                prompt:data.prompt,
                tag:data.tag
            })
        }

        if(promptId) getPromptDetails()
    },[promptId])
    return (
        <Form
            type={'Edit'}
            promptValues={promptValues}
            promptId={promptId}
        />
    )
}

export default EditPrompt