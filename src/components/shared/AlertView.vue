<template>
    <v-alert type="error" dismissible @input="onClose" :value="true">
      {{ text }}
    </v-alert>
</template>

<script>
  export default {
    props: ['text'],
    methods: {
      onClose() {
        this.$emit('dismissed')
      }
    },
    // O mounted é um dos hooks do ciclo de vida do Vue.js. 
    // Esses hooks permitem que você execute código em momentos específicos durante 
    // a vida útil de um componente Vue.
    mounted() {
      // Automatically close the alert after 3000ms (3 seconds)
      setTimeout(() => {
        this.onClose(); // Call the onclose method to handle auto-hide
      }, 4000);
    },
  }
</script>

