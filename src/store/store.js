import { defineStore } from "pinia";

export const useStore = defineStore('users', {
    state: () => ({
        name: '',
        email: '',
        password: '',
        uid:''
    })
})