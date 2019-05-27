<template>
  <div id="app">
    <v-alert
      dismissible
      class="alert info"
      v-model="$store.state.alert"
    >
      Someone saw the message!
    </v-alert>
    <v-app>
      <v-container align-start>
        <v-layout>
          <router-view/>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

#app {
  background-color: white;/*rgba(66, 184, 131, 0.03)*/
}
.alert {
  position: absolute;
  width: 100%;
  font-family: 'Fira Code', sans-serif
}

</style>
