import PromptCard from "./PromptCard/PromptCard";

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

export default PromptCardList