<template>
  <li role="tablist" class="w-100">
    <template v-if="item.children && item.children.length">
      <a
        v-on="$listeners"
        href="#"
        role="tab"
        class="parent menu-item"
        v-b-toggle="keyId"
        :title="$t(item.label)"
      >
        <admin-menu-item-icon v-if="item.icon" :icon="item.icon"/>
        <span v-if="showText || !item.icon" class="menu-item-text">{{ item.label | translate }}</span>
      </a>

      <b-collapse
        :id="keyId"
        role="tabpanel"
        accordion="only-one"
        class="subchilds w-100"
        :class="[{'flex-column': vertical}]">

        <admin-menu-item
          v-for="(child, i) in item.children"
          :key="`subchild_${i}`"
          :keyId="`${keyId}_subchild_${i}`"
          class="w-100 subchild"
          :class="[{ 'pl-3' : showText }]"
          :showText="showText"
          :item="child">

        </admin-menu-item>

      </b-collapse>
    </template>
    <router-link
      v-else
      v-on="$listeners"
      :to="item.to"
      :href="item.href"
      class="menu-item"
      :title="$t(item.label)"
      :id="keyId"
    >

      <span  >
        <admin-menu-item-icon v-if="item.icon" :icon="item.icon"/>
        <icon v-else icon="stream" />
        <span v-if="showText" class="menu-item-text">
          {{ item.label | translate }}
        </span>
      </span>

      <!--<ul v-if="item.children && item.children.length" class="nav" :class="{'flex-column': vertical}">-->
      <!--<admin-menu-item-->
      <!--v-for="(child, i) in item.children"-->
      <!--:key="`${keyId}_${i}`"-->
      <!--:item="child">-->
      <!--</admin-menu-item>-->
      <!--</ul>-->

    </router-link>

  </li>
</template>
<script>
  import AdminMenuItemIcon from './AdminMenuItemIcon';
  import Icon from './Icon';

  export default {
    name: 'AdminMenuItem',
    components: { AdminMenuItemIcon, Icon },
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
  .subchilds {
    transition: padding 0.5s;
    padding-left: 5px;
  }
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
