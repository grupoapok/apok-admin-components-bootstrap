<template>
  <div :is="inNavBar ? 'b-navbar-nav' : 'b-nav'" class="admin_menu" v-bind="$attrs" :vertical="vertical">
    <admin-menu-item
      v-for="(item,i) in items"
      :key="`menu_item_${i}`"
      :keyId="`menu_item_${i}`"
      :item="item"
      :class="{'dropright': item.children}"
      :vertical="vertical"
      :showText="expanded"
      @click.native="$emit('onMenuItemClicked')"
    >
    </admin-menu-item>
  </div>
</template>

<script>
import menu from '../config/menu';
import AdminMenuItem from './AdminMenuItem';

export default {
  name: 'AdminMenu',
  components: { AdminMenuItem },
  props: {
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
  data() {
    return {
      items: menu,
    };
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
