'use client'

import {useForm} from "react-hook-form";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

function Form({type, promptValues, promptId}) {

    const router = useRouter()
    console.log('promptValues',promptValues)


    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
        watch,
        setValue
    } = useForm({
        defaultValues:{
            prompt:promptValues.prompt,
            tag:promptValues.tag,
        }
    })

    useEffect(() => {
        if (promptValues) {
            setValue("prompt",promptValues.prompt);
            setValue("tag",promptValues.tag);
        }
    }, [promptValues]);
    const onSubmit = async (data) => {
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
        reset()
    }
    console.log('watch',watch())

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={'mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'}>

                <label>
                    <span className={'font-satoshi font-semibold text-base text-gray-700 mr-5'}>
                        Your AI Prompt
                    </span>
                </label>
                <textarea {...register('prompt', {required: "Prompt is required"})}
                          placeholder={"Enter your Prompt"} className={'px-4 py-2 rounded form-input bg-gray-100'}/>
                <label>
                    <span className={'font-satoshi font-semibold text-base text-gray-700 mr-5'}>
                        Tag
                    </span>
                </label>
                <input {...register('tag', {required: "Tag is required"})} type={'text'}
                       placeholder={"#tag"} className={'px-4 py-2 rounded form-input bg-gray-100'}/>
                <div className={'flex-end mx-3 mb-5 gap-4'}>
                    <Link href={'/'} className={'text-gray-500 text-sm'}>Cancel</Link>
                    <button disabled={isSubmitting} type="submit"
                            className={'px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white orange_button'}>{type}</button>
                </div>
            </form>
        </>
    )

}


const FormWrapper = ({type, promptValues, promptId}) => {
    return (
        <section className={'w-full max-w-full flex-start flex-col'}>
            <h1 className={'head_text text-left'}>
                <span className={"blue_gradient"}>
                     {type} Post
                </span>
            </h1>
            <p className={'desc text-left max-w-md'}>
                {type} and share tremendous prompts with the world, and let your imagination run wild with any
                AI-powered platform.
            </p>
            <Form promptValues={promptValues} type={type} promptId={promptId}/>
        </section>
    )
}

export default FormWrapper