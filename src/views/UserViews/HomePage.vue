<template>
    <div class="container">
        <div class="row col-12 col-lg-6 ms-auto me-auto mb-4">
            <div class="card p-2 mt-5 shadow">
                <figure class="p-3 mb-0">
                    <blockquote class="blockquote">
                        <img class="logo mb-3" src="@/assets/logo.png" />
                        <p>Welcome, {{ store.name }} </p>
                    </blockquote>
                </figure>
                <div v-if="isLoggedIn">
                    <n-button  strong secondary round type="success" class="mb-4 col-4" @click="handlesignOut">
                        Sign Out
                    </n-button>
                </div>

                <div  v-else>
                    <router-link class="link" to="/signin">
                        <n-button strong secondary round type="success" class="mb-4 col-4">
                            Sign In
                        </n-button>
                    </router-link>
                </div>
            </div>
        </div>
         <n-button strong secondary round type="success" class="mb-4" @click="showModal = true"> 
            NEW GUEST 
        </n-button>

        <CodeModal v-if="showModal" @close="showModal = false" @onSubmit="addNewVisitor" />

        <n-card class="bg-light">
            <n-row class="mb-3">
                <n-col :span="8">
                    <n-statistic label="Total Guests">
                        <template #prefix>
                            <i class="ri-user-fill"></i>
                        </template>
                        <template #suffix>
                            {{ visitors.length }}
                        </template>
                    </n-statistic>
                </n-col>

                <n-col :span="8">
                    <n-statistic label="Convey Guest">
                        <template #prefix>
                            <i @click="conveyVisitor" class="convey ri-user-shared-line"></i>
                        </template>
                    </n-statistic>
                </n-col>

                <n-col :span="8">
                    <n-statistic label="Selected Guests">
                        <template #prefix>
                            <i class="ri-user-follow-fill"></i>
                        </template>
                        {{checked.length}}
                    </n-statistic>
                </n-col>
            </n-row>
        </n-card>

        <div class="mt-4 bg-light p-2">
            <div class="head">
                <h3 class="mt-3 mb-4 text-start"><i class="ri-draft-line"></i> Guest Log </h3>

                <n-space class="mt-4" vertical>
                    <n-input v-model:value="search" placeholder="Search for guest" />
                </n-space>
            </div>
            <div class="mt-1 shadow">
                <table class="table table-striped table-hover">
                    <thead class="bg-secondary text-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Code</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody v-for="(visitor, index) in filterVisitors" :key="visitor">
                        <tr class="mb-5">
                            <td class="pt-3"><input :value="visitor" v-model="checked" type="checkbox"/></td>
                            <td class="pt-3">{{ visitor.name }}</td>
                            <td class="pt-3">{{ visitor.code }}</td>
                            <td class="pt-3">{{ visitor.gender }}</td>
                            <td class="pt-3">{{ visitor.time}}</td>
                            <td> <button class="btn" @click="del(index)"><i class="ri-delete-bin-6-fill fs-9 text-danger"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <footer>

    </footer>
</template>

<script setup>
import { useStore } from '@/store/store';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';
import { NButton, NInput, NSpace, NRow, NCol, NStatistic, NCard } from 'naive-ui'
import CodeModal from '@/components/CodeModal.vue';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/main.js';

const showModal = ref(false);
const checked = ref([]);
const search = ref('');
const visitors = ref([]);
const isLoggedIn = ref(false);
const router = useRouter();
const store = useStore();

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user) {
            isLoggedIn.value = true;
            console.log(user.email)
        } else {
            isLoggedIn.value = false;
        }
    });
});

onMounted(async() => {
    const querySnapshot = await getDocs(collection(db, 'visitors'));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data())
        visitors.value.push(doc.data())
    })
})
    
const handlesignOut = () => {
    signOut(auth)
    .then(() => {
        router.push('/signin');
    })
};

const del = async(index) => {    
    if(index > -1) {
        visitors.value.splice(index, 1);
        checked.value.splice(index, 1);
    }
}

const addNewVisitor = async(newVisitor) => {
    console.log(newVisitor)
    const docRef = await addDoc(collection(db, "visitors"), {
        ...newVisitor
    });
    visitors.value.push(newVisitor)
    
    console.log(docRef)
    console.log("Document written with ID: ", docRef.id);
}

const filterVisitors = computed(() => {
    return visitors.value.filter((visitor) => {
        return visitor.name.match(search.value);
    });
});

const conveyVisitor = () => {
    if(checked.value) {
        alert('visitor(s) sent' + ' : ' + checked.value.length)
    }
}

</script>

<style scoped lang="scss">
.logo {
    width: 50px;
}

.head {
    display: flex;
    justify-content: space-between;
}

.search-div {
    border-radius: 30px;
    margin-top: 50px;
    height: 32px;
    width: 50%;
    .search {
        border-radius: 30px;
        width: 100%;
        border: none;
        height: 30px;
    }
    .search:focus {
        border-radius: 30px;
        width: 100%;
        outline: none;
        height: 30px;
    }
}

.link {
    text-decoration: none;
}

.convey {
    cursor: pointer;
}
</style>