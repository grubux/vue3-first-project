<template>
  <main>
    <UsersTable
      v-if="users.length > 0 && usersCount"
      :users-count="usersCount"
      :users="users"
      @delete-last-user="deleteLastUser"
    />
    <CreateUser :users="users" @create-user="createUser" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import UsersTable from './components/UsersTable.vue'
import CreateUser from './components/CreateUser.vue'

import type { Ref } from 'vue'
import type { User, NewUser, UsersFetched } from './App.types'

export default defineComponent({
  name: 'App',
  data(): {
    users: Ref<User[]>
    newUser: Ref<NewUser>
    usersCount: Ref<number | null>
  } {
    return {
      users: ref([]),
      newUser: ref({ name: '', username: '', id: null }),
      usersCount: ref(null)
    }
  },
  mounted() {
    this.fetchUsers()
  },
  watch: {
    users: {
      deep: true,
      handler(updatedUsers) {
        this.usersCount = updatedUsers.length
      }
    }
  },
  methods: {
    async fetchUsers() {
      // This function will be called when the app will be mounted
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        this.users = data.map((element: UsersFetched) => {
          return { name: element.name, username: element.username, id: element.id }
        })
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async createUser(user: User) {
      // Update users array with new user
      this.users.push(user)
    },
    async deleteLastUser() {
      // Update users array with deleted user
      this.users.pop()
    }
  },
  components: { UsersTable, CreateUser }
})
</script>

<style>
@import url('./App.css');
</style>
