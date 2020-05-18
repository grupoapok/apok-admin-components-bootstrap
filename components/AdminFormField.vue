<template>
<<<<<<< HEAD
    <div :is="!inline ? 'b-form-group' : 'div'"
         :class="['col-12 col-sm', `form-group-${type}`,state && `form-group-${type}-${state}`, inline && 'd-flex align-items-center mt-2 mt-sm-0 filter-group',$attrs.class]"
         :label="(type !== 'checkbox') ? $t(label) : ''"
         :label-for="id"
         :label-class="(state!= null && !state) ? 'text-danger' : ''"
         :state="state"
         :invalid-feedback="$t(error)"
         :description="$t($attrs.description)"
    >
        <b-input-group>
            <b-input-group-prepend
                    is-text
                    v-if="hasPrepend"
                    v-for="(p,i) in $attrs.prepend"
                    :key="`prepend_${i}`"
            >
                <icon v-bind="p" v-if="typeof p === 'object' && p.hasOwnProperty('icon')"/>
                <span v-else>{{ p }}</span>
            </b-input-group-prepend>

            <component
              :is="`form-input-${type}-renderer`" v-bind="[$attrs.props, $attrs, $props]"
              :value="value"
              @input="emit"
            />
            <b-input-group-append
                    is-text
                    v-if="hasAppend"
                    v-for="(p,i) in $attrs.append"
                    :key="`append_${i}`"
            >
                <icon v-bind="p" v-if="typeof p === 'object' && p.hasOwnProperty('icon')"/>
                <span v-else>{{ p }}</span>
            </b-input-group-append>
            <b-input-group-append v-if="loading" is-text>
                <icon-renderer icon="spinner" spin/>
            </b-input-group-append>

        </b-input-group>
    </div>
</template>

<script>
    import InputMixin from "./inputs/InputMixin";

    export default {
        name: "AdminFormField",
        mixins: [InputMixin],
        computed: {
            hasAppend() {
                return this.$attrs.hasOwnProperty("append");
            },
            hasPrepend() {
                return this.$attrs.hasOwnProperty("prepend");
            },
        },
    };
