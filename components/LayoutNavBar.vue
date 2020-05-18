<template>
  <b-navbar toggleable="xl" id="navbar" class="border-bottom">
    <b-navbar-toggle target="nav_collapse"/>

    <router-link is="b-navbar-brand" :to="{ name: 'Home' }">
      <span v-if="expanded">{{ title }}</span>
      <span v-else>{{ shortTitle }}</span>
    </router-link>

    <b-navbar-nav v-if="canToggleSidebar" class="d-none d-sm-block">
      <b-nav-item id="sidebarToggler" @click="$emit('sidebarToggled')"><icon-renderer icon="bars"/></b-nav-item>
    </b-navbar-nav>

    <b-collapse is-nav id="nav_collapse">
<!--      <admin-menu in-nav-bar fill id="top_menu" class="d-block d-xl-none"></admin-menu>-->

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right :text="$i18n.locale() | uppercase">
          <b-dropdown-item v-for="(locale, i) in locales" :key="`locale_${i}`" @click="$emit('setLocale', locale)">
            {{ locale | uppercase }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right :text="user.name">
          <router-link is="b-dropdown-item" :to="{ name: 'Profile' }">
            <icon-renderer icon="user"/>
            Profile
          </router-link>
          <b-dropdown-item @click.prevent="$emit('onLogout')">
            <icon-renderer icon="sign-out-alt"/>
            Logout
          </b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: 'LayoutNavbar',
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
      title: {
        type: String,
        default: 'Admin'
      },
      shortTitle: {
        type: String,
        default: 'A'
      },
      locales: {
        type: Array,
        default(){
          return [];
        }
      }
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
