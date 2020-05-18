<template>
  <b-form-checkbox
    :state="state"
    :disabled="readonly"
    v-bind="[$attrs.props, $attrs]"
    :checked="value"
    @input="emit"
  >
    {{ label | translate }}
  </b-form-checkbox>
</template>

<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormCheck',
    mixins: [InputMixin],
  }
</script>
