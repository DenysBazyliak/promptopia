"use client";

import {useContext, useEffect, useState} from "react";
import { useForm } from "react-hook-form";

import { cn } from "../helpers/clsx-tw-merge";

import PromptCardList from "./PromptCardList/PromptCardList";
import {KeywordContext} from "../contexts/KeywordContextProvider";

const Feed = ({ cssProps='' }) => {
  const [postArray, setPostArray] = useState([]);
  const [filteredPostArray, setFilteredPostArray] = useState(null);

  const {setKeyword}= useContext(KeywordContext)

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
              "px-4 py-2 my-4 rounded form-input bg-gray-100 w-full placeholder:text-center ",
              cssProps
            )}
          />
        </form>
          <PromptCardList
              posts={filteredPostArray ? filteredPostArray : postArray}
              handleTagClick={() => {}}
          />
      </section>
    </>
  );
};



export default Feed;
