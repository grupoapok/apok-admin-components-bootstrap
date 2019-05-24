<template>
  <div role="tablist">
    <template v-if="item.children && item.children.length">
      <a
        v-on="$listeners"
        href="#"
        role="tab"
        class="parent menu-item"
        is="b-nav-item"
        v-b-toggle="keyId">
        <admin-menu-item-icon v-if="item.icon" :icon="item.icon"/>
        <span v-if="showText || !item.icon" class="menu-item-text">{{ item.label | translate }}</span>
      </a>

      <div class="pl-3 subchilds w-100">
        <b-collapse
          :id="keyId"
          role="tabpanel"
          :class="{'flex-column': vertical}">

          <admin-menu-item
            v-for="(child, i) in item.children"
            :key="`subchild_${i}`"
            :keyId="`${keyId}_subchild_${i}`"
            class="w-100 subchild"
            :item="child">

          </admin-menu-item>

        </b-collapse>
      </div>
    </template>
    <router-link
      v-else
      is="b-nav-item"
      v-on="$listeners"
      :to="item.to"
      :href="item.href"
      class="menu-item"
    >
      <admin-menu-item-icon v-if="item.icon" :icon="item.icon"/>
      <span v-if="showText || !item.icon" class="menu-item-text">{{ item.label | translate }}</span>
      <ul v-if="item.children && item.children.length" class="nav" :class="{'flex-column': vertical}">
        <admin-menu-item
          v-for="(child, i) in item.children"
          :key="`subchild_${i}`"
          :item="child">
        </admin-menu-item>
      </ul>

    </router-link>

  </div>
</template>
<script>
  import AdminMenuItemIcon from './AdminMenuItemIcon'

  export default {
    name: 'AdminMenuItem',
    components: { AdminMenuItemIcon },
    props: {
      vertical: {
        type: Boolean,
        default: false,
      },
      item: {
        type: Object,
        default() {
          return {
            label: '',
          };
        },
      },
      keyId: {
        type: String,
      },
      showText: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      isComponent() {
        if (this.subMenu) {
          return 'b-dropdown-item';
        }
        if (this.item.children && this.item.children.length) {
          return 'b-nav-item-dropdown';
        }
        return 'b-nav-item';
      },
    },
  };
</script>
<style scoped lang="scss">
  .menu-item {
    a {
      max-height: 2.5rem;
      overflow: hidden;
      .menu-item-text {
        margin-left: 1rem;
      }
    }
  }
</style>
