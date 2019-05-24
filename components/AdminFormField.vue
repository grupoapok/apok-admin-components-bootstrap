<template>
  <div :is="!inline ? 'b-form-group' : 'div'"
       :class="['col-12 col-sm', `form-group-${type}`,state && `form-group-${type}-${state}`, inline && 'd-flex align-items-center mt-2 mt-sm-0 filter-group',$attrs.class]"
       :label="$t(label)"
       :label-for="id"
       :state="state"
       :invalid-feedback="$t(error)"
       :description="$t($attrs.description)"
  >
    <label class="mr-2 mb-0" :for="id" v-if="inline && label">{{ label | translate}}</label>

    <b-input-group :class="[inline && 'flex-grow-1']">
      <transition name="fade">
        <b-input-group-prepend v-if="hasPrepend" is-text>
          <icon v-bind="$attrs.prepend" v-if="$attrs.prepend.hasOwnProperty('icon')"/>
          <span v-else>{{ $attrs.prepend }}</span>
        </b-input-group-prepend>
      </transition>

      <b-form-input
        trim
        :state="state"
        :readonly="readonly"
        :type="type"
        v-if="showTextField"
        v-bind="[$attrs.props, $attrs]"
        :value="value"
        @update="emit"
      />
      <b-form-textarea
        trim
        :state="state"
        :readonly="readonly"
        v-if="type === 'textarea'"
        v-bind="[$attrs.props, $attrs]"
        :value="value"
        @update="emit"
      />
      <b-form-select
        plain
        :state="state"
        :disabled="readonly"
        v-if="type === 'select'"
        v-bind="{ ...$attrs.props, options: [] }"
        :value="value"
        @input="emit"
      >
        <template v-for="o in $attrs.props.options">
          <option v-if="typeof o === 'object'" :value="o.value">{{ o.text | translate }}</option>
          <option v-else :value="o">{{ o }}</option>
        </template>
      </b-form-select>

      <b-form-radio-group
        :state="state"
        :disabled="readonly"
        v-if="type === 'radio'"
        v-bind="[$attrs.props, $attrs]"
        :checked="value"
        @input="emit"
      />
      <b-form-checkbox-group
        :state="state"
        :disabled="readonly"
        v-if="type === 'checkbox'"
        v-bind="[$attrs.props, $attrs]"
        :checked="value"
        @input="emit"
      />
      <calendar
        :state="state"
        :readonly="readonly"
        v-if="type==='calendar'"
        :value="value"
        @input="emit"
        v-bind="[$attrs.props, $attrs]"
      />
      <multi-select
        :state="state"
        :readonly="readonly"
        :value="value"
        v-if="type === 'multiselect'"
        v-bind="[$attrs.props, $attrs]"
        @input="emit"
      />

      <v-select
        :state="state"
        :disabled="readonly"
        :no-drop="readonly"
        :value="value"
        v-if="type === 'vselect'"
        v-bind="[$attrs.props, $attrs]"
        @input="emit"
      />

      <time-picker
        :state="state"
        v-if="type === 'time'"
        :readonly="readonly"
        :value="value"
        v-bind="[$attrs.props, $attrs]"
        @input="emit"
      />

      <b-form-file
        :state="state"
        :value="value"
        v-if="type === 'file'"
        :disabled="readonly"
        @change="selectFile"
        v-bind="[$attrs.props, $attrs]"
      />

      <transition name="fade">
        <b-input-group-append v-if="showRightIcon" is-text>
          <icon
            v-if="hasRightIcon || loading"
            :icon="loading ? 'loading' : $attrs.append.icon"
            :spin="loading"
            :material-icon="hasAppend && $attrs.append.hasOwnProperty('material')"
            :mdi="(hasAppend && $attrs.append.hasOwnProperty('mdi')) || loading"
          />
          <span v-else>{{ $attrs.append }}</span>
        </b-input-group-append>
      </transition>
    </b-input-group>

    <transition name="fade">
      <div v-if="showThumbnail" class="thumbnail">
        <b-img
          v-if="thumbnail"
          :src="thumbnail"
          v-bind="$attrs.props.thumbnail"
          class="img-thumbnail"
        />
      </div>
    </transition>
  </div>
</template>

<script>
  import vSelect from 'vue-select';
  import Calendar from "./Calendar";
  import Icon from "./Icon";
  import MultiSelect from "./MultiSelect";
  import TimePicker from './TimePicker'

  export default {
    name: "AdminFormField2",
    components: { Calendar, Icon, MultiSelect, vSelect, TimePicker },
    inheritAttrs: false,
    props: {
      inline: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: "text"
      },
      label: {
        type: String,
        default: null
      },
      id: {
        type: String,
        default: null
      },
      value: {
        default() {
          return null;
        }
      },
      error: {
        type: String,
        default: null,
      }
    },
    watch: {
      value(val) {
        if (this.type === 'vselect') {
          console.log(this.value);
        }
      }
    },
    computed: {
      hasAppend() {
        return this.$attrs.hasOwnProperty("append");
      },
      hasPrepend() {
        return this.$attrs.hasOwnProperty("prepend");
      },
      showRightIcon() {
        return this.hasAppend || this.loading;
      },
      hasRightIcon() {
        return this.hasAppend && this.$attrs.append.hasOwnProperty("icon");
      },
      showTextField() {
        return (
          this.type !== "checkbox" &&
          this.type !== "radio" &&
          this.type !== "select" &&
          this.type !== "multiselect" &&
          this.type !== "calendar" &&
          this.type !== "textarea" &&
          this.type !== "file" &&
          this.type !== "vselect" &&
          this.type !== "time"
        );
      },
      showThumbnail() {
        return (
          this.type === "file" &&
          this.$attrs.hasOwnProperty("props") &&
          this.$attrs.props.hasOwnProperty("showThumbnail") &&
          this.$attrs.props.showThumbnail &&
          this.value
        );
      },
      thumbnail() {
        if (this.value) {
          if (typeof this.value === "string" || this.value instanceof String) {
            return this.value;
          }
          return window.URL.createObjectURL(this.value);
        }
        return null;
      },
      state() {
        if (this.error) {
          return "invalid";
        }
        return null;
      }
    },
    methods: {
      emit(e) {
        this.$emit("input", e);
      },
      selectFile(e) {
        this.$emit('clearError');
        this.emit(e.target.files[0]);
      }
    },
  };
</script>

<style lang="scss">
  .form-group-file {
    &:not(.form-group-file-invalid) {
      > div[role="group"] {
        display: flex !important;
        flex-direction: row;
        .thumbnail {
          max-width: 33%;
          margin-left: 0.5em;
        }
      }
    }
  }

  .v-select {
    width: 100%;
  }
</style>
