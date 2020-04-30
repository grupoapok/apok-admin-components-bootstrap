<template>
  <icon v-if="typeof icon === 'string'" :icon="icon" icomoon fixed-width></icon>
  <icon v-else fixed-width v-bind="icon"></icon>
</template>

<script>
  import Icon from './Icon';

  export default {
    name: "AdminMenuItemIcon",
    components: { Icon },
    props: {
      icon: {
        default: null
      }
    }
  }
</script>
