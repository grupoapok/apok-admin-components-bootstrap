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
    </template>
    <router-link
      v-else
      is="b-nav-item"
      v-on="$listeners"
      :to="item.to"
      :href="item.href"
      class="menu-item"
    >
      <icon-renderer class="mr-2" v-if="item.icon" v-bind="item.icon"/>
      <span v-if="showText || !item.icon" class="menu-item-text">{{ item.label | translate }}</span>
    </router-link>

  </div>
</template>
<script>
  export default {
    name: 'LayoutMenuItem',
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
  .menu-item {
    a {
      max-height: 2.5rem;
      overflow: hidden;
    }
  }
</style>
