import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Changed from useHistory

function Home() {
  const navigate = useNavigate(); // Changed from let history = useHistory
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    axios.get("http://localhost:3001/posts")
      .then((response) => {
        if (isMounted) {
          setListOfPosts(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        return (
          <div
            className="post"
            key={key}
            onClick={() => {
              navigate(`/post/${value.id}`); // Changed from history.push
            }}
          >
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
