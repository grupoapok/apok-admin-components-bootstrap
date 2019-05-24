<template>
  <span>
    <b-pagination-nav id="normal_pagination"
      class="ml-2 d-none d-sm-inline-block"
      align="right"
      :number-of-pages="totalPages"
      :value="currentPage"
      :link-gen="generator"
      @input="$emit('onPageChanged', $event)">
      </b-pagination-nav>
    <b-form inline class="d-block d-sm-none mt-3">
      <label>Go to page:</label>
      <b-form-select :value='currentPage' @change="$emit('onPageChanged',$event)">
        <option
          v-for="(p, i) in totalPages"
          :value="p"
          :key="`page_${i}`"
        >
          {{ p }}
        </option>
      </b-form-select>
    </b-form>
  </span>
</template>

<script>
export default {
  name: 'AdminPagination',
  inheritAttrs: false,
  props: {
    currentPage: {
      default: 1,
    },
    totalPages: {
      default: 1,
    },
  },
  methods: {
    generator() {
      return null;
    },
  },
};
</script>

<style lang="scss">
#normal_pagination {
  ul {
    margin-bottom: 0 !important;
  }
}
</style>
