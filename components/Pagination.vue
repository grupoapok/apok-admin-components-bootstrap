<template>
  <span>
    <b-pagination-nav :link-gen="generator"
                      :number-of-pages="totalPages"
                      :value="currentPage"
                      @input="$emit('onPageChanged', $event)"
                      align="right"
                      class="ml-2 d-none d-sm-inline-block"
                      id="normal_pagination"/>
    <b-form class="d-block d-sm-none mt-3" inline>
      <label>Go to page:</label>
      <b-form-select :value='currentPage' @change="$emit('onPageChanged',$event)">
        <option
          :key="`page_${i}`"
          :value="p"
          v-for="(p, i) in totalPages"
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
