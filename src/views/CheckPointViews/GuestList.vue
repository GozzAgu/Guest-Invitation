<template>
    <div class="container">
        <div class="mt-4 bg-light p-2">
            <div class="head">
                <h3 class="mt-3 mb-4 text-start"><i class="ri-draft-line"></i> GUESTS </h3>

                <n-space class="mt-4" vertical>
                    <n-input v-model:value="search" placeholder="Search for guest" />
                </n-space>
            </div>
            <div class="mt-1 shadow">
                <table class="table table-striped table-hover">
                    <thead class="bg-secondary text-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Code</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody v-for="(visitor) in filterVisitors" :key="visitor">
                        <tr class="mb-5">
                            <td class="pt-3">{{ visitor.name }}</td>
                            <td class="pt-3">{{ visitor.code }}</td>
                            <td class="pt-3">{{ visitor.gender }}</td>
                            <td class="pt-3">{{ visitor.time}}</td>
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
import { NInput, NSpace } from 'naive-ui'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/main.js';
import { ref, onMounted, computed } from 'vue'

const visitors = ref([]);
const search = ref('');

onMounted(async() => {
    const querySnapshot = await getDocs(collection(db, 'visitors'));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data())
        visitors.value.push(doc.data())
    })
});

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