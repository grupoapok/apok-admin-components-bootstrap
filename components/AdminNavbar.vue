<template>
  <b-navbar toggleable="xl" id="navbar" class="border-bottom bg-light">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <router-link
      is="b-navbar-brand"
      :to="{ name: 'Home' }"
      class="text-center brand-container"
      :class="expanded ? 'expanded' : ''">
      <template v-if="expanded">
        <b-img v-show="LogoExpanded"
               fluid
               class="logo-expanded"
               :src="LogoExpanded"
        >
        </b-img>
        <span v-show="!LogoExpanded" class="">
          {{ appName }}
        </span>
      </template>
      <template v-else class="">
        <!--<b-img v-if="LogoCollapsed"-->
        <!--fluid-->
        <!--class="logo-collapsed p-2"-->
        <!--:src="LogoCollapsed"-->
        <!--&gt;-->
        <!--</b-img>-->
        <span class="name-collapsed text-admin">
          {{ appNameCollapse }}
        </span>
      </template>
    </router-link>

    <b-navbar-nav v-if="canToggleSidebar" class="d-none d-sm-block">
      <b-nav-item id="sidebarToggler" @click="$emit('toggleSidebar')"><icon icon="bars"/></b-nav-item>
    </b-navbar-nav>

    <b-collapse is-nav id="nav_collapse">
      <admin-menu in-nav-bar fill id="top_menu" class="d-block d-xl-none"></admin-menu>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown id="language-menu" right :text="$i18n.locale() | uppercase">
          <b-dropdown-item
            v-for="(locale, i) in locales"
            :key="`locale_${i}`"
            @click="setLang(locale)">
            {{ locale | uppercase }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right id="user-menu" >
          <template slot="text">
            <span >
              {{ user.name }}
              <icon icon="user"></icon>
            </span>
          </template>
          <!--<router-link is="b-dropdown-item" :to="{ name: 'Profile' }">-->
          <!--<icon icon="user"></icon>-->
          <!--Profile-->
          <!--</router-link>-->
          <b-dropdown-item id="logout-button" @click.prevent="$emit('onLogout')">
            <icon icon="sign-out-alt"></icon>
            {{ 'actions.logout' | translate }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import AdminMenu from './AdminMenu';
  import Icon from './Icon';

  import LogoExpandedAux from '../assets/img/doge.png';
  import LogoCollapsedAux from '../assets/img/doge.png';
  import IconMenuCollapse from '../assets/img/doge.png';
  import IconMenuExpand from '../assets/img/doge.png';

  import { mapState } from 'vuex';

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
        LogoExpanded: LogoExpandedAux,
        LogoCollapsed: LogoCollapsedAux,
        IconMenuCollapse,
        IconMenuExpand,
        appName: 'ADMIN',
        appNameCollapse: 'A',
      };
    },
    watch: {
      company(newVal) {
        this.LogoExpanded = newVal.logo;
        this.appName = newVal.name;
        this.appNameCollapse = newVal.name[0];
        if (newVal.language) {
          this.$i18n.set(newVal.language)
        } else {
          this.$i18n.set('es')
        }
      }
    },
    computed: {
      ...mapState('auth', [ 'company' ]),
      locales() {
        return this.$i18n.locales();
      },
    },
    methods: {
      setLang(locale) {
        this.$i18n.set(locale)
      },
    }
  };
</script>

<style scoped lang="scss">
  #navbar {
    border-radius: 0;
    border-left: none;
    border-right: none;
    padding: 0;
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
  .name-collapsed {
    font-size: 1.6em;
    font-weight: bold;
  }
</style>
