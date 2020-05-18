<template>
  <div class="d-flex flex-column" id="admin-layout">

    <layout-navbar-renderer
      :expanded="sidebarExpanded"
      :user="user"
      @sidebarToggled="$emit('sidebarToggled')"
    />

    <main class="container-fluid d-flex flex-column flex-fill">
      <b-row class="flex-grow-1">
        <div :class="[ sidebarExpanded && 'expanded' ]" class="d-none d-xl-block" id="sidebar">
          <menu-renderer :expanded="sidebarExpanded" :items="menu" pills vertical/>
        </div>
        <div id="main_content">
          <slot></slot>
        </div>
      </b-row>
    </main>

    <layout-footer-renderer>
      <slot name="footer">Footer Here</slot>
    </layout-footer-renderer>
  </div>
</template>

<script>
  export default {
    name: 'Layout',
    data() {
      return {
        showLogoutConfirm: false,
      };
    },
    props: {
      menu: {
        type: Array,
        default() {
          return [];
        }
      },
      user: Object,
      sidebarExpanded: Boolean,
      title: {
        type: String,
        default: 'Admin'
      },
      shortTitle: {
        type: String,
        default: 'A'
      }
    },
  }
</script>
<style lang="scss" scoped>
  #admin-layout {
    min-height: 100vh;

    #sidebar {
      width: 52px;
      overflow: hidden;
      transition: all .5s;

      &.expanded {
        width: 10%;
      }

      padding: 1em 0 0;
    }

    #main_content {
      flex-grow: 1;
      flex-basis: 83.33333%;
      padding: 1em 0;
      max-width: 100vw;
    }
  }
</style>
