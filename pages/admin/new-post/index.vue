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
  middleware: "auth",
  components: {
    AdminPostForm
  },
  methods: {
    onSubmited(postData) {
      this.$store.dispatch("addPost", postData).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>
