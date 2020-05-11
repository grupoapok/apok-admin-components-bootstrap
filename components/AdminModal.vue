<template>
  <b-modal class="bg-light" v-bind="$attrs" v-on="$listeners" :ok-only="!confirm">
    <slot></slot>
  </b-modal>
</template>

<script>
  export default {
    name: "AdminModal",
    props: {
      confirm: {
        type: Boolean,
        default: false
      },
    },
  }
</script>

<style scoped lang="scss">
  .ui.dimmer.modals.page.transition{
    max-height: 100vh;
  }
</style>
