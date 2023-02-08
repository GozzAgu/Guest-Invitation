<template>
    <div class="overlay" @click="close"></div>
    <div class="mod shadow-lg card p-3 col-8 col-lg-4 ms-auto me-auto">
        <div class="d-flex mb-2">
            <h5 class="mt-2 ms-3 mb-3">Guest code</h5>
            <i @click="close" class="close ri-close-circle-line fs-3 ms-auto me-3 mb-3"></i>
        </div>
        <div class="d-flex mb-3">
            <input id="input" placeholder="Guest name..." class="col-5 ms-auto me-auto mb-3" v-model="newVisitor.name"/>
            <select id="input" v-model="selected" class="col-5 ms-auto me-auto mb-3"> 
                <option value="" disabled selected hidden>Gender</option>
                <option v-for="option in options" :key="option">{{ option.text }}</option>
            </select>
        </div>
        <n-button @click="getCode" type="button" id="btn" class="btn btn-success ms-auto me-auto mb-4">Invite</n-button>
    </div> 
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { NButton } from 'naive-ui'

const emit = defineEmits(['onSubmit', 'close'])

const code = ref('');

const selected = ref('')

const options = ref([
    {
        id: 1,
        text: 'Male'
    },
    {
        id: 2,
        text: 'Female'
    }
])
const newVisitor = ref({
    name: '',
    code: '',
    gender: '',
    time: ''
});

const getTime = () => {
    const date =  ref(new Date());
    const time = ref(date.value.getHours() + ':' + date.value.getMinutes() + ':' + date.value.getSeconds());
    return time
};

const getCode = () => {
    if(newVisitor.value.name.length > 2) {
        code.value = Math.floor(Math.random() * 10000) + 1;
        newVisitor.value.code = code.value;
        newVisitor.value.time = getTime();
        newVisitor.value.gender = selected.value;
    
        emit('onSubmit', newVisitor.value);
        emit('close')
    } else {
        alert('Please input something')
    }
}

const close = () => {
    emit('close')
}
</script>

<style scoped lang="scss">

.overlay{
    position: fixed;
    background-color:rgba(37, 39, 51, 0.2);
    left: 0;
    width: 100%;
    height: 100vh;
    top: 0;
    z-index: 1;
    cursor: pointer;
}
.mod {
    background-color: white;
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation-name: animatetop;
    animation-duration: 0.7s
}

@keyframes animatetop {
  from {top: -250px; opacity: 0}
  to {top: 350px; opacity: 1}
}

#input {
    outline: none;
    border: none;
    background-color: rgb(240, 240, 240);
}

#input:hover {
    outline: none;
    border: 1px solid rgb(109, 214, 109);
}

#input:focus {
    outline: none;
    border: none;
    border-bottom: 2px solid rgb(109, 214, 109);
}

// #btn {
//     background-color: rgb(109, 214, 109);
//     border: none;
// }

// #btn:hover {
//     background-color: rgb(78, 163, 78);
//     border: none;
// }

.close {
    cursor: pointer;
}
</style>
