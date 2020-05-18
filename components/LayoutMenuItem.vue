<template>
  <li role="tablist" class="w-100">
    <template v-if="item.children && item.children.length">
      <a
        v-on="$listeners"
        href="#"
        role="tab"
        class="parent menu-item"
<<<<<<< HEAD:components/LayoutMenuItem.vue
        is="b-nav-item"
        v-b-toggle="keyId">
        <icon-renderer class="mr-2" v-if="item.icon" v-bind="item.icon"/>
        <span v-if="showText || !item.icon" class="menu-item-text">{{ item.title | translate }}</span>
      </a>

      <div class="subchilds w-100">
        <b-collapse
          :id="keyId"
          role="tabpanel"
          :class="{'flex-column': vertical}">

          <layout-menu-item
            v-for="(child, i) in item.children"
            :key="`subchild_${i}`"
            :keyId="`${keyId}_subchild_${i}`"
            class="w-100 subchild"
            :item="child"/>
        </b-collapse>
      </div>
=======
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
>>>>>>> develop:components/AdminMenuItem.vue
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
<<<<<<< HEAD:components/LayoutMenuItem.vue
      <icon-renderer class="mr-2" v-if="item.icon" v-bind="item.icon"/>
      <span v-if="showText || !item.icon" class="menu-item-text">{{ item.label | translate }}</span>
=======

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

>>>>>>> develop:components/AdminMenuItem.vue
    </router-link>

  </li>
</template>
<script>
<<<<<<< HEAD:components/LayoutMenuItem.vue
  export default {
    name: 'LayoutMenuItem',
=======
  import AdminMenuItemIcon from './AdminMenuItemIcon';
  import Icon from './Icon';

  export default {
    name: 'AdminMenuItem',
    components: { AdminMenuItemIcon, Icon },
>>>>>>> develop:components/AdminMenuItem.vue
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
  };
</script>
<style scoped lang="scss">
  .subchilds {
    transition: padding 0.5s;
    padding-left: 5px;
  }
  .menu-item {
<<<<<<< HEAD:components/LayoutMenuItem.vue
    a {
      max-height: 2.5rem;
      overflow: hidden;
    }
=======
  a {
    max-height: 2.5rem;
    overflow: hidden;
  .menu-item-text {
    margin-left: 1rem;
  }
  }
>>>>>>> develop:components/AdminMenuItem.vue
  }
</style>
