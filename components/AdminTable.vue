<template>
  <div>
    <b-row class="align-items-end">
      <b-col :cols="12" :sm="6" class="my-2 my-sm-0">
        <slot name="create_button">
          <router-link :to="createRoute" is="button-renderer" v-bind="createButtonProps" v-if="canCreate">
            {{ createButtonText | translate }}
          </router-link>
        </slot>
        <button-renderer @click="filtersActive = true" class="ml-2" icon="filter" icon-only
                         v-if="true || filtersFields.length" variant="info"/>
        <button-renderer @click="$emit('refresh')" class="ml-2" icon="redo" icon-only v-if="canReload"/>
      </b-col>

      <b-col :cols="12" :sm="canCreate ? 6 : 12"
             class="d-flex flex-sm-row flex-column justify-content-end align-items-sm-center text-right"
             v-if="totalPages > 1 || canChangePageSize">
        <b-form class="justify-content-end mr-sm-2" inline>
          <label class="mr-2">Items per page</label>
          <b-form-select :options="[2,5,10,15,20]"
                         :value="pageSize"
                         @input="$emit('onChangePageSize',$event)"/>
        </b-form>
        <pagination-renderer
          :current-page="currentPage"
          :total-pages="totalPages"
          @onPageChanged="$emit('pageChanged', $event)"
          v-if="totalPages > 1"
        />
      </b-col>
    </b-row>

    <!--<transition name="fade">
      <div class="box mt-4" id="list-filters" v-if="filtersActive">
        <b-button variant="link" class="close_filters" @click="filtersActive = false">&times;</b-button>
        <admin-form
          :form-var="filters"
          :fields="filtersFields"
          :show-cancel="false"
          submit-button-icon="filter"
          :submit-button-text="null"
          @submit="$emit('filtersUpdated')"
        />
      </div>
    </transition>-->

    <div class="mt-2 table-responsive">
      <table :class="{'table-hover': hover, 'table-striped': striped, 'table-bordered': bordered}" class="table">
        <thead>
        <tr>
          <th :key="`field_header_${i}`" v-for="(field,i) in tableFields">
            <template v-if="typeof field === 'object' && field.sortable">
              <button-renderer :icon="sortIcon(field)"
                               @click="() => $emit('toggleOrder', field.key)"
                               class="sort-button"
                               right
                               variant="link">
                {{ getFieldTitle(field) | capitalize}}
              </button-renderer>
            </template>
            <template v-else>
              {{ getFieldTitle(field) | capitalize}}
            </template>
          </th>
          <th class="collapsed" v-if="actions.length !== 0"></th>
        </tr>
        </thead>

        <tbody v-if="loading">
        <tr>
          <td :colspan="tableFields.length + actions.length" class="text-center">
            <icon icon="loading" mdi size="48px" spin></icon>
          </td>
        </tr>
        </tbody>

        <tbody v-else>
        <tr v-if="items.length === 0">
          <td :colspan="tableFields.length + actions.length" class="text-center">
            No records to show
          </td>
        </tr>

        <tr :class="{'table-danger' : record.deleting}" :key="`${record[idField]}`" v-else v-for="(record, r) in items">
            <td :key="`field_${r}_${c}`"
                v-for="(field, c) in tableFields">
              <slot :data="record" :name="`${field.key || field}`">
              {{ getRecordField(record, field) }}
              </slot>
            </td>

          <td class="collapsed">
            <button-renderer
              :class="['my-lg-0', {'mr-lg-2 mb-2': i < actions.length - 1}]"
              :disabled="record.deleting"
              :key="`action_${r}_${i}`"
              @click="$emit(`${a.action}`, record[idField])"
              v-bind="a.props"
              v-for="(a,i) in actions"
              v-if="evalActionCondition(record, a)"
            >
              {{ a.text | translate }}
            </button-renderer>
          </td>
        </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
  import camelCase from 'lodash.camelcase';
  import upperFirst from "lodash.upperfirst";

  export default {
    name: "AdminTable",
    data() {
      return {
        filtersActive: false,
      }
    },
    inheritAttrs: false,
    props: {
      hover: { type: Boolean, default: false },
      striped: { type: Boolean, default: false },
      bordered: { type: Boolean, default: false },
      canChangePageSize: { type: Boolean, default: true },
      canCreate: { type: Boolean, default: true },
      createRoute: { type: [Object, String], default: null },
      idField: { type: String, default: 'id' },
      loading: { type: Boolean, default: false },
      canReload: { type: Boolean, default: true },
      currentPage: { type: Number, default: 1 },
      totalPages: { type: Number, default: 1 },
      pageSize: { type: Number, default: 20 },
      createButtonText: { type: String, default: 'Create New' },
      createButtonProps: {
        type: Object,
        default() {
          return {
            variant: "success",
            icon: "plus"
          }
        },
      },
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
        default() {
          return {};
        }
      },
      filtersFields: {
        type: Array,
        default() {
          return [];
        }
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
      evalActionConditions(record, action) {

      },
      evalActionCondition(record, action) {
        if (!action.condition) {
          return true
        }

        const { field, operator, value } = action.condition;
        const fieldValue = this.getRecordField(record, field);

        switch (operator) {
          case '=':
          case '==':
          case '===':
            return fieldValue === value;
          case '>':
            return fieldValue > value;
          case '>=':
            return fieldValue >= value;
          case '<':
            return fieldValue < value;
          case '<=':
            return fieldValue <= value;
          case '!=':
          case '!==':
            return fieldValue !== value;
          default:
            return false;
        }
      },
      getFieldTitle(field) {
        let title = field;
        if (typeof field === 'object') {
          title = field.label || field.key;
        }
        return upperFirst(camelCase(this.$t(title)));
      },
      getRecordField(record, field) {
        let fieldKey = field;
        let fieldValue = null;

        if (typeof field === 'object') {
          fieldKey = field.key;
        }

        const keys = fieldKey.split(".");
        fieldValue = record[keys[0]];

        for (let i = 1; i < keys.length; i++) {
          if (fieldValue && fieldValue.hasOwnProperty(keys[i])) {
            fieldValue = fieldValue[keys[i]];
          } else {
            break;
          }
        }

        return fieldValue;
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
      }
    },
  };
</script>

<style lang="scss" scoped>
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

  #list-filters {
    position: relative;
    width: 100%;
    padding-top: 2.5rem !important;
    &.box {
      background-color: $white;
      border-radius: $input-border-radius;
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
      display: block;
      padding: 1.25rem;
    }

    .close_filters {
      text-decoration: none !important;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
</style>
