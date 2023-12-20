<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const $router = useRouter();

const email = ref('');
const password = ref('');

const login = async ()=>{
    try{
        const res = await axios.post('http://localhost:3000/api/users/login'
        ,
        {
            email : email.value,
            password : password.value
            },
            {
                withCredentials: true
            } )
            console.log(res);
            alert('Login Success');
            $router.push('/Transfer');
        } catch (e){
            alert(e.message);
        }
    }
</script>

<template>
    Login
    <form @submit.prevent="login">
        <input type="text" v-model="email">
        <input type="password" v-model="password">
        <button>Login</button>
    </form>
</template>