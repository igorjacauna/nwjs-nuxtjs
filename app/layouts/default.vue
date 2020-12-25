<template>
  <v-app app>
    <v-app-bar app dense color="primary" dark fixed>
      <span></span>
      <div style="-webkit-app-region: drag">
        <span>NWJS</span>
      </div>
      <div
        class="d-flex flex-grow-1"
        style="-webkit-app-region: drag; height: 100%"
      ></div>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main app>
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "default",
  methods: {
    close() {
      close();
    },
  },
};
</script>