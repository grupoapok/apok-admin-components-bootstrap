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
        <div id="sidebar" class="d-none d-xl-flex flex-column justify-content-between" :class="[ sidebarExpanded && 'expanded' ]">
          <admin-menu vertical pills :expanded="sidebarExpanded"></admin-menu>
          <a href="#" class="logo-menu align-self-center mb-3 mt-2">
            <b-img
              :src="logo"
            />
          </a>
        </div>
        <div id="main_content">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </b-row>
    </main>

    <!--<admin-footer></admin-footer>-->

    <b-modal
      id="confirm-logout-modal"
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
  /*import AdminFooter from './AdminFooter';
  import AdminMenu from './AdminMenu';
  import AdminNavbar from './AdminNavbar';
  import AdminMessages from './AdminMessages';*/
  import logo from '../assets/img/doge.png';

  export default {
    name: 'AdminLayout',
    /*components: {
      AdminMenu,
      AdminFooter,
      AdminNavbar,
      AdminMessages,
    },*/
    data() {
      return {
        logo,
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
      ...mapActions('auth', ['logout', 'getUser', 'getCompany']),
      ...mapActions('ui', ['toggleSidebar']),
    },
    beforeRouteUpdate(to, from, next) {
      const token = Cookies.get(process.env.SESSION_COOKIE);
      if (!token) {
        next({ name: 'Login' });
      }
      next();
    },
    created() {
      const token = Cookies.get(process.env.SESSION_COOKIE);
      if (!token) {
        this.$router({ name: 'Login' });
      }
      this.getUser();
      this.getCompany()
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
  }
  }
</style>
