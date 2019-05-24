<template>
  <div id="admin_layout" class="d-flex flex-column">
    <admin-navbar
      :user="user"
      :expanded="sidebarExpanded"
      @onLogout="showLogoutConfirm = true"
      @toggleSidebar="toggleSidebar"
    ></admin-navbar>

    <main class="container-fluid d-flex flex-column flex-fill">
      <b-row class="flex-grow-1">
        <div id="sidebar" class="d-none d-xl-block" :class="[ sidebarExpanded && 'expanded' ]">
          <admin-menu vertical pills :expanded="sidebarExpanded"></admin-menu>
        </div>
        <div id="main_content">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </b-row>
    </main>

    <admin-footer></admin-footer>

    <b-modal
      :title="$t('dialogs.logout.title')"
      :visible="showLogoutConfirm"
      @ok="logout"
      @cancel="showLogoutConfirm = false"
      @hidden="showLogoutConfirm = false"
    >
      {{ 'dialogs.logout.text' | translate }}
    </b-modal>

    <admin-messages></admin-messages>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import { mapActions, mapState } from 'vuex';
  import AdminFooter from './AdminFooter';
  import AdminMenu from './AdminMenu';
  import AdminNavbar from './AdminNavbar';
  import AdminMessages from './AdminMessages';

  export default {
    components: {
      AdminMenu,
      AdminFooter,
      AdminNavbar,
      AdminMessages,
    },
    data() {
      return {
        appName: process.env.APP_NAME,
        sidebarVisible: false,
        showLogoutConfirm: false,
      };
    },
    computed: {
      ...mapState('auth', ['user', 'loggedIn']),
      ...mapState('ui', ['sidebarExpanded']),
    },
    methods: {
      ...mapActions('auth', ['logout']),
      ...mapActions('ui', ['toggleSidebar']),
    },
    beforeRouteUpdate(to, from, next) {
      const token = Cookies.get(process.env.SESSION_COOKIE);
      if (!token) {
        next({ name: 'Login' });
      }
      next();
    },
  };
</script>

<style scoped lang="scss">
  #admin_layout {
    min-height: 100vh;

    #sidebar {
      width: 52px;
      overflow: hidden;
      transition: all .5s;
      &.expanded {
        width: 16.66667%;
      }
      padding: 1em 0 0;
    }

    #main_content {
      flex-grow: 1;
      flex-basis: 83.33333%;
      padding: 1em 15px;
      max-width: 100vw;
    }
  }
</style>