=======
  <div :is="!inline ? 'b-form-group' : 'div'"
       :class="['col-12 col-sm', `form-group-${type}`,state && `form-group-${type}-${state}`, inline && 'd-flex flex-column align-items-center mt-2 mt-sm-0 filter-group',$attrs.class]"
       :label-for="id"
       :state="state"
       :invalid-feedback="$t(error)"
       :description="$t($attrs.description)"
  >

    <label v-if="label" class="text-secondary w-100" :for="id">
      <span>
        {{label | translate}}
      </span>
      <small
        v-if="$attrs.tooltip"
        v-b-tooltip.hover
        :title="$attrs.tooltip"
        class="pl-1 info-icon align-self-start">
          <icon icon="info-circle"/>

        </small>
    </label>

    <template v-if="type === 'none'">
      <label class="mr-2 mb-0" :for="id" v-if="inline && label">
        {{ label | translate}}

      </label>
      <div
        trim
        :id="$attrs.props.id || $attrs.model || id"
        :state="state"
        :readonly="readonly"
        v-bind="[$attrs.props, $attrs]"
        :placeholder="$attrs.props ? $t($attrs.props.placeholder) : ''"
        :value="value"
        @update="emit"
      >

      </div>
    </template>

    <template v-else>
      <label class="mr-2 mb-0" :for="id" v-if="inline && label">
        {{ label | translate}}
        <span
          v-b-tooltip.hover
          title="$attrs.props ? $t($attrs.props.tooltip) : ''"
          class="info-icon align-self-center">
          <icon icon="info-circle"/>

        </span>
      </label>

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
          :id="$attrs.props.id || $attrs.model || id"
          :readonly="readonly || $attrs.readonly"
          :disabled="readonly || $attrs.readonly"
          :plaintext="readonly || $attrs.readonly"
          :type="type"
          v-if="showTextField"
          v-bind="[$attrs.props, $attrs]"
          :placeholder="$t($attrs.props ? $attrs.props.placeholder : label)"
          :value="value"
          @update="emit"
          :class="[readonly && 'read-only']"
        />

        <span
          v-if="type === 'link'"
          :id="$attrs.props.id || $attrs.model || id"
          type="text"
          class="form-control-plaintext read-only"
          v-bind="[$attrs.props, $attrs]"
        >
          <template v-if="value">
            <router-link
              class="text-admin"
              :to="value">
            {{ value.label }}
          </router-link>
          </template>
        </span>

        <b-form-textarea
          trim
          :id="$attrs.props.id || $attrs.model || id"
          :state="state"
          :readonly="readonly || $attrs.readonly"
          v-if="type === 'textarea'"
          v-bind="[$attrs.props, $attrs]"
          :placeholder="$attrs.props ? $t($attrs.props.placeholder) : ''"
          :value="value"
          @update="emit"
          :class="[readonly && 'read-only']"
        />

        <b-form-select
          plain
          :id="$attrs.props.id || $attrs.model || id"
          :state="state"
          :disabled="readonly || $attrs.readonly"
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
          :id="$attrs.props.id || $attrs.model || id"
          :state="state"
          :disabled="readonly || $attrs.readonly"
          v-if="type === 'radio'"
          v-bind="[$attrs.props, $attrs]"
          :checked="value"
          @input="emit"
          :class="[readonly && 'read-only']"
          class="w-100 d-flex flex-row justify-content-start"
        >
          <!--<b-form-radio v-for="o, i in $attrs.props.options" :key="`option-${i}`">-->
            <!--{{ $attrs.model }}-->
            <!--<template v-if="typeof o === 'object'" :value="o.value">{{ o.text | translate }}</template>-->
            <!--<template v-else :value="o">{{ o }}</template>-->
          <!--</b-form-radio>-->
        </b-form-radio-group>

        <b-form-checkbox-group
          :id="$attrs.props.id || $attrs.model || id"
          :state="state"
          :disabled="readonly || $attrs.readonly"
          v-if="type === 'checkbox'"
          v-bind="[$attrs.props, $attrs]"
          :checked="value"
          @input="emit"
          :class="[readonly && 'read-only']"
        />

        <admin-field-calendar
          :id="$attrs.props.id || $attrs.model || id"
          :state="state"
          :readonly="readonly || $attrs.readonly"
          v-if="type==='oldcalendar'"
          :value="value"
          @input="emit"
          v-bind="[$attrs.props, $attrs]"
          :class="[readonly && 'read-only']"
        />

        <datetime
          :input-id="$attrs.props.id || $attrs.model || id"
          :state="state"
          :readonly="readonly || $attrs.readonly"
          v-if="type==='datetime' || type==='calendar'"
          :value="value"
          @input="emit"
          :minute-step=5
          :auto=true
          :placeholder="$attrs.props ? $t($attrs.props.placeholder) : ''"
          :min-datetime="new Date().toISOString()"
          v-bind="[$attrs.props, $attrs]"
          :class="[(readonly && 'read-only'), ($attrs.props.id || $attrs.model || id)]"
        />

        <multi-select
          :id="$attrs.props.id || $attrs.model || id"
          :state="state"
          :readonly="readonly || $attrs.readonly"
          :value="value"
          v-if="type === 'multiselect'"
          v-bind="[$attrs.props, $attrs]"
          @input="emit"
          :class="[readonly && 'read-only']"
        />

        <v-select
          :id="$attrs.props.id || $attrs.model || id"
          :state="state"
          :disabled="readonly || $attrs.readonly"
          :no-drop="readonly || $attrs.readonly"
          :value="value"
          v-if="type === 'vselect'"
          v-bind="[$attrs.props, $attrs]"
          :placeholder="$attrs.props ? $t($attrs.props.placeholder) : ''"
          @input="emit"
          :class="[readonly && 'read-only']"
        />

        <time-picker
          :id="$attrs.model || id"
          :state="state"
          v-if="type === 'time'"
          :readonly="readonly || $attrs.readonly"
          :value="value"
          :placeholder="$attrs.props ? $t($attrs.props.placeholder) : ''"
          v-bind="[$attrs.props, $attrs]"
          @input="emit"
          :class="[readonly && 'read-only']"
          @showing="$emit('showing')"
        />

        <b-form-file
          :id="$attrs.props.id || $attrs.model || id"
          :state="state"
          :value="value"
          v-if="type === 'file'"
          :disabled="readonly || $attrs.readonly"
          @change="selectFile"
          v-bind="[$attrs.props, $attrs]"
          :placeholder="$attrs.props ? $t($attrs.props.placeholder) : ''"
          :class="[readonly && 'read-only']"
        />

        <ckeditor
          :id="$attrs.props.id || $attrs.model || id"
          trim
          :state="state"
          :readonly="readonly || $attrs.readonly"
          v-if="type === 'texteditor'"
          v-bind="[$attrs.props, $attrs]"
          :placeholder="$attrs.props ? $t($attrs.props.placeholder) : ''"
          :value="value"
          @input="emit"
          :editor="editor"
        >
        </ckeditor>

        <BusinessHours
          :id="$attrs.props.id || $attrs.model || id"
          v-model="value"
          :readonly="readonly || $attrs.readonly"
          v-if="type === 'businessHours'"
          v-bind="[$attrs.props, $attrs]"
          @input="emit"
          :class="[readonly && 'read-only']"
        />

        <Maps
          :id="$attrs.props.id || $attrs.model || id"
          :state="state"
          :value="value"
          v-if="type === 'map'"
          :disabled="readonly || $attrs.readonly"
          @change="emit"
          @input="emit"
          v-bind="[$attrs.props, $attrs]"
          :placeholder="$attrs.props ? $t($attrs.props.placeholder) : ''"
          :class="[readonly && 'read-only']"
        />

        <template v-if="type === 'nxm'">
          <b-form-input
            trim
            :id="`${id}-n`"
            :state="state"
            :readonly="readonly || $attrs.readonly"
            :plaintext="readonly || $attrs.readonly"
            type="number"
            :min=2
            v-bind="[$attrs.props, $attrs]"
            :placeholder="$t($attrs.props ? $attrs.props.placeholderN : label)"
            :value="valueN"
            @update="updateN"
            :class="[readonly && 'read-only']"
          />
          <b-input-group-append is-text>
            <icon
              :icon="loading ? 'loading' : 'times'"
              :spin="loading"
            />
          </b-input-group-append>
          <b-form-input
            trim
            :id="`${id}-m`"
            :state="state"
            :readonly="readonly || $attrs.readonly"
            :plaintext="readonly || $attrs.readonly"
            type="number"
            :min=1
            :max="valueN - 1"
            v-bind="[$attrs.props, $attrs]"
            :placeholder="$t($attrs.props ? $attrs.props.placeholderM : label)"
            :value="valueM"
            @update="updateM"
          />

        </template>

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
    </template>

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

  import { Datetime } from 'vue-datetime';
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


  export default {
    name: "AdminFormField",
    components: {
      vSelect,
      Datetime,
      ckeditor: CKEditor.component,
      ClassicEditor,
    },
    data() {
      return {
        editor : ClassicEditor,
        valueN : 2,
        valueM : 1,
        nxm: '2x1',
      }
    },
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
      type(newVal) {
        if (this.type === 'nxm') {
          if (this.value) {
            this.nxm = this.value;
          }
        }
      },
      value(newVal) {
        if (this.type === 'nxm') {
          this.nxm = this.value;
        }
      },
      nxm(newVal) {
        this.valueN = newVal.split('x')[0];
        this.valueM = newVal.split('x')[1];
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
          this.type !== "time" &&
          this.type !== "datetime" &&
          this.type !== "texteditor"&&
          this.type !== "nxm"&&
          this.type !== "businessHours"&&
          this.type !== "map"&&
          this.type !== "link"&&
          this.type !== "none"
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
          return false;
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
      },
      updateN(e) {
        this.valueN = e;
        this.nxm = `${this.valueN}x${this.valueM}`;
        this.emit(this.nxm)
      },
      updateM(e) {
        this.valueM = e;
        this.nxm = `${this.valueN}x${this.valueM}`;
        this.emit(this.nxm)
      }
    },
    mounted() {
      if (this.type === 'nxm') {
        if (this.value) {
          this.nxm = this.value;
          this.valueN = this.nxm.split('x')[0];
          this.valueM = this.nxm.split('x')[1];
        }
      }
    },
  };
>>>>>>> develop
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
