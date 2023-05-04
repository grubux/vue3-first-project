<template>
  <div class="users-table-container" v-if="usersCount && users">
    <h2>Users count: {{ usersCount }}</h2>
    <table class="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>

          <button
            v-if="index === users.length - 1"
            @click="handleDelete(user.id)"
            class="delete-button"
          >
            Delete User
          </button>
        </tr>
      </tbody>
    </table>
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
<style>
@import url('./UsersTable.css');
</style>
