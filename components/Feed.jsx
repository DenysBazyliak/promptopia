"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PromptCard from "./PromptCard";

const PromptCardList = ({ posts, handleTagClick }) => {
  return (
    <div className={"mt-16 prompt_layout"}>
      {posts.map((post) => (
        <PromptCard
          key={post?._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [postArray, setPostArray] = useState([]);
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
  return (
    <>
      <section>
        <form className={"relative w-full    flex-center"}>
          <input
            {...register("prompt", {
              required: true,
              onChange: (e) => {},
            })}
            type="text"
            placeholder={"Search for a tag or a username"}
            className={
              "px-4 py-2 rounded form-input bg-gray-100 w-full placeholder:text-center"
            }
          />
        </form>

        <PromptCardList posts={postArray} handleTagClick={() => {}} />
      </section>
    </>
  );
};
// useState()
// useEffect()
export default Feed

