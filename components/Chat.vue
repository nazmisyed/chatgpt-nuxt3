<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-between">

        <header class="bg-blue-600 text-white py-1 px-6 flex flex-col">
            <h1 class="text-md font-bold">{{ title }}</h1>
            <div class="py-1 w-full">
                <label class="block font-medium mb-2" for="password">
                    Open AI Key
                </label>

                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" v-model="key">
            </div>
        </header>
        <main class="flex flex-col flex-1 overflow-y-auto gap-y-5" ref="main">
            <div v-for="message in messages" :key="message.id">
                <span v-if="message.data.role === 'system'" class="text-gray-500 mb-2 mx-2 px-2">
                    Your data and key wont be stored anywhere.
                </span>
                <span v-else-if="message.data.role === 'user'"
                    class="bg-gray-300 rounded-lg py-2 px-4 inline-block break-words mx-2 whitespace-pre-wrap place-self-start">
                    {{ message.data.content }}
                </span>
                <span v-else
                    class="bg-blue-200 text-black rounded-lg py-2 px-4 inline-block break-words mx-2 whitespace-pre-wrap place-self-end">
                    {{ message.data.content }}
                </span>
            </div>
        </main>
        <footer class="bg-white py-4 px-6">
            <form class="flex" @submit.prevent="sendMessage">
                <textarea type="text" class="flex-1 border border-gray-300 p-2 rounded-l-md focus:outline-none"
                    v-model="messageInput" @keydown.enter="submitMessage"></textarea>
                <button type="submit" class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-r-md">Send</button>
            </form>
        </footer>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            title: 'ChatGPT Wrapper App',
            messages: [{ "id": 0, "data": { "role": "system", "content": "You are a helpful assistant." } }], //need ability to select from multiple system
            messageInput: '',
            key: ""
        }
    },
    async mounted() {


    },
    methods: {
        scrollToBottom() {
            const messages = this.$refs.main;
            messages.scrollTop = messages.scrollHeight;
        },
        addMessage(userText) {

            this.messages.push({ "id": this.messages.length || 1, data: { role: "user", "content": userText } })
            

        },
        async sendMessage() {
            this.addMessage(this.messageInput)
            this.messageInput = ''
            const response = await this.$api.post(`${this.$config.public.backendUrl}/message2`, { "message": this.messages, "key": this.key })
            console.log(response.data)
            this.messages.push(response.data.message)
            this.scrollToBottom();//doesnt work
        

        },
        submitMessage(event) {
            if (!event.shiftKey) {

                this.sendMessage();

            }
        },
    }
}
</script>



  
  