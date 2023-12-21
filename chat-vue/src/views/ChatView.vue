<template>
  <div>
    <h1>User Data</h1>
    <table>
      <thead>
        <tr>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userData" :key="user.id">
          <td>
            {{ user.email }}
            <button @click="startChat(user)">Chat</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h1>Chat Data</h1>
    <ul>
      <li v-for="chat in chatData" :key="chat.id">
        <p>
          <strong>User:</strong> {{ chat.user.email }}<br />
          <strong>Message:</strong> {{ chat.message }}
        </p>
      </li>
    </ul>

    <h1>Send Private Message</h1>
    <form @submit.prevent="sendMessage" v-if="recipientEmail">
      <label for="message">Message:</label>
      <input type="text" id="message" v-model="newMessage" required>

      <label for="recipient">To (User Email):</label>
      <!-- Change input to select dropdown -->
      <select v-model="recipientEmail" required>
        <option v-for="user in userData" :key="user.id" :value="user.email">{{ user.email }}</option>
      </select>

      <button type="submit">Send</button>
      <button @click="cancelChat">Cancel Chat</button>
    </form>
    <p v-else>Select a user to start a chat.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const chatData = ref([]);
const userData = ref([]);
const newMessage = ref('');
const recipientEmail = ref('');

onMounted(async () => {
  try {
    // Fetch user data
    const userResponse = await axios.get('http://localhost:3000/api/users');
    userData.value = userResponse.data.docs;

    // Fetch chat data
    const chatResponse = await axios.get('http://localhost:3000/api/chat');
    chatData.value = chatResponse.data.docs;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const startChat = (user) => {
  // Set recipientEmail to the selected user's email
  recipientEmail.value = user.email;
};

const sendMessage = async () => {
  try {
    // Find the recipient user by email
    const recipientUser = userData.value.find(user => user.email === recipientEmail.value);

    if (recipientUser) {
      // Send the private message
      await axios.post('http://localhost:3000/api/chat', {
        user: recipientUser.id,
        message: newMessage.value,
      });

      // Clear the form fields after sending the message
      newMessage.value = '';
      recipientEmail.value = '';
    } else {
      console.error('Recipient not found.');
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const cancelChat = () => {
  recipientEmail.value = '';
};
</script>
