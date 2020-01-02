<template>
  <div class="single-post-page">
    <section class="post">
      <h1>Title of the Post</h1>
      <div class="post-details">
        <div>Last updated on XXX</div>
        <div>Written by Name</div>
      </div>
      <p>Content of the post</p>
    </section>
    <section class="post-feedback">
      <p>
        Let me know what you think about the post, send an email to
        <a href="mailto:feedback@my-awesome-domain.com"
          >feedback@my-awesome-domain.com</a
        >
      </p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;

  .post {
    width: 100%;
    @media (min-width: 768px) {
      width: 600px;
      margin: auto;
    }
  }

  .post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .post-feedback {
    a {
      color: red;
      text-decoration: none;
      &:hover,
      &:active {
        color: salmon;
      }
    }
  }
  .post-title {
    margin: 0;
  }

  .post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
  }
}
</style>
