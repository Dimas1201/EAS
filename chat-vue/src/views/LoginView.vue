<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="loginEmail">Email:</label>
      <input type="text" id="loginEmail" v-model="email">

      <label for="loginPassword">Password:</label>
      <input type="password" id="loginPassword" v-model="password">

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const $router = useRouter();

const email = ref('');
const password = ref('');
const loggedInUser = ref(null);

const login = async () => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/users/login',
      {
        email: email.value, // Ensure 'email' is defined here
        password: password.value,
      },
      {
        withCredentials: true,
      }
    );

    loggedInUser.value = res.data.user;
    console.log(res);
    alert('Login Success');
    $router.push('/Transfer');
  } catch (e) {
    alert(e.message);
  }
};
</script>
