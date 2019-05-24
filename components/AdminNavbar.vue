<template>
  <b-navbar toggleable="xl" id="navbar" class="border-bottom" type="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <router-link is="b-navbar-brand" :to="{ name: 'Home' }">
      <span v-if="expanded">
      {{ $constants.APP_NAME }}
      </span>
      <span v-else>
      {{ $constants.SHORT_APP_NAME }}
      </span>
    </router-link>

    <b-navbar-nav v-if="canToggleSidebar" class="d-none d-sm-block">
      <b-nav-item id="sidebarToggler" @click="$emit('toggleSidebar')"><icon icon="bars"/></b-nav-item>
    </b-navbar-nav>

    <b-collapse is-nav id="nav_collapse">
      <admin-menu in-nav-bar fill id="top_menu" class="d-block d-xl-none"></admin-menu>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right :text="$i18n.locale() | uppercase">
          <b-dropdown-item v-for="(locale, i) in locales" :key="`locale_${i}`" @click="$i18n.set(locale)">
            {{ locale | uppercase }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right :text="user.name">
          <router-link is="b-dropdown-item" :to="{ name: 'Profile' }">
            <icon icon="user"></icon>
            Profile
          </router-link>
          <b-dropdown-item @click.prevent="$emit('onLogout')">
            <icon icon="sign-out-alt"></icon>
            Logout
          </b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import AdminMenu from './AdminMenu';
import Icon from './Icon';

export default {
  name: 'AdminNavbar',
  components: { Icon, AdminMenu },
  props: {
    user: {
      type: Object,
      default() {
        return {};
      },
    },
    expanded: Boolean,
    canToggleSidebar: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      appName: 'WTF',
    };
  },
  computed: {
    locales() {
      return this.$i18n.locales();
    },
  },
};
</script>

<style scoped lang="scss">
#navbar {
  border-radius: 0;
  border-left: none;
  border-right: none;
  padding: 0.5rem 15px;
  .navbar-toggler {
    padding: 0.25rem;
    border: none;
    outline: none !important;
  }
  #avatar_dropdown {
    .text {
      .icon {
        margin-left: 0.5rem !important;
      }
    }
  }
  #sidebarToggler {
    cursor: pointer;
  }
}
</style>
