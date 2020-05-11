<template>
  <font-awesome-icon :icon="icon" :spin="spin" v-bind="$attrs" v-if="!materialIcon && !mdi && !icomoon"></font-awesome-icon>
  <i :class="['mdi', `mdi-${icon}`, `mdi-${$attrs.size}`, spin && 'mdi-spin']" v-else-if="mdi"></i>
  <i :class="`material-icons${outlined ? '-outlined' : ''}`" v-else-if="materialIcon">{{ icon }}</i>
  <span :class="`icon-${icon}`" v-else></span>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Icon",
  inheritAttrs: false,
  components: { FontAwesomeIcon },
  props: {
    icon: {
      type: [String, Array],
      default: null
    },
    spin: {
      type: Boolean,
      default: false
    },
    materialIcon: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    mdi: {
      type: Boolean,
      default: false
    },
    icomoon: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
</style>
