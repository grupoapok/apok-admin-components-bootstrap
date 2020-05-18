<template>
  <b-form-radio-group
    :checked="value"
    :disabled="readonly"
    :state="state"
    @input="emit"
    v-bind="[$attrs.props, $attrs]"
  />
</template>

<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormRadio',
    mixins: [InputMixin],
  }
</script>
