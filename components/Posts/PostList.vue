<template>
  <section class="post-list">
    <PostPreview
      id="1"
      thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
      title="Title of the first post"
      previewText="First post!"
    />
    <PostPreview
      id="2"
      thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
      title="Title of the second post"
      previewText="Second post!"
    />
    <PostPreview
      id="3"
      thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
      title="Title of the third post"
      previewText="Third post!"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";
export default {
  components: {
    PostPreview
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>