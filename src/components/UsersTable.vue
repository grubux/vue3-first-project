<template>
  <div v-if="usersCount && users">
    <h2>Users count: {{ usersCount }}</h2>
    <tr v-for="(user, index) in users" :key="user.id">
      <td>{{ user.name }}</td>
      <td>{{ user.username }}</td>
      <button @click="handleDelete(user.id)" v-if="index === users.length - 1">Delete User</button>
    </tr>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { PropType } from 'vue'
import type { User } from '../App.types'

export default defineComponent({
  name: 'UsersTable',
  props: {
    users: Array as PropType<User[]>,
    usersCount: Number
  },
  methods: {
    async handleDelete(id: User['id']) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + id, {
          method: 'DELETE'
        })
        const data = await response.json()
        this.$emit('delete-last-user')

        console.log('User deleted on server:', data)
      } catch (error) {
        console.error('Error deleting user on server:', error)
      }
    }
  }
})
</script>
