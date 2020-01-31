import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
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
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
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
          .post(
            `https://nuxt-app-8eb25.firebaseio.com/posts.json?auth=${vuexContex.state.token}`,
            createdPost
          )
          .then(res => {
            vuexContex.commit("addPost", { ...createdPost, id: res.data.name });
          })
          .catch(e => console.log(e));
      },
      editPost(vuexContex, editedPost) {
        return axios
          .put(
            `https://nuxt-app-8eb25.firebaseio.com/posts/${editedPost.id}.json?auth=${vuexContex.state.token}`,
            editedPost
          )
          .then(res => {
            vuexContex.commit("editPost", editedPost);
          })
          .catch(e => console.log(e));
      },
      setPosts(vuexContex, posts) {
        vuexContex.commit("setPosts", posts);
      },
      authenticateUser(vuexContex, authData) {
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIkey}`;

        if (!authData.isLogin) {
          authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIkey}`;
        }
        return axios
          .post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            vuexContex.commit("setToken", res.data.idToken);
            localStorage.setItem("token", res.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
            );
            Cookie.set("jwt", res.idToken);
            Cookie.set(
              "expirationDate",
              new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
            );
          })
          .catch(e => console.log(e));
      },
      initAuth(vuexContex, req) {
        let expirationDate;
        let token;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));

          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          vuexContex.commit("clearToken");
        }
        vuexContex.commit("setToken", token);
      }
    },

    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  });
};

export default createStore;
