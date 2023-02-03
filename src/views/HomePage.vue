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

        <CodeModal v-if="showModal" @close="showModal = false"/>

        <!-- <n-modal
            :style="{ width: '70%' }"
            v-model:show="showModal"
            preset="dialog"
            title="Dialog"
            positive-text="Invite"
            @positive-click="getCode"
        >
            <template #header>
                <div class="mt-2">Guest Details</div>
            </template>
            <div class="mt-5">
                <n-space vertical>
                    <n-input v-model:value="newVisitor.name" type="text" placeholder="Guest name"/>
                    <n-select
                    placeholder="Gender"
                    :options="selectOptions"
                    v-model:value="selectOptions.value"
                    />
                </n-space>
            </div>
        </n-modal> -->

        <n-card>
            <n-row class="mb-3">
            <n-col :span="12">
            <n-statistic label="Total Guests">
                <template #prefix>
                    <i class="ri-user-fill"></i>
                </template>
                <template #suffix>
                    {{ visitors.length }}
                </template>
            </n-statistic>
            </n-col>

            <n-col :span="12">
               
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
    
const showModal = ref(false);
// const selectOptions = ref([
//     {
//         label: 'male',
//         value: 'male'
//     },
//     {
//         label: 'female',
//         value: 'female'
//     }
// ]);
const checked = ref([]);
// const code = ref('');

// const getTime = () => {
//     const date =  ref(new Date());
//     const time = ref(date.value.getHours() + ':' + date.value.getMinutes() + ':' + date.value.getSeconds());
//     return time
// };

// const getCode = () => {
//     if(newVisitor.value.name.length > 2) {
//         code.value = Math.floor(Math.random() * 10000) + 1;
//         newVisitor.value.code = code.value;
//         newVisitor.value.time = getTime();
//         newVisitor.value.gender = selectOptions.value.value;

//         visitors.value.push(newVisitor.value);
//         newVisitor.value = ''
//     }
// }
const search = ref('');
// const newVisitor = ref({
//     name: '',
//     code: '',
//     gender: '',
//     time: ''
// });

const visitors = ref([]);

const isLoggedIn = ref(false);
const router = useRouter();
const store = useStore();

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

const filterVisitors = computed(() => {
    return visitors.value.filter((visitor) => {
        return visitor.name.match(search.value);
    });
});
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
</style>