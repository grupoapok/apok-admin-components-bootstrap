<template>
  <div class="d-flex flex-column" id="admin-layout">

    <messages-renderer
      :messages="messages"
      @messageDismissed="(m) => $emit('messageDismissed', m)"
    />

    <layout-navbar-renderer
      :expanded="sidebarExpanded"
      :user="user"
      @sidebarToggled="$emit('toggle-sidebar')"
      :navbarProps="navbarProps"
    />

    <main class="container-fluid d-flex flex-column flex-fill">
      <b-row class="flex-grow-1">
        <div :class="[ sidebarExpanded && 'expanded' ]" class="d-sm-block" id="sidebar">
          <menu-renderer :expanded="sidebarExpanded" :items="menu" :vertical="true"/>
        </div>
        <div class="container-fluid" id="main_content">
          <slot>
            <p>Main content</p>
          </slot>
        </div>
      </b-row>
    </main>

    <layout-footer-renderer :footerProps="footerProps">
      <slot name="footer">This is the Footer</slot>
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
      navbarProps: Object,
      footerProps: Object,
      menu: {
        type: Array,
        default() {
          return [];
        }
      },
      messages: {
        type: Array,
        default: () => []
      },
      user: Object,
      sidebarExpanded: Boolean,
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
        width: 15%;
      }
      padding: 1em 0 0;
    }

    #main_content {
      flex-grow: 1;
      flex-basis: 83.33333%;
      padding: 1em 0;
    }
  }
</style>
