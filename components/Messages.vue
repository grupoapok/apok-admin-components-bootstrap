<template>
  <div class="messages-container">
    <b-alert
      :key="`message_${i}`"
      :show="10"
      :variant="message.type"
      @dismissed="$emit('messageDismissed', message.id)"
      dismissible
      fade
      v-for="(message, i) in messages"
    >
      <div class="d-flex">
        <icon-renderer class="mr-2" icon="done_outline" material-icon v-if="message.type === 'success'"/>
        <icon-renderer class="mr-2" icon="warning" material-icon v-if="message.type === 'warning'"/>
        <icon-renderer class="mr-2" icon="info" material-icon v-if="message.type === 'info'"/>
        <icon-renderer class="mr-2" icon="error_outline" material-icon v-if="message.type === 'danger'"/>
        {{ message.text | translate }}
      </div>
    </b-alert>
  </div>
</template>

<script>
  export default {
    name: 'Messages',
    props: {
      messages: {
        type: Array,
        default() {
          return [];
        }
      }
    },
  };
</script>

<style lang="scss">
  .messages-container {
    position: fixed;
    z-index: 99999;
    top: calc(57px + 1em);
    right: 1em;

    .alert-dismissible {
      padding-right: 3rem !important;

      .close {
        padding-left: 0.75rem !important;
      }
    }
  }
</style>
