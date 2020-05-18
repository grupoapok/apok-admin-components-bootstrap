<template>
  <b-form-input
    trim
    :value="value"
    :state="state"
    :readonly="readonly || loading"
    :type="type"
    v-bind="[$attrs.props, $attrs]"
    @update="emit"
  />
</template>

<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormText',
    mixins: [InputMixin],
  }
</script>
