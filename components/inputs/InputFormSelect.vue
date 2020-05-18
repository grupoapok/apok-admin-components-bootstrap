<template>
  <b-form-select
    :disabled="readonly || loading"
    :state="state"
    :value="value"
    @input="emit"
    plain
    v-bind="{ ...$attrs.props, options: [] }"
  >
    <template v-for="o in $attrs.props.options">
      <option :value="o.value" v-if="typeof o === 'object'">{{ o.text | translate }}</option>
      <option :value="o" v-else>{{ o }}</option>
    </template>
  </b-form-select>
</template>

<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormSelect',
    mixins: [InputMixin],
  }
</script>
