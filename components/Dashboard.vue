<template>
  <div class="dashboard-container">
  <!-- START OF SAMPLE CONTENT -->
    <template v-if="sample">
      <div class="row flex-row">
        <div class="col">
          <div class="card shadow bg-primary text-white">
            <div class="card-body">
              <h3> 23 </h3>
              <hr class="mb-1">
              <div class="card-text"> Workers </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card shadow bg-light">
            <div class="card-body">
              <h3> 12 </h3>
              <hr class="mb-1">
              <div class="card-text"> Servers </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card shadow bg-success text-white">
            <div class="card-body">
              <h3> 180% </h3>
              <hr class="mb-1">
              <div class="card-text"> Revenue </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card shadow bg-warning">
            <div class="card-body">
              <h3> 3 left </h3>
              <hr class="mb-1">
              <div class="card-text"> Items </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-dark text-white">
              <h6> <icon-renderer icon="chart-bar"/> Bar Chart sample</h6>
            </div>
            <div class="card-body">
              <chart-renderer chart="bar" :height="40" :width="100"/>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-dark text-white">
              <h6> <icon-renderer icon="chart-line"/> Line Chart sample</h6>
            </div>
            <div class="card-body">
              <chart-renderer chart="line" :height="40" :width="100"/>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-dark text-white">
              <h6> <icon-renderer icon="chart-pie"/> Pie Chart sample</h6>
            </div>
            <div class="card-body">
              <chart-renderer chart="pie" :width="100"/>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-dark text-white">
              <h6> <icon-renderer icon="soap"/> Bubble Chart sample</h6>
            </div>
            <div class="card-body">
              <chart-renderer chart="radar" :width="100"/>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-dark text-white">
              <h6> <icon-renderer icon="table"/> Table sample</h6>
            </div>
            <div class="card-body">
              <table-renderer/>
            </div>
          </div>
        </div>
      </div>
    </template>
  <!-- END OF SAMPLE CONTENT -->

    <div class="row" v-for="row in rows" :key="`row_${row}`">
      <template v-for="col in columns" >
        <div class="col" :key="`column_${col}`" v-if="hasSlot(row, col)">
          <slot :name="`tile_${row}_${col}`"/>
        </div>
      </template>

    </div>

  </div>
</template>

<script>

  export default {
    props: {
      sample: {
        type: Boolean,
        default: () => false,
      },
      columns: {
        type: Number,
        default: () => 0,
      },
      rows: {
        type: Number,
        default: () => 0,
      },
    },
    methods: {
      hasSlot(row, col) {
        return !!this.$slots[`tile_${row}_${col}`]
      }
    }
  }

</script>

<style lang="scss" scoped>

  .dashboard-container {
    padding-bottom: 24px;
  }

  .row {
    padding-bottom: 24px;
  }

</style>
