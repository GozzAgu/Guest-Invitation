<template>
    <div class="bg">
        <div>
            <i class="ri-community-fill fs-1 text-success"></i>
        </div>
        <form @submit.prevent="signIn" class="form">
            <h1 class="h1 mb-3 fw-normal">Sign In</h1>
            <div class="name">
                <input v-model="store.name" placeholder="Your name..." type="text" class="form-control">
                <input v-model="store.email" placeholder="Your email @.com..." type="email" class="form-control">
                <input v-model="store.password" placeholder="Your password..." type="password" class="form-control">
            </div>

            <button class="w-100 btn btn-sm btn-info text-light" type="submit">
                Sign In 
            </button>
            <router-link to="/signup">
                <button class="w-100 btn btn-sm btn-info text-light" type="submit">
                    Don't have an account ?
                </button>
            </router-link>
            <router-link to="/forgot">
                <p>Forgot password? </p>
            </router-link>
            <p v-if="errorText" class="error">{{errorText}}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from '@/store/store';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth'

const router = useRouter();
const store = useStore();
const errorText = ref(false);

const signIn = () => {
    const auth = getAuth(); 
    console.log('initialized firebase')

    signInWithEmailAndPassword(auth, store.name, store.email, store.password)
    .then((data) => {
        console.log(data);
        console.log(auth.currentUser);
        router.push('/home');
    })
    .catch((e) => {
        console.log(e.code);
        // switch(e.code) {
        //     case 'auth/invalid-email':
        //         errorText.value = 'Invalid email';
        //         break;
        //     case 'auth/user-not-found':
        //         errorText.value = 'No User';
        //         break;
        //     case 'auth/wrong-password':
        //         errorText.value = 'Incorrect password';
        //         break;
        //     default:
        //         errorText.value = 'Incorrect email or password';
        //         break;
        // }
    });

    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        return signInWithEmailAndPassword(auth, store.name, store.email, store.password);
    })
    .catch(() => {
        console.log('error')
    });
};
</script>

<style scoped lang="scss">
.bg {
    background-color: rgb(209, 209, 209);
    height: 1000px;
    .logo {
        width: 100px;
        padding-top: 100px;
    }
    form {
        margin: 0 auto;
        padding-top: 50px;
        width: 300px;
        height: 200px;
        input {
            width: 100%;
            margin-bottom: 30px;
            margin-top: 30px
        }
        button {
            width: 100%;
            margin-bottom: 30px;
        }
        .error {
            color: red;
        }
    }
}

</style>