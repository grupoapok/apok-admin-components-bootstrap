<template>
  <b-button
    :class="[materialIcon && 'd-inline-flex align-items-center']"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="icon">
      <icon
        v-if="icon && !right"
        :material-icon="materialIcon"
        :icon="icon"
        :class="[!iconOnly && 'mr-2', materialIcon && 'md-18']"
      ></icon>
    </slot>
    <slot></slot>
    <slot name="right-icon">
      <icon
        v-if="icon && right"
        :material-icon="materialIcon"
        :icon="icon"
        :class="[!iconOnly && 'ml-2', materialIcon && 'md-18']"
      ></icon>
    </slot>
  </b-button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    iconOnly: {
      type: Boolean,
      default: false,
    },
    right: Boolean,
    icon: {
      type: String,
      default: null,
    },
    materialIcon: {
      type: Boolean,
      default: false
    },
  },
};
</script>

<style scoped>
</style>
