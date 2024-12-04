import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import useStyles from "./styles";
import Post from "../Posts/Post/Post";

const MostLikedPosts = ({ setCurrentId }) => {
  const { allPosts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [mostLikedPosts, setMostLikedPosts] = useState([]);

  // Set items to allPosts
  useEffect(() => {
    setItems(allPosts);
  }, [isLoading, allPosts]);

  // Quick sort algorithm to sort posts by most liked
  const quickSort = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[arr.length - 1].likes.length;
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].likes.length < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...quickSort(left), arr[arr.length - 1], ...quickSort(right)];
  };

  // Set mostLikedPosts to the top 4 most liked posts
  useEffect(() => {
    if (items.length > 0) {
      const sortedItems = quickSort(items);
      const mostLiked = sortedItems.slice(-4).reverse(); // Get the top 4 most liked posts
      setMostLikedPosts(mostLiked);
    }
  }, [items]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {mostLikedPosts?.map((posts) => (
        <Grid key={posts._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={posts} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MostLikedPosts;
