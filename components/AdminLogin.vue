<template>
  <div>
    <b-form
      @keydown.enter.prevent="doSubmit"
      @submit.prevent="doSubmit"
      class="admin-form"
      style="position: relative"
      :inline="inline">
      <transition name="fade">
        <div v-if="loading" class="loading-overlay">
          <icon icon="loading" size="48px" mdi spin/>
        </div>
      </transition>
      <template v-for="(row, i) in formFields">
        <template v-if="!inline && row.hasOwnProperty('title') && Array.isArray(row.fields)">
          <h4 :key="`title_${i}`" class="pt-2" :class="row.fielsetClass">{{ row.title | translate }}</h4>
          <hr class="pb-3" :key="`hr_${i}`" v-if="!row.hideDivider">

          <b-form-row
            v-for="(rows, k) in row.fields"
            :key="`rows_${i}_${k}`"
            :class="readOnly && 'px-5 p-2 read-only'"
            class="some"
          >
            <admin-form-field
              :inline="inline"
              v-for="(field, j) in rows"
              v-model="formVar[field.model]"
              :readonly="loading || readOnly || field.loading || field.readOnly"
              :key="`field_${i}_${k}_${j}`"
              :error="errors[field.model]"
              v-bind="field"
              @clearError="() => clearError(field)"
              @input="$emit('fieldChanged')"
            />
          </b-form-row>
        </template>

        <b-form-row
          v-else :key="`row_${i}`"
          :class="[inline && 'w-100', readOnly && 'px-5 p-2 read-only']"
          class="flex-column justify-content-center"
        >
          <admin-form-field
            :inline="inline"
            v-for="(field, j) in row"
            v-model="formVar[field.model]"
            :key="`field_${i}_${j}`"
            :readonly="loading || readOnly || field.loading || field.readOnly"
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
          </div>
        </b-form-row>
      </template>

      <b-form-row v-if="!inline">
        <slot></slot>
      </b-form-row>

      <slot
        :data="formVar"
        name="extra"
      >
      </slot>

      <hr
        class="my-0"
        :class="actionsTop && 'pb-4'"
        v-if="!inline && showDivider">
      <template v-if="!actionsTop">
        <b-row :class="[showDivider && 'mt-3']" v-if="!inline"
               class="flex-column justify-content-center">
          <b-col v-if="!readOnly && (showSubmit || showCancel || showDeleteButton)" :class="buttonsRowClass">
            <loading-button
              type="submit"
              v-if="showSubmit"
              :variant="submitButtonVariant"
              :icon-only="submitButtonIconOnly"
              :loading="loading"
              :icon="submitButtonIcon"
              :class="[showCancel && 'mr-2']"
            ><span v-if="submitButton && !submitButtonIconOnly">{{ submitButton | translate }}</span></loading-button>
          </b-col>
        </b-row>
      </template>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AdminFormField from './AdminFormField';
import Icon from './Icon';
//import IconButton from './IconButton';
import LoadingButton from './LoadingButton';

export default {
  name: 'AdminLogin',
  components: { Icon, /*IconButton,*/ LoadingButton, AdminFormField },
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
    formFields: {
      type: Array,
      default() {
        return [];
      },
    },
    readOnly: { type: Boolean, default: false },
    actionsTop: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    showDivider: { type: Boolean, default: true },
    buttonsAlignment: { type: String, default: 'left' },
    submitButton: { type: String, default: 'actions.save' },
    submitButtonVariant: { type: String, default: 'primary' },
    submitButtonIcon: { type: String, default: 'save' },
    cancelButton: { type: String, default: 'actions.cancel' },
    cancelButtonVariant: { type: String, default: null },
    cancelButtonIcon: { type: String, default: 'angle-left' },
    deleteButton: { type: String, default: 'actions.delete' },
    deleteButtonVariant: { type: String, default: 'danger' },
    deleteButtonIcon: { type: String, default: 'trash' },
    backButton: { type: String, default: 'actions.goBack' },
    backButtonVariant: { type: String, default: 'primary' },
    backButtonIcon: { type: String, default: 'angle-left' },
    showCancel: { type: Boolean, default: true },
    showDelete: { type: Boolean, default: true },
    showSubmit: { type: Boolean, default: true },
    showBack: { type: Boolean, default: true },
    inline: {type: Boolean, default: false},
    submitButtonIconOnly: {type: Boolean, default: false},
    cancelButtonIconOnly: {type: Boolean, default: false},
    deleteButtonIconOnly: {type: Boolean, default: false},
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
    showDeleteButton() {
      if (this.showDelete && this.formVar.id > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapActions('messages', ['resetFields']),
    clearError() {

    },
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
  left: -10px;
  width: calc(100% + 10px);
  height: 100%;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.75);
}
</style>
