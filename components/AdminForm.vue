<template>
  <b-form @submit.prevent="doSubmit" class="admin-form" style="position: relative" :inline="inline">
    <transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <icon icon="loading" size="48px" mdi spin/>
      </div>
    </transition>
    <template v-for="(row, i) in fields">
      <template v-if="!inline && row.hasOwnProperty('title') && Array.isArray(row.fields)">
        <h2 :key="`title_${i}`">{{ row.title | translate }}</h2>
        <hr :key="`hr_${i}`">

        <b-form-row v-for="(rows, k) in row.fields" :key="`rows_${i}_${k}`">
          <admin-form-field
            :inline="inline"
            v-for="(field, j) in rows"
            v-model="formVar[field.model]"
            :readonly="loading || readOnly || field.loading"
            :key="`field_${i}_${k}_${j}`"
            :error="errors[field.model]"
            v-bind="field"
            @clearError="() => clearError(field)"
            @input="$emit('fieldChanged')"
          />
        </b-form-row>
      </template>

      <b-form-row v-else :key="`row_${i}`" :class="[inline && 'w-100']">
        <admin-form-field
          :inline="inline"
          v-for="(field, j) in row"
          v-model="formVar[field.model]"
          :key="`field_${i}_${j}`"
          :readonly="loading || readOnly || field.loading"
          :error="errors[field.model]"
          v-bind="field"
          @clearError="() => clearError(field)"
          @input="$emit('fieldChanged')"
        />
        <div v-if="inline">
          <loading-button
            type="submit"
            v-if="showSubmit"
            :variant="submitButtonVariant"
            :loading="loading"
            :icon="submitButtonIcon"
            :icon-only="submitButtonIconOnly"
            :class="[showCancel && 'mr-2']"
          ><span v-if="submitButton && !submitButtonIconOnly">{{ submitButton | translate }}</span></loading-button>
          <icon-button
            v-if="showCancel"
            type="button"
            :variant="cancelButtonVariant"
            :icon="cancelButtonIcon"
            :icon-only="cancelButtonIconOnly"
            @click="$emit('cancel')"
          ><span v-if="cancelButton && !cancelButtonIconOnly">{{ cancelButton | translate}}</span></icon-button>
        </div>
      </b-form-row>
    </template>

    <b-form-row v-if="!inline">
      <slot></slot>
    </b-form-row>

    <hr class="my-0" v-if="!inline && showDivider">
    <b-row :class="[showDivider && 'mt-3']" v-if="!inline">
      <b-col v-if="!readOnly && (showSubmit || showCancel)" :class="buttonsRowClass">
        <loading-button
          type="submit"
          v-if="showSubmit"
          :variant="submitButtonVariant"
          :icon-only="submitButtonIconOnly"
          :loading="loading"
          :icon="submitButtonIcon"
          :class="[showCancel && 'mr-2']"
        ><span v-if="submitButton && !submitButtonIconOnly">{{ submitButton | translate }}</span></loading-button>
        <icon-button
          v-if="showCancel"
          type="button"
          :variant="cancelButtonVariant"
          :icon-only="cancelButtonIconOnly"
          :icon="cancelButtonIcon"
          @click="$emit('cancel')"
        ><span v-if="cancelButton && !cancelButtonIconOnly">{{ cancelButton | translate}}</span></icon-button>
      </b-col>
      <b-col v-if="readOnly && showBack" :class="buttonsRowClass">
        <icon-button
          v-if="showBack"
          type="button"
          :variant="backButtonVariant"
          :icon="backButtonIcon"
          :icon-only="backButtonIconOnly"
          @click="$emit('cancel')"
        ><span v-if="backButton && !backButtonIconOnly">{{ backButton | translate }}</span></icon-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AdminFormField from './AdminFormField';
import Icon from './Icon';
import IconButton from './IconButton';
import LoadingButton from './LoadingButton';

export default {
  name: 'AdminForm',
  components: { Icon, IconButton, LoadingButton, AdminFormField },
  data() {
    return {};
  },
  props: {
    formVar: {
      type: Object,
      default() {
        return {};
      },
    },
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    readOnly: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    showDivider: { type: Boolean, default: true },
    buttonsAlignment: { type: String, default: 'left' },
    submitButton: { type: String, default: 'actions.save' },
    submitButtonVariant: { type: String, default: 'primary' },
    submitButtonIcon: { type: String, default: 'save' },
    cancelButton: { type: String, default: 'actions.cancel' },
    cancelButtonVariant: { type: String, default: null },
    cancelButtonIcon: { type: String, default: 'angle-left' },
    backButton: { type: String, default: 'actions.goBack' },
    backButtonVariant: { type: String, default: 'primary' },
    backButtonIcon: { type: String, default: 'angle-left' },
    showCancel: { type: Boolean, default: true },
    showSubmit: { type: Boolean, default: true },
    showBack: { type: Boolean, default: true },
    inline: {type: Boolean, default: false},
    submitButtonIconOnly: {type: Boolean, default: false},
    cancelButtonIconOnly: {type: Boolean, default: false},
    backButtonIconOnly: {type: Boolean, default: false}
  },
  computed: {
    ...mapState('messages',{ 'errors': 'fields' }),
    buttonsRowClass() {
      if (this.buttonsAlignment === 'center') {
        return 'text-center';
      }
      if (this.buttonsAlignment === 'right') {
        return 'text-right';
      }
      return null;
    },
  },
  methods: {
    ...mapActions('messages', ['resetFields']),
    doSubmit() {
      this.resetFields();
      this.$emit('submit');
    },
  }
};
</script>
<style lang="scss" scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.75);
}

.filter-form {
  &.form-inline {
    @media(max-width: 768px){
      .form-row {
        margin-left: 0 !important;
        margin-right: 0 !important;
        & > [class*="col-"] {
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
  }
}
</style>
