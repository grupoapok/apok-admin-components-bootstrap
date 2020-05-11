<template>
  <table class="table table-hover">
    <thead>
    <tr>
      <th class="compact"></th>
      <th>{{ 'businessHours.days' | translate}}</th>
      <th>{{ 'businessHours.hours' | translate}}</th>
      <th class="compact">
        <icon-button icon="plus" icon-only @click="addBusinessHour" variant="outline-darkcyan" id="add-bh-button" class="text-admin border-admin pt-1" v-if="!readonly"></icon-button>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(bh, i) in value" :key="`bh_${i}`">
      <td class="compact">
        <icon-button v-if="value.length > 1 && !readonly" variant="outline-danger" icon-only icon="times" @click="removeBusinessHour(i)"/>
      </td>
      <td>
        <b-form-checkbox-group
          v-model="bh.days"
          :disabled="readonly"
          :options="daysOptions"
        />
      </td>
      <td colspan="2">
        <b-form>
          <b-form-row v-for="(h,j) in bh.hours" :key="`hours_${i}_${j}`">
            <AdminFormField :hideDial="hideOpen" @showing="changeShow('close')" :readonly="readonly" class="col-sm-2" type="time" buttons-variant="outline-lightcyan" :id="`open-${j}`" v-model="h.open"/>
            <AdminFormField :hideDial="hideClose" @showing="changeShow('open')" :readonly="readonly" class="col-sm-2" type="time" buttons-variant="outline-lightcyan" :id="`close-${j}`" v-model="h.close"/>
            <b-form-group class="col-sm-2" v-if="bh.hours.length > 1 && !readonly">
              <icon-button icon-only variant="outline-danger" icon="times"
                           @click="removeHours(i,j)"></icon-button>
            </b-form-group>
          </b-form-row>
        </b-form>
        <icon-button v-if="!readonly" icon-only variant="outline-darkorange" class="text-admin border-admin pt-1" icon="plus" @click="addHours(i)"></icon-button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  //import IconButton from '@/components/IconButton';
  //  import AdminFormField from '@/components/AdminFormField';

  export default {
    name: 'BusinessHours',
    /*components: {
      IconButton,
      AdminFormField: () => import('@/components/AdminFormField'),
  },*/
  data() {
    return {
      days: {
        sun: 'calendar.days.domingo',
        mon: 'calendar.days.lunes',
        tue: 'calendar.days.martes',
        wed: 'calendar.days.miercoles',
        thu: 'calendar.days.jueves',
        fri: 'calendar.days.viernes',
        sat: 'calendar.days.sabado',
      },
      hideOpen: false,
      hideClose: false,
    };
  },
  props: {
    readonly: {
      type: Boolean,
    default: false
    },
    value: {
      type: Array,
    default(){
        return [
          {
            days: [],
            hours: [
              {
                open: null,
                close: null,
              }
            ],
          }
        ];
      }
    },
  },
  computed: {
    daysOptions() {
      const options = [];
      Object.keys(this.days).forEach(d => {
        options.push({ value: d, text: this.$t(this.days[d]) });
      });
      return options;
    },
  },
  methods: {
    addBusinessHour() {
      this.value.push({
        days: [],
        hours: [],
      });
      this.$emit('input', this.value);
    },
    removeBusinessHour(index){
      this.value.splice(index, 1);
      this.$emit('input', this.value);
    },
    addHours(index) {
      this.value[index].hours.push({
        open: null,
        close: null,
      });
      this.$emit('input', this.value);
    },
    removeHours(index, hindex) {
      this.value[index].hours.splice(hindex, 1);
      this.$emit('input', this.value);
    },
    changeShow(val) {
      if (val === 'open'){
        this.hideOpen = true;
        setTimeout(() => {
          this.hideOpen = false
        }, 500)
      }
      if (val === 'close') {
        this.hideClose = true;
        setTimeout(() => {
          this.hideClose = false
        }, 50)
      }
    },
  },
  mounted() {
    const addBtn = document.getElementById("add-bh-button")
    if (addBtn) {
      addBtn.click();
    }
    },
  };
</script>

<style scoped>

</style>
