<template>
  <div class="messages-container">
    <b-alert
      v-for="(message, i) in messages"
      :key="`message_${i}`"
      :variant="message.type"
      :show="10"
      fade
      dismissible
      @dismissed="dismissMessage(message.id)"
    >
      <div class="d-flex">
        <icon class="mr-2" icon="done_outline" material-icon v-if="message.type === 'success'"></icon>
        <icon class="mr-2" icon="warning" material-icon v-if="message.type === 'warning'"></icon>
        <icon class="mr-2" icon="info" material-icon v-if="message.type === 'info'"></icon>
        <icon class="mr-2" icon="error_outline" material-icon v-if="message.type === 'danger'"></icon>
        {{ message.text | translate }}
      </div>
    </b-alert>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Icon from './Icon';

export default {
  name: 'AdminMessages',
  components: { Icon },
  computed: {
    ...mapState('messages', ['messages']),
  },
  methods: {
    ...mapActions('messages', ['dismissMessage']),
  },
};
</script>

<style lang="scss">
.messages-container {
  position: fixed;
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
