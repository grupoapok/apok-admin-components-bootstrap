export default {
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
  computed: {
    state() {
      if (this.error === null) {
        return null;
      }
      return !this.error;
    }
  },
  methods: {
    emit(e) {
      this.$emit("input", e);
    },
  }
}
