<template>
    <button @click="logout">Logout</button>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
// import { ref, onMounted, onBeforeMount, onActivated } from 'vue'

export default {
    setup() {
        const store = useStore();
        const router = useRouter();

        const logout = async () => {
            try {
                await store.dispatch('logout');
                router.push('/login');
            } catch (error) {
                console.error('Error logging out: ', error);
            }
        };
        return {
            logout
        };
    }
};
</script>