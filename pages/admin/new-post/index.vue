<template>
  <div class="admin-new-post-page">
    <div class="new-post-form">
      <AdminPostForm @submit="onSubmited" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  methods: {
    onSubmited(postData) {
      axios
        .post("https://nuxt-app-8eb25.firebaseio.com/posts.json", postData)
        .then(res => console.log(res))
        .catch(e => console.log(e));
    }
  }
};
</script>
