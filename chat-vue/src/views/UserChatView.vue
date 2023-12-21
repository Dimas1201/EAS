<template>
  <div>
    <h1>List Chat from User</h1>

    <form @submit.prevent="selectUser">
      <label for="selectedUser">Select User:</label>
      <select id="selectedUser" v-model="selectedUserId" required>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.email }}</option>
      </select>
      <button type="submit">OK</button>
    </form>

    <div v-if="selectedUser">
      <h2>Chat from {{ selectedUser.email }}</h2>
      <ul>
        <li v-for="chat in userChat" :key="chat.id">
          <p>
            <strong>User:</strong> {{ chat.user.email }}<br />
            <strong>Message:</strong> {{ chat.message }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const selectedUserId = ref('');
const users = ref([]);
const userChat = ref([]);
const selectedUser = ref(null);

onMounted(async () => {
  try {
    // Fetch user data
    const userResponse = await axios.get('http://localhost:3000/api/users');
    users.value = userResponse.data.docs;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});

const selectUser = async () => {
  try {
    // Fetch chat data for the selected user
    const chatResponse = await axios.get(`http://localhost:3000/api/chat?user=${selectedUserId.value}`);
    userChat.value = chatResponse.data.docs;

    // Find the selected user in the users list
    selectedUser.value = users.value.find(user => user.id === selectedUserId.value);
  } catch (error) {
    console.error('Error fetching chat data:', error);
  }
};
</script>
