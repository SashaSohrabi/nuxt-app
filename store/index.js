import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );

        state.loadedPosts[postIndex] = editedPost;
      }
    },

    actions: {
      nuxtServerInit(vuexContex, context) {
        return axios
          .get("https://nuxt-app-8eb25.firebaseio.com/posts.json")
          .then(res => {
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }

            vuexContex.commit("setPosts", postsArray);
          })
          .catch(e => context.error(e));
      },

      addPost(vuexContex, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        return axios
          .post("https://nuxt-app-8eb25.firebaseio.com/posts.json", createdPost)
          .then(res => {
            vuexContex.commit("addPost", { ...createdPost, id: res.data.name });
          })
          .catch(e => console.log(e));
      },

      editPost(vuexContex, editedPost) {
        return axios
          .put(
            `https://nuxt-app-8eb25.firebaseio.com/posts/${editedPost.id}.json`,
            editedPost
          )
          .then(res => {
            vuexContex.commit("editPost", editedPost);
          })
          .catch(e => console.log(e));
      },

      setPosts(vuexContex, posts) {
        vuexContex.commit("setPosts", posts);
      }
    },

    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
