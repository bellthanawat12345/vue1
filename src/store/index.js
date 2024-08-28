import { createStore } from 'vuex';
import { auth } from '../firebase';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";



export default createStore({
    state: {
      user: null
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
      }
    },
    actions: {
      async login({ commit }, { email, password }) {
        try {
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          commit('setUser', user);
        } catch (error) {
          throw error;
        }
      },
      async logout({ commit }) {
        try {

          await signOut(auth);
          commit('setUser', null);
        } catch (error) {
          throw error;
        }
      },
      fetchUser({ commit }) {
        onAuthStateChanged(auth, user => {
          commit('setUser', user);
        });
      }
    },
    getters: {
      user: state => state.user,
      isAuthenticated: state => !!state.user
    }
  });