<template>
  <div class="admin-new-post-page">
    <div class="new-post-form">
      <AdminPostForm />
    </div>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  layout: "admin",
  components: {
    AdminPostForm
  }
};
</script>

