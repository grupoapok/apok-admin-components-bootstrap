<template>
  <div>
    <b-row class="align-items-end">
      <b-col :cols="12" :sm="6" class="my-2 my-sm-0">
        <router-link v-if="canCreate" :to="createNewRoute" is="icon-button" variant="success" icon="plus">
          {{ createButton | translate }}
        </router-link>
        <b-button v-if="canReload" @click="$emit('refresh')" class="ml-2">
          <icon icon="redo"/>
        </b-button>
      </b-col>
      <b-col :cols="12" :sm="canCreate ? 6 : 12" class="d-flex flex-sm-row flex-column justify-content-end align-items-sm-center text-right"
             v-if="totalPages > 1 || canChangePageSize">
        <b-form inline class="justify-content-end mr-sm-2">
          <label class="mr-2">{{ 'table.itemsPerPage' | translate }}</label>
          <b-form-select :value="pageSize" @input="$emit('onChangePageSize',$event)"
                         :options="[5, 20, 50, 100]"></b-form-select>
        </b-form>
        <admin-pagination
          v-if="totalPages > 1"
          :total-pages="totalPages"
          :current-page="currentPage"
          @onPageChanged="$emit('onPageChanged', $event)"
        ></admin-pagination>
      </b-col>
    </b-row>

    <b-row class="pt-3 pb-2">
      <admin-form
        class="filter-form col-12"
        v-if="filtersFields.length"
        inline
        submit-button-icon="filter"
        submit-button-icon-only
        :show-submit="true"
        :show-cancel="false"
        :show-divider="false"
        :show-delete="false"
        :form-var="filtersFinal"
        :form-fields="[filtersFields]"
        @submit="$emit('filtersUpdated')"
      >
      </admin-form>
    </b-row>

    <div class="mt-2 table-responsive">
      <table class="table" :class="{'table-hover': hover, 'table-striped': striped, 'table-bordered': bordered}">
        <thead>
        <tr>
          <th v-for="(field,i) in tableFields" :key="`field_header_${i}`">
            <template v-if="typeof field === 'object' && field.sortable">
              <icon-button class="sort-button p-0 d-flex flex-row align-items-center" variant="link" :icon="sortIcon(field)" right
                           @click="() => $emit('toggleOrder', field.key)">
                {{ getFieldTitle(field) | capitalize}}
              </icon-button>
            </template>
            <template v-else>
              {{ getFieldTitle(field) | capitalize}}
            </template>
          </th>
          <th v-if="actions.length !== 0" class="collapsed"></th>
        </tr>
        </thead>

        <tbody v-if="loading">
        <tr>
          <td :colspan="tableFields.length + actions.length" class="text-center">
            <span class="loading-spinner text-admin">
              <icon icon="spinner" spin/>
            </span>
          </td>
        </tr>
        </tbody>

        <tbody v-else>
        <tr v-if="items.length === 0">
          <td :colspan="tableFields.length + actions.length" class="text-center">
            {{ 'no_records' | translate }}
          </td>
        </tr>
        <template v-else-if="moreTable">
          <tr  v-for="(record, r) in items" :key="`${record[idField]}`">
            <template v-if="r < currentCount">
              <slot
                v-for="(field, c) in tableFields"
                :data="record"
                :name="`${field.key || field}`"
              >
                <td :key="`field_${r}_${c}`">{{ getRecordField(record, field) }}</td>
              </slot>

              <td class="collapsed">
                <template v-for="(a,i) in actions">
                  <icon-button
                    v-bind="a.props"
                    :disabled="record.deleting"
                    :key="`action_${r}_${i}`"
                    :class="['my-lg-0', {'mr-lg-2 mb-2': i < actions.length - 1}, `btn-${a.action}`]"
                    @click="doAction(a, record)"
                  >
                    <span v-if="!a.props.iconOnly">{{ a.text | translate }}</span>
                  </icon-button>
                </template>
              </td>
            </template>
          </tr>
          <tr v-if="items.length >= currentCount">
            <td :colspan="tableFields.length + actions.length" class="text-center">
              <icon-button
                incon="plus"
                @click="currentCount += moreTableCount"
                class="btn-admin"
              >
                <span>
                  {{ 'actions.load_more' | translate }}
                </span>
              </icon-button>
            </td>
          </tr>
        </template>

        <tr v-else v-for="(record, r) in items" :key="`${record[idField]}`">
            <slot
              v-for="(field, c) in tableFields"
              :data="record"
              :name="`${field.key || field}`"
            >
              <td :key="`field_${r}_${c}`">{{ getRecordField(record, field) }}</td>
            </slot>

            <td class="collapsed">
              <template v-for="(a,i) in actions">
                <icon-button
                  v-bind="a.props"
                  :disabled="record.deleting"
                  :key="`action_${r}_${i}`"
                  :class="['my-lg-0', {'mr-lg-2 mb-2': i < actions.length - 1}, `btn-${a.action}`]"
                  @click="doAction(a, record)"
                >
                  <span v-if="!a.props.iconOnly">{{ a.text | translate }}</span>
                </icon-button>
              </template>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
  import camelCase from 'lodash/camelCase';
  import Icon from './Icon';
  import AdminPagination from './AdminPagination';
  import AdminForm from './AdminForm';
  import IconButton from './IconButton';

  export default {
    name: 'AdminTable',
    components: { IconButton, Icon, AdminPagination, AdminForm },
    inheritAttrs: false,
    props: {
      hover: { type: Boolean, default: false },
      striped: { type: Boolean, default: false },
      bordered: { type: Boolean, default: false },
      canChangePageSize: { type: Boolean, default: true },
      canCreate: { type: Boolean, default: true },
      createNewRoute: { type: [Object, String], default: null },
      idField: { type: String, default: 'id' },
      loading: { type: Boolean, default: false },
      canReload: { type: Boolean, default: false },
      currentPage: { type: Number, default: 1 },
      totalPages: { type: Number, default: 1 },
      pageSize: { type: Number, default: 20 },
      createButton: { type: String, default: 'actions.create' },
      orderField: {
        type: Object,
        default() {
          return {
            field: null,
            order: 'asc'
          }
        }
      },
      items: {
        type: Array,
        default() {
          return [];
        },
      },
      fields: {
        type: Array,
        default() {
          return [];
        },
      },
      actions: {
        type: Array,
        default() {
          return [];
        },
      },
      filters: {
        type: Object,
        default(){
          return {};
        }
      },
      filtersFields: {
        type: Array,
        default() {
          return [];
        }
      },
      moreTable: { type: Boolean, default: false },
      moreTableCount: { type: Number, default: 20 },
    },
    data() {
      return {
        currentCount: this.moreTableCount,
        filtersFinal: {},
      }
    },
    computed: {
      tableFields() {
        if (this.fields.length === 0) {
          if (this.items[0]) {
            return Object.keys(this.items[0]);
          }
        }
        return this.fields;
      },
    },
    methods: {
      getFieldTitle(field) {
        if (typeof field === 'object') {
          return this.$t(field.label || camelCase(field.key));
        }
        return camelCase(this.$t(field));
      },
      getRecordField(record, field) {
        if (typeof field === 'object') {
          return record[field.key];
        }
        return record[field];
      },
      sortIcon(field) {
        if (this.orderField.field !== field.key) {
          return 'sort'
        } else {
          if (this.orderField.order === 'asc') {
            return 'sort-amount-up'
          }
          return 'sort-amount-down'
        }
      },
      doAction(a, record) {
        if (a.allItem) {
          this.$emit(`on${a.action}`, record)
        } else {
          this.$emit(`on${a.action}`, record[this.idField])
        }
      },
      adjustFilters() {
        if (this.filtersFields && this.filters) {
          this.filtersFinal = this.filters;
          this.filtersFields.forEach((x) => {
            if (x.type === 'vselect') {
              if (x.props) {
                if (x.props.options) {
                  x.props.options.forEach((y) => {
                    if (y.hasOwnProperty('value')) {
                      if (this.filtersFinal[x.model] === y.value) {
                        this.filtersFinal[x.model] = y;
                      }
                    }
                  })
                }
              }
            }
          })
        }
      },
    },
    mounted() {
      this.adjustFilters();
    },
    beforeUpdate() {
      this.adjustFilters();
    }
  };
</script>

<style scoped lang="scss">
  td,
  th {
    &.collapsed {
      width: 0.1%;
      white-space: nowrap;
      @media (max-width: 768px) {
        white-space: normal;
      }
    }
  }

  td {
    .btn {
      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }

  .sort-button {
    padding-left: 0;
    color: $body-color;
    font-weight: bold;
    &:focus {
      outline: none !important;
    }
    &:hover {
      text-decoration: none;
      color: $body-color;
    }
  }
</style>
