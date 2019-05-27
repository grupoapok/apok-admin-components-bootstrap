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
            <b-col :cols="12" :sm="canCreate ? 6 : 12"
                   class="d-flex flex-sm-row flex-column justify-content-end align-items-sm-center text-right"
                   v-if="totalPages > 1 || canChangePageSize">
                <b-form inline class="justify-content-end mr-sm-2">
                    <label class="mr-2">Items per page</label>
                    <b-form-select :value="pageSize" @input="$emit('onChangePageSize',$event)"
                                   :options="[2,5,10,15,20]"></b-form-select>
                </b-form>
                <admin-pagination
                        v-if="totalPages > 1"
                        :total-pages="totalPages"
                        :current-page="currentPage"
                        @onPageChanged="$emit('onPageChanged', $event)"
                ></admin-pagination>
            </b-col>
        </b-row>

        <admin-form
                class="filter-form"
                v-if="filtersFields.length"
                inline
                submit-button-icon="filter"
                submit-button-icon-only
                :show-submit="true"
                :show-cancel="false"
                :show-divider="false"
                :form-var="filters"
                :form-fields="[filtersFields]"
                @submit="$emit('filtersUpdated')"
        >
        </admin-form>

        <div class="mt-2 table-responsive">
            <table class="table" :class="{'table-hover': hover, 'table-striped': striped, 'table-bordered': bordered}">
                <thead>
                <tr>
                    <th v-for="(field,i) in tableFields" :key="`field_header_${i}`">
                        <template v-if="typeof field === 'object' && field.sortable">
                            <icon-button class="sort-button" variant="link" :icon="sortIcon(field)" right
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
                        <icon icon="loading" size="48px" mdi spin></icon>
                    </td>
                </tr>
                </tbody>

                <tbody v-else>
                <tr v-if="items.length === 0">
                    <td :colspan="tableFields.length + actions.length" class="text-center">
                        No records to show
                    </td>
                </tr>

                <tr v-else v-for="(record, r) in items" :key="`${record[idField]}`">
                    <slot
                            v-for="(field, c) in tableFields"
                            :data="record"
                            :name="`${field.key || field}`"
                    >
                        <td :key="`field_${r}_${c}`">{{ getRecordField(record, field) }}</td>
                    </slot>

                    <td class="collapsed">
                        <icon-button
                                v-for="(a,i) in actions"
                                v-bind="a.props"
                                v-if="evalActionCondition(record, a)"
                                :disabled="record.deleting"
                                :key="`action_${r}_${i}`"
                                :class="['my-lg-0', {'mr-lg-2 mb-2': i < actions.length - 1}]"
                                @click="$emit(`on${a.action}`, record[idField])"
                        >
                            <span v-if="!a.props.iconOnly">{{ a.text | translate }}</span>
                        </icon-button>
                    </td>
                </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
    import camelCase from 'lodash/camelCase';
    import AdminForm from './AdminForm';
    import AdminPagination from './AdminPagination';
    import Icon from './Icon';
    import IconButton from './IconButton';

    export default {
        name: "AdminTable",
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
            canReload: { type: Boolean, default: true },
            currentPage: { type: Number, default: 1 },
            totalPages: { type: Number, default: 1 },
            pageSize: { type: Number, default: 20 },
            createButton: { type: String, default: 'Create New' },
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
                if (typeof field === 'object') {
                    return this.$t(field.label || camelCase(field.key));
                }
                return camelCase(this.$t(field));
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
