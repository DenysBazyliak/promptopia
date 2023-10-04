"use client";

import FormWrapper from "../../components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();

  async function createPrompt(post) {
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return <FormWrapper type={"Create"} onPromptSubmit={createPrompt} />;
};
export default CreatePrompt;
