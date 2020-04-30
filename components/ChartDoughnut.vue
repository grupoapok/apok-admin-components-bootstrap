<script>
  import { Doughnut } from 'vue-chartjs';

  export default {
    name: 'ChartDoughnut',
    extends: Doughnut,
    props: ['data', 'options'],
    watch: {
      data() {
        this.c();
      },
    },
    methods: {
      c() {
        if (this.data.labels.length > 0) {
          this.renderChart(this.data, this.options);
        }
      },
    },
    mounted() {
      this.c();
    },
  };
</script>
