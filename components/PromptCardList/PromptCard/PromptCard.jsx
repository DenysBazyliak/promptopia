"use client";

import {useContext, useState} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import HighlightedText from "../../../helpers/HighlightedText";
import {KeywordContext} from "../../../contexts/KeywordContextProvider";

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete
}) => {
  const [copied, setCopied] = useState(false);
  const pathName = usePathname();
  const { data: session } = useSession();

  const {keyword}=useContext(KeywordContext)

  const username = post.creator.username;
  const prompt = post.prompt;
  const tag = post.tag;

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={"prompt_card"}>
      <div className={"flex justify-between items-start gap-5"}>
        <div
          className={
            "flex-1 flex justify-start items-center gap-3 cursor-pointer"
          }
        >
          <Image
            src={post.creator.image}
            alt={"user_image"}
            width={40}
            height={40}
            className={"rounded-full object-contain"}
          />
          <div className={"flex flex-col"}>
            <h3 className={"font-satoshi font-semibold text-gray-900"}>
              <HighlightedText text={username} keywords={keyword}>
                {username}
              </HighlightedText>
            </h3>

            <p className={"font-inter text-sm text-gray-500"}>
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className={"copy_btn"} onClick={handleCopy}>
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt={"copy_text"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className={"my-4 font-satoshi text-sm text-gray-700"}>
        <HighlightedText text={prompt} keywords={keyword}>
          {prompt}
        </HighlightedText>
      </p>
      <p
        className={"font-inter text-sm blue_gradient cursor-pointer"}
        onClick={() => handleTagClick && handleTagClick(tag)}
      >
        <HighlightedText text={tag} keywords={keyword}>{tag}</HighlightedText>
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className={"mt-5 flex-center gap-4 border-t border-gray-100 pt-3"}>
          <p
            className={"font-inter text-sm green_gradient cursor-pointer"}
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className={"font-inter text-sm orange_gradient cursor-pointer"}
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
