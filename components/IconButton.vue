<template>
  <b-button
    :disabled="loading"
    :class="[icon.materialIcon && 'd-inline-flex align-items-center']"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="icon">
<<<<<<< HEAD
      <icon-renderer icon="spinner" spin v-if="loading" class=""/>
      <icon-renderer
        v-if="!!icon && !right && !loading"
        :class="[icon.materialIcon && 'md-18']"
        v-bind="realIcon"
      />
=======
      <icon
        v-if="icon && !right"
        :material-icon="materialIcon"
        :icon="icon"
        :class="[!iconOnly && 'mr-2', materialIcon && 'md-18']"
      ></icon>
>>>>>>> develop
    </slot>
    <slot></slot>
    <slot name="right-icon">
<<<<<<< HEAD
      <icon-renderer
        v-if="!!icon && right"
        :class="[icon.materialIcon && 'md-18']"
        v-bind="realIcon"
      />
=======
      <icon
        v-if="icon && right"
        :material-icon="materialIcon"
        :icon="icon"
        :class="[!iconOnly && 'ml-2', materialIcon && 'md-18']"
      ></icon>
>>>>>>> develop
    </slot>
  </b-button>
</template>

<script>
<<<<<<< HEAD
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
        default: null,
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
=======
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
>>>>>>> develop
</script>

<style scoped>
</style>
