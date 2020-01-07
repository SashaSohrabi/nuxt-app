<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";
export default {
  components: {
    PostList
  },
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
        loadedPosts: [
          {
            id: "1",
            title: "First Post",
            previewText: "This is the first post",
            thumbnail:
              "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
          },
          {
            id: "2",
            title: "Second Post",
            previewText: "This is the second post",
            thumbnail:
              "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
          },
          {
            id: "3",
            title: "Third Post",
            previewText: "This is the third post",
            thumbnail:
              "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
          }
        ]
      });
    }, 1000);
  }
};
</script>

<style scoped>
</style>