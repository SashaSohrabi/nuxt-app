<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  data() {
    return {
      loadedPost: {
        author: "Sasha",
        title: "My test post",
        content: "Super amazing, thanks for that!",
        thumbnailLink:
          "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
      }
    };
  }
};
</script>