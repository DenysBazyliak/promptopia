"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "../helpers/clsx-tw-merge";

import PromptCard from "./PromptCard";

const Feed = ({ cssProps='' }) => {
  const [postArray, setPostArray] = useState([]);
  const [filteredPostArray, setFilteredPostArray] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPostArray(data.flat());
    };
    fetchPosts();
  }, []);
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  console.log("filteredPostArray", filteredPostArray);
  return (
    <>
      <section>
        <form className={"relative form_width flex-center"}>
          <input
            {...register("prompt", {
              required: true,
              onChange: (e) => {
                setKeyword(() => e.target.value);
                return e.target.value === ""
                  ? setFilteredPostArray(null)
                  : setFilteredPostArray(
                      postArray?.filter((post) => {
                        let regex = new RegExp(e.target.value, "gi");
                        return (
                          post.creator.username +
                          " " +
                          post.prompt +
                          " " +
                          post.tag
                        ).match(regex)
                          ? post
                          : false;
                      })
                    );
              },
            })}
            type="text"
            placeholder={"Search for a tag or a prompt"}
            className={cn(
              "px-4 py-2 rounded form-input bg-gray-100 w-full placeholder:text-center focus:bg-gray-100",
              cssProps
            )}
          />
        </form>

        <PromptCardList
          posts={filteredPostArray ? filteredPostArray : postArray}
          handleTagClick={() => {}}
          keyword={keyword}
        />
      </section>
    </>
  );
};

const PromptCardList = ({ posts, handleTagClick, keyword }) => {
  return (
    <div className={"mt-16 prompt_layout"}>
      {posts.map((post) => (
        <PromptCard
          key={post?._id}
          post={post}
          handleTagClick={handleTagClick}
          keyword={keyword}
        />
      ))}
    </div>
  );
};

export default Feed;
