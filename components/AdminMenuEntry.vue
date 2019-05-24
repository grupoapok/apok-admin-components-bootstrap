<template>
  <li class="admin-menu-item">
    <router-link :to="to" class="is-inline-flex" v-if="!hasChildren">
      <b-icon v-if="icon" :icon="icon" class="admin-menu-item-icon"></b-icon>
      {{ label }}
    </router-link>
    <a v-else @click.prevent="toggleChildren">
      <b-icon v-if="icon" :icon="icon" class="admin-menu-item-icon"></b-icon>
      {{ label }}
    </a>
    <ul v-if="children.length" :class="[!expanded && 'is-hidden']">
      <admin-menu-entry v-for="(child, i) in children" v-bind="child" :key="`child_${i}`"></admin-menu-entry>
    </ul>
  </li>
</template>

<script>
  export default {
    name: "AdminMenuEntry",
    data(){
      return {
        expanded: false
      }
    },
    props: {
      label: String,
      to: Object || String,
      icon: {
        type: String,
        default: null
      },
      children: {
        type: Array,
        default(){
          return [];
        }
      }
    },
    computed: {
      hasChildren() {
        return this.children.length > 0;
      },
      destination() {
        if (!this.children.length){
          return this.to
        }
        return '';
      }
    },
    methods: {
      toggleChildren() {
        if (this.children.length){
          this.expanded = !this.expanded;
        }
      }
    },
  }
</script>

<style scoped lang="scss">
.admin-menu-item{
  a {
    align-items: center;
    width: 100%;

    .admin-menu-item-icon {
      margin-right: 1em;
    }
  }
}
</style>
