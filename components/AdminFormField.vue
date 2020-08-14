<template>
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
          <template v-if="hasPrepend">
            <b-input-group-prepend
              is-text
              v-for="(p,i) in $attrs.prepend"
              :key="`prepend_${i}`"
            >
              <icon v-bind="p" v-if="typeof p === 'object' && p.hasOwnProperty('icon')"/>
              <span v-else>{{ p }}</span>
            </b-input-group-prepend>
          </template>


            <component
              :is="`form-input-${type}-renderer`" v-bind="[$attrs.props, $attrs, $props]"
              :value="value"
              @input="emit"
            />
          <template v-if="hasAppend">
            <b-input-group-append
              is-text
              v-for="(p,i) in $attrs.append"
              :key="`append_${i}`"
            >
              <icon v-bind="p" v-if="typeof p === 'object' && p.hasOwnProperty('icon')"/>
              <span v-else>{{ p }}</span>
            </b-input-group-append>
            <b-input-group-append v-if="loading" is-text>
              <icon-renderer icon="spinner" spin/>
            </b-input-group-append>
          </template>


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
