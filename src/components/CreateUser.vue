<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="name" v-model="newUser.name" />
    <input type="text" placeholder="username" v-model="newUser.username" />
    <button type="submit">Create User</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { User, NewUser } from '../App.types'

export default defineComponent({
  name: 'CreateUser',
  props: {
    users: {
      type: Array as () => User[],
      required: true
    }
  },
  data() {
    return {
      newUser: { name: '', username: '', id: null } as NewUser
    }
  },
  methods: {
    async handleSubmit() {
      // Generate an id for the new user. it is the max id of users + 1
      const newUserId = computed(() =>
        this.users.length > 0 ? Math.max(...this.users.map((u) => u.id)) + 1 : 1
      )

      const createdUser = {
        id: newUserId.value,
        name: this.newUser.name,
        username: this.newUser.username
      }

      // Send new user to backend
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify(createdUser),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        const data = await response.json()
        this.$emit('create-user', createdUser)

        console.log('User created on server:', data)
      } catch (error) {
        console.error('Error creating user on server:', error)
      }

      // Reset inputs
      this.newUser.name = ''
      this.newUser.username = ''
    }
  }
})
</script>
<style>
@import url('./CreateUser.css');
</style>
