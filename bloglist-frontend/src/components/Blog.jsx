import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import blogService from "../services/blogs";
import styles from "../styles/blog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const likeBlogMutation = useMutation({
    mutationFn: blogService.like,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleLike = () => {
    try {
      const newblog = {
        ...blog,
      };
      likeBlogMutation.mutate(newblog);
    } catch (error) {
      console.log("Failed to update likes", error);
    }
  };

  return (
    <div className={styles["blog"]}>
      <img src={`https://picsum.photos/id/4/5000/3333`} />
      <div className={styles["blog-main"]}>
        <p className={styles["blog-title"]}>{blog.title}</p>
        <p className={styles["content"]}>{blog.content}</p>
      </div>
      <div className={styles["act-container"]}>
        <Link id={styles["readmore"]} to={`/blogs/${blog.id}`}>
          Read More
        </Link>
      </div>
      <div className={styles["metrics"]}>
        <div className={styles["author"]}>
          <FontAwesomeIcon icon={faUser} style={{ color: "#5a67d8" }} />

          <p>{blog.user.username}</p>
        </div>
        <div id={styles["interactions"]}>
          {/* <div onClick={handleLike} id={styles["like"]}>
            <FontAwesomeIcon icon={faThumbsUp} /> {blog.likes}
          </div> */}
          <div
            onClick={() => navigate(`/blogs/${blog.id}`)}
            id={styles["comment"]}
          >
            <FontAwesomeIcon icon={faComment} /> {blog.comments.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
