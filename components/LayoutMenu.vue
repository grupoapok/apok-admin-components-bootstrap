<template>
  <div :is="inNavBar ? 'b-navbar-nav' : 'b-nav'" class="admin_menu col" v-bind="$attrs" :vertical="vertical">
    <template v-for="(item,i) in items">
      <menu-item-renderer
        :key="`menu_item_${i}`"
        :keyId="`menu_item_${i}`"
        :item="item"
        :class="{'dropright': !!item.children}"
        :vertical="vertical"
        :showText="expanded"
        @click.native="$emit('onMenuItemClicked')"
      />
    </template>

  </div>
</template>

<script>
  export default {
    name: 'LayoutMenu',
    props: {
      items: {
        type: Array,
        default() {
          return [];
        }
      },
      inNavBar: {
        type: Boolean,
        default: false,
      },
      vertical: {
        type: Boolean,
        default: false,
      },
      expanded: {
        type: Boolean,
        default: true,
      },
    },
  };
</script>

<style scoped lang='scss'>
  .admin_menu {
    flex-grow: 0 !important;
    .dropright {
      .dropdown-menu.show {
        left: 100% !important;
      }
    }
  }
</style>
