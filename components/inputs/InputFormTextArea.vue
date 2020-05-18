<template>
  <b-form-textarea
    trim
    :state="state"
    :readonly="readonly || loading"
    v-if="type === 'textarea'"
    v-bind="[$attrs.props, $attrs]"
    :value="value"
    @update="emit"
  />
</template>

<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormTextarea',
    mixins: [InputMixin],
  }
</script>
