<script>
  import { Line } from 'vue-chartjs';

  export default {
    name: 'ChartLine',
    extends: Line,
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
