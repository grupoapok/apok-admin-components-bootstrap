<template>
  <b-form @submit.prevent="doSubmit" class="admin-form" style="position: relative">
    <transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <icon-renderer icon="loading" size="48px" mdi spin/>
      </div>
    </transition>
    <template v-for="(row, i) in fields">
      <template v-if="row.hasOwnProperty('title') && Array.isArray(row.fields)">
        <h2 :key="`title_${i}`">{{ row.title | translate }}</h2>
        <hr :key="`hr_${i}`">

        <b-form-row v-for="(rows, k) in row.fields" :key="`rows_${i}_${k}`">
          <admin-form-field
            v-for="(field, j) in rows"
            v-model="formVar[field.model]"
            :readonly="loading || readonly || field.loading"
            :key="`field_${i}_${k}_${j}`"
            :error="errors[field.model]"
            v-bind="field"
            @input="$emit('fieldChanged')"
          />
        </b-form-row>
      </template>
      <b-form-row v-else :key="`rows_${i}`">
        <admin-form-field
          v-for="(field, j) in row"
          v-model="formVar[field.model]"
          :readonly="loading || readonly || field.loading"
          :key="`field_${i}_${j}`"
          :error="errors[field.model]"
          v-bind="field"
          @input="$emit('fieldChanged')"
        />
      </b-form-row>
    </template>

    <b-form-row>
      <slot/>
    </b-form-row>

    <hr class="my-0" v-if="showDivider">
    <b-row :class="[showDivider && 'mt-3']">
      <b-col v-if="!readonly && (showSubmit || showCancel)" :class="buttonsRowClass">
        <button-renderer
          type="submit"
          v-if="(submitButtonText || submitButtonIcon) && showSubmit"
          :variant="submitButtonVariant"
          :icon-only="submitButtonIconOnly"
          :loading="loading"
          :icon="submitButtonIcon"
          :class="{'mr-2': showCancel}"
        ><span v-if="submitButtonText && !submitButtonIconOnly">{{ submitButtonText | translate }}</span></button-renderer>
        <button-renderer
          v-if="(cancelButtonText || cancelButtonIcon) && showCancel"
          type="button"
          :variant="cancelButtonVariant"
          :icon-only="cancelButtonIconOnly"
          :icon="cancelButtonIcon"
          @click="$emit('cancel')"
        ><span v-if="cancelButtonText && !cancelButtonIconOnly">{{ cancelButtonText | translate}}</span></button-renderer>
      </b-col>
      <b-col v-if="readonly && showBack" :class="buttonsRowClass">
        <button-renderer
          v-if="(backButtonText || backButtonIcon) && showBack"
          type="button"
          :variant="backButtonVariant"
          :icon="backButtonIcon"
          :icon-only="backButtonIconOnly"
          @click="$emit('cancel')"
        ><span v-if="backButtonText && !backButtonIconOnly">{{ backButtonText | translate }}</span></button-renderer>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
  import AdminFormField from "./AdminFormField";

  export default {
    name: 'AdminForm',
    components: { AdminFormField },
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
      errors: {
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
      readonly: { type: Boolean, default: false },
      loading: { type: Boolean, default: false },
      showDivider: { type: Boolean, default: true },
      buttonsAlignment: { type: String, default: 'left' },
      submitButtonText: { type: String, default: 'actions.save' },
      submitButtonVariant: { type: String, default: 'primary' },
      submitButtonIcon: { type: String, default: 'save' },
      cancelButtonText: { type: String, default: 'actions.cancel' },
      cancelButtonVariant: { type: String, default: null },
      cancelButtonIcon: { type: String, default: 'angle-left' },
      backButtonText: { type: String, default: 'actions.goBack' },
      backButtonVariant: { type: String, default: 'primary' },
      backButtonIcon: { type: String, default: 'angle-left' },
      showCancel: { type: Boolean, default: true },
      showSubmit: { type: Boolean, default: true },
      showBack: { type: Boolean, default: true },
      submitButtonIconOnly: {type: Boolean, default: false},
      cancelButtonIconOnly: {type: Boolean, default: false},
      backButtonIconOnly: {type: Boolean, default: false}
    },
    computed: {
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
      doSubmit() {
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
