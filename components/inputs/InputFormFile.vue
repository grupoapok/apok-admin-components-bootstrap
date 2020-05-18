<template>
  <div class="w-100">
    <b-form-file
      :disabled="readonly"
      :state="state"
      :value="value"
      @change="selectFile"
      v-bind="[$attrs.props, $attrs]"/>

    <transition name="fade">
      <div class="thumbnail ml-0 mt-2" v-if="showThumbnail">
        <b-img
          :src="thumbnail"
          class="img-thumbnail"
          v-bind="$attrs.props.thumbnail"
          v-if="thumbnail"
        />
      </div>
    </transition>
  </div>
</template>

<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormFile',
    mixins: [InputMixin],
    computed: {
      showThumbnail() {
        return (
          this.type === "file" &&
          this.$attrs.hasOwnProperty("props") &&
          this.$attrs.props.hasOwnProperty("showThumbnail") &&
          this.$attrs.props.showThumbnail &&
          !!this.value
        );
      },
      thumbnail() {
        if (!!this.value) {
          if (typeof this.value === "string" || this.value instanceof String) {
            return this.value;
          }
          return window.URL.createObjectURL(this.value);
        }
        return null;
      },
    },
    methods: {
      selectFile(e) {
        this.emit(e.target.files[0]);
      }
    },
  }
</script>
