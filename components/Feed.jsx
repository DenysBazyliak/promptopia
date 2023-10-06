"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PromptCard from "./PromptCard";
import { match } from "assert";

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
  const [filteredPostArray, setFilteredPostArray] = useState(null);
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
        <form className={"relative w-full    flex-center"}>
          <input
            {...register("prompt", {
              required: true,
              onChange: (e) => {
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
            className={
              "px-4 py-2 rounded form-input bg-gray-100 w-full placeholder:text-center"
            }
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
