<script>
  import { Pie } from 'vue-chartjs';

  export default {
    name: 'ChartPie',
    extends: Pie,
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
