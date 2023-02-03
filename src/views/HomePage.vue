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
                <n-button v-if="isLoggedIn" strong secondary round type="success" class="mb-4" @click="handlesignOut">
                    Sign Out
                </n-button>
                <router-link class="link" to="/signin" v-else>
                    <n-button strong secondary round type="success" class="mb-4" @click="showModal = true">
                        Sign In
                    </n-button>
                </router-link>
            </div>
        </div>
         <n-button strong secondary round type="success" class="mb-4" @click="showModal = true"> 
            NEW GUEST 
        </n-button>

        <CodeModal v-if="showModal" @close="showModal = false" @onSubmit="addNewVisitor"/>

        <n-card>
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
        } else {
            isLoggedIn.value = false;
        }
    });
});
    
const handlesignOut = () => {
    signOut(auth)
    .then(() => {
        router.push('/signin');
    })
};

const del = (index) => {
    if(index > -1) {
        alert('Are you sure you want to delete guest?');
        visitors.value.splice(index, 1);
        checked.value.splice(index, 1);
    }
}

const addNewVisitor = (newVisitor) => {
    visitors.value.push(newVisitor)
}

const filterVisitors = computed(() => {
    return visitors.value.filter((visitor) => {
        return visitor.name.match(search.value);
    });
});

const conveyVisitor = () => {
    if(checked.value) {
        alert(checked.value.length + ' ' + 'visitors were sent to the security')
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