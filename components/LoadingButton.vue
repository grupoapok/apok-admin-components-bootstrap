<template>
  <icon-button :disabled="loading" v-bind="$attrs" v-on="$listeners" :icon-only="iconOnly">
    <icon slot="icon" icon="spinner" spin v-if="loading" class="mr-2"></icon>
    <slot></slot>
  </icon-button>
</template>

<script>
import Icon from './Icon';
import IconButton from './IconButton';

export default {
  name: 'LoadingButton',
  components: { IconButton, Icon },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
