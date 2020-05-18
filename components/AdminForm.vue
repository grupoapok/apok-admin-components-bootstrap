<template>
<<<<<<< HEAD
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
=======
  <div>
>>>>>>> develop

    <template v-if="actionsTop">
      <b-row :class="[showDivider && 'mt-3']" v-if="!inline">
        <b-col v-if="!readOnly && (showSubmit || showCancel || showDeleteButton)" :class="buttonsRowClass">
          <loading-button
            type="submit"
            v-if="showSubmit"
            :variant="submitButtonVariant"
            :icon-only="submitButtonIconOnly"
            :loading="loading"
            :icon="submitButtonIcon"
            :class="[showCancel && 'mr-2']"
            class="btn-submit"
          ><span v-if="submitButton && !submitButtonIconOnly">{{ submitButton | translate }}</span></loading-button>
          <icon-button
            v-if="showCancel"
            type="button"
            :variant="cancelButtonVariant"
            :icon-only="cancelButtonIconOnly"
            :icon="cancelButtonIcon"
            @click="$emit('cancel')"
            class="btn-cancel"
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
            class="btn-back"
          ><span v-if="backButton && !backButtonIconOnly">{{ backButton | translate }}</span></icon-button>
        </b-col>
        <b-col class="align-self-end text-right" :class="buttonsRowClass">
          <icon-button
            v-if="showDeleteButton"
            type="button"
            :variant="deleteButtonVariant"
            :icon="deleteButtonIcon"
            :icon-only="deleteButtonIconOnly"
            @click="$emit('delete')"
            class="btn-delete"
          ><span v-if="deleteButton && !deleteButtonIconOnly">{{ deleteButton | translate }}</span></icon-button>
        </b-col>
      </b-row>
    </template>

    <b-form
      v-on:keydown.enter.prevent=""
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
              :id="field.model"
              v-bind="field"
              @clearError="() => clearError(field)"
              @input="$emit('fieldChanged')"
            />
          </b-form-row>
        </template>

        <b-form-row
          v-else :key="`row_${i}`"
          :class="[inline && 'w-100', readOnly && 'px-5 p-2 read-only']"
        >
          <admin-form-field
            :inline="inline"
            v-for="(field, j) in row"
            v-model="formVar[field.model]"
            :key="`field_${i}_${j}`"
            :readonly="loading || readOnly || field.loading || field.readOnly"
            :error="errors[field.model]"
            :id="field.model"
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
              class="btn-submit"
            ><span v-if="submitButton && !submitButtonIconOnly">{{ submitButton | translate }}</span></loading-button>
            <icon-button
              v-if="showCancel"
              type="button"
              :variant="cancelButtonVariant"
              :icon="cancelButtonIcon"
              :icon-only="cancelButtonIconOnly"
              @click="$emit('cancel')"
              class="btn-cancel"
            ><span v-if="cancelButton && !cancelButtonIconOnly">{{ cancelButton | translate}}</span></icon-button>
            <icon-button
              v-if="showDeleteButton"
              type="button"
              :variant="deleteButtonVariant"
              :icon="deleteButtonIcon"
              :icon-only="deleteButtonIconOnly"
              @click="$emit('delete')"
              class="btn-delete"
            ><span v-if="deleteButton && !deleteButtonIconOnly">{{ deleteButton | translate}}</span></icon-button>
          </div>
        </b-form-row>
      </template>

      <b-form-row v-if="!inline">
        <slot></slot>
      </b-form-row>

<<<<<<< HEAD
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
=======
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
        <b-row :class="[showDivider && 'mt-3']" v-if="!inline">
          <b-col v-if="!readOnly && (showSubmit || showCancel || showDeleteButton)" :class="buttonsRowClass">
            <loading-button
              type="submit"
              v-if="showSubmit"
              :variant="submitButtonVariant"
              :icon-only="submitButtonIconOnly"
              :loading="loading"
              :icon="submitButtonIcon"
              :class="[showCancel && 'mr-2']"
              class="btn-submit"
            ><span v-if="submitButton && !submitButtonIconOnly">{{ submitButton | translate }}</span></loading-button>
            <icon-button
              v-if="showCancel"
              type="button"
              :variant="cancelButtonVariant"
              :icon-only="cancelButtonIconOnly"
              :icon="cancelButtonIcon"
              @click="$emit('cancel')"
              class="btn-cancel"
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
              class="btn-back"
            ><span v-if="backButton && !backButtonIconOnly">{{ backButton | translate }}</span></icon-button>
          </b-col>
          <b-col class="align-self-end text-right" :class="buttonsRowClass">
            <icon-button
              v-if="showDeleteButton"
              type="button"
              :variant="deleteButtonVariant"
              :icon="deleteButtonIcon"
              :icon-only="deleteButtonIconOnly"
              @click="$emit('delete')"
              class="btn-delete"
            ><span v-if="deleteButton && !deleteButtonIconOnly">{{ deleteButton | translate }}</span></icon-button>
          </b-col>
        </b-row>
      </template>
    </b-form>
  </div>
>>>>>>> develop
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
<<<<<<< HEAD
    errors: {
      type: Object,
      default() {
        return {};
      },
    },
    fields: {
=======
    formFields: {
>>>>>>> develop
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
<<<<<<< HEAD
=======
    ...mapActions('messages', ['resetFields']),
    clearError() {

    },
>>>>>>> develop
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
