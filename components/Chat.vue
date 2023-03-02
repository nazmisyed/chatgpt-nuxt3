<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-between">

      <header class="bg-blue-600 text-white py-4 px-6">
        <h1 class="text-xl font-bold">{{ title }}</h1>
      </header>
      <main class="flex flex-col flex-1 overflow-y-auto gap-y-5">
        <div v-for="message in messages" :key="message.id">
          <span v-if="message.data.role === 'system'" class="text-gray-500 mb-2 mx-2 px-2">
            Conversation Starts
          </span>
          <span v-else-if="message.data.role === 'user'" class="bg-gray-300 rounded-lg py-2 px-4 inline-block break-words mx-2">
            {{ message.data.content }}
          </span>
          <span v-else class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block break-words mx-2 whitespace-pre-line">
            {{ message.data.content }}
          </span>
        </div>
      </main>
      <footer class="bg-white py-4 px-6">
        <form class="flex" @submit.prevent="sendMessage">
          <input type="text" class="flex-1 border border-gray-300 p-2 rounded-l-md focus:outline-none" v-model="messageInput">
          <button type="submit" class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-r-md">Send</button>
        </form>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: 'Chat App',
        messages: [],
        messageInput: ''
      }
    },
    async mounted() {
      await this.fetchMessages()
    },
    methods: {
      async fetchMessages() {
        const response = await this.$api.get(`${this.$config.public.backendUrl}/messages`)
        this.messages = response.data.messages
      },
      //need to create id here
      async sendMessage() {
        const response = await this.$api.post(`${this.$config.public.backendUrl}/message`, { content: this.messageInput })
        console.log(response.data)
        this.messages.push(response.data.message)
        const response2 = await this.$api.get(`${this.$config.public.backendUrl}/last_message`)
        this.messages.push(response2.data.message)
        this.messageInput = ''
      }
    }
  }
  </script>



  
  