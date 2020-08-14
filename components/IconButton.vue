<template>
  <b-button
    :disabled="loading"
    :class="[icon.materialIcon && 'd-inline-flex align-items-center']"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="icon">
      <icon-renderer icon="spinner" spin v-if="loading" class=""/>
      <icon-renderer
        v-if="!!icon && !right && !loading"
        :class="[icon.materialIcon && 'md-18']"
        v-bind="realIcon"
      />
    </slot>
    <span class="mx-2" v-if="hasContent">
      <slot></slot>
    </span>
    <slot name="right-icon">
      <icon-renderer
        v-if="!!icon && right"
        :class="[icon.materialIcon && 'md-18']"
        v-bind="realIcon"
      />
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
        type: [String, Object],
        default: '',
      },
      loading: Boolean,
    },
    computed: {
      realIcon() {
        if (typeof this.icon === 'string') {
          return { icon: this.icon }
        }
        return this.icon
      },
      hasContent() {
        if (this.$slots && this.$slots.default && this.$slots.default.length){
          return this.$slots.default.some(slot => {
            return !!slot.text || (slot.children && slot.children.length && slot.children.some(c => !!c.text))
          })
        }
        return false;
      }
    }
  };
</script>

<style scoped>
</style>
