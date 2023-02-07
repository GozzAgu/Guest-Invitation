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
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Code</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <!-- <tbody v-for="(visitor, index) in filterVisitors" :key="visitor">
                        <tr class="mb-5">
                            <td class="pt-3"><input :value="visitor" v-model="checked" type="checkbox"/></td>
                            <td class="pt-3">{{ visitor.name }}</td>
                            <td class="pt-3">{{ visitor.code }}</td>
                            <td class="pt-3">{{ visitor.gender }}</td>
                            <td class="pt-3">{{ visitor.time}}</td>
                            <td> <button class="btn" @click="del(index)"><i class="ri-delete-bin-6-fill fs-9 text-danger"></i></button></td>
                        </tr>
                    </tbody> -->
                </table>
            </div>
        </div>
    </div>
    <footer>

    </footer>
</template>

<script setup>
import { NInput, NSpace } from 'naive-ui'
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