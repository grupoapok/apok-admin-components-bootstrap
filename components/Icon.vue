<template>
  <font-awesome-icon :icon="icon" :spin="spin" v-bind="$attrs" v-if="!materialIcon && !mdi"/>
  <i :class="['mdi', `mdi-${icon}`, `mdi-${$attrs.size}`, spin && 'mdi-spin']" v-else-if="mdi"/>
  <i :class="`material-icons${outlined ? '-outlined' : ''}`" v-else-if="materialIcon">{{ icon }}</i>
  <unicon :name="icon" :icon-style="iconStyle" v-bind="$attrs" v-else-if="unicons"/>
</template>

<script>
  export default {
    name: "Icon",
    props: {
      unicons: {
        type: Boolean,
        default: false,
      },
      iconStyle: {
        type: String,
        default: 'line',
      },
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
      }
    },
  };
</script>

<style scoped>
</style>
