<template>
  <div class="calendar-container flex flex-grow-1">

    <b-form-input
      type="text"
      :state="state"
      :value="formattedValue"
      class="w-100 d-none d-sm-block"
      :class="{'readonly': readonly}"
      readonly
      :disabled="readonly"
      @focus.native="showCalendar"
      @keyup.esc.native="show = false"
    />
    <div :class="['calendar-popup', show && 'd-block open']">
      <button type="button" class="close mr-2" aria-label="Close" @click="show = false">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="d-flex flex-row mt-4 align-items-center px-2">
        <a class="btn btn-link month_nav" @click="addMonth(-1)" v-if="canSelectMonth">
          <icon icon="angle-left"></icon>
        </a>
        <b-select
          v-if="canSelectMonth"
          class="monthSelector flex-fill"
          :options="monthsOptions"
          :value="startDate.month()"
          @change="changeMonth"
        />
        <span
          class="monthSelector text-right font-weight-bold pr-2"
          v-else
        >{{ monthsNames[startDate.month()] | translate }}</span>
        <b-select
          class="yearSelector flex-fill"
          :options="yearsOptions"
          v-if="canSelectYear"
          :value="startDate.year()"
          @change="changeYear"
        />
        <span v-else class="yearSelector text-left font-weight-bold pl-2"
        >{{ startDate.format('YYYY') | translate }}</span>
        <a class="btn btn-link month_nav" @click="addMonth(1)" v-if="canSelectMonth">
          <icon icon="angle-right"></icon>
        </a>
      </div>
      <table class="table">
        <thead>
        <tr class="compact">
          <th class="text-center" v-for="(d,i) in daysNames" :key="`dn_${i}`">{{ d | translate }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(w, i) in dates" :key="`sem_${i}`" class="compact">
          <td
            v-for="(d,j) in w"
            :key="`dia_${i}_${j}`"
            :class="['text-center day', d.format(format) === value && 'active', isOffMonth(d) && 'off-month']"
            @click="selectDate(d)"
          >{{ d.format("DD") }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import Icon from "./Icon";

  export default {
    name: "AdminFieldCalendar",
    components: { Icon },
    data() {
      return {
        internalStartDate: "",
        show: false
      };
    },
    props: {
      value: String,
      readonly: Boolean,
      state: {
        type: String,
        default: null
      },
      canSelectYear: {
        type: Boolean,
        default: true
      },
      canSelectMonth: {
        type: Boolean,
        default: true
      },
      format: {
        type: String,
        default() {
          return "YYYY-MM-DD";
        }
      },
      displayFormat: {
        type: String,
        default() {
          return "DD/MM/YYYY";
        }
      },
      daysNames: {
        type: Array,
        default() {
          return [
            "calendar.days.domingo",
            "calendar.days.lunes",
            "calendar.days.martes",
            "calendar.days.miercoles",
            "calendar.days.jueves",
            "calendar.days.viernes",
            "calendar.days.sabado"
          ];
        }
      },
      monthsNames: {
        type: Array,
        default() {
          return [
            "calendar.months.enero",
            "calendar.months.febrero",
            "calendar.months.marzo",
            "calendar.months.abril",
            "calendar.months.mayo",
            "calendar.months.junio",
            "calendar.months.julio",
            "calendar.months.agosto",
            "calendar.months.septiembre",
            "calendar.months.octubre",
            "calendar.months.noviembre",
            "calendar.months.diciembre"
          ];
        }
      }
    },
    computed: {
      formattedValue() {
        if (this.value) {
          return moment(this.value).format(this.displayFormat);
        }
        return null;
      },
      monthsOptions() {
        return this.monthsNames.map((m, i) => ({ value: i, text: this.$t(m) }));
      },
      yearsOptions() {
        const currentYear = moment(this.internalStartDate).year();
        let startYear = currentYear - 100;
        const years = [];
        while (startYear <= currentYear) {
          years.push(startYear);
          startYear += 1;
        }
        return years;
      },
      dates() {
        const month = [];
        let start = moment(this.startDate)
          .day(0)
          .unix();
        const end = moment(this.endDate)
          .day(6)
          .unix();
        while (start < end) {
          const week = [];
          for (let d = 0; d < 7; d += 1) {
            week.push(moment(start * 1000));
            start += 86400;
          }
          month.push(week);
        }
        return month;
      },
      startDate() {
        return moment(this.internalStartDate)
          .set("date", 1)
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
      },
      endDate() {
        return moment(this.startDate)
          .add(1, "months")
          .subtract(1, "days");
      }
    },
    watch: {
      value: {
        handler: "updateInternalStartDate",
        immediate: true
      }
    },
    methods: {
      showCalendar() {
        this.show = !this.readonly && true;
      },
      updateInternalStartDate(val) {
        if (val) {
          this.internalStartDate = val;
        } else {
          this.internalStartDate = new Date();
        }
      },
      selectDate(date) {
        this.$emit("input", date.format(this.format));
        this.show = false;
      },
      addMonth(n) {
        this.updateInternalStartDate(
          moment(this.internalStartDate)
            .add(n, "months")
            .format(this.format)
        );
      },
      changeMonth(n) {
        this.updateInternalStartDate(
          moment(this.internalStartDate)
            .month(n)
            .format(this.format)
        );
      },
      changeYear(n) {
        this.updateInternalStartDate(
          moment(this.internalStartDate)
            .year(n)
            .format(this.format)
        );
      },
      isOffMonth(d) {
        return d.month() !== moment(this.internalStartDate, this.format).month()
      }
    }
  };
</script>

<style scoped lang="scss">
  .calendar-container {
    position: relative;

    .yearSelector, .monthSelector {
      flex-grow: 1;
    }

    .month_nav {
      cursor: pointer;
      flex-shrink: 1;
      flex-grow: 0;
    }
    .monthSelector {
      text-align-last: right;
      option {
        direction: rtl;
      }
    }
    input {
      background: $input-bg !important;
      &.readonly {
        background: $input-disabled-bg !important;
      }
    }
    .close {
      outline: none !important;
    }
    .calendar-popup {
      background: $input-bg !important;
      display: none;
      position: absolute;
      top: calc(100% - 1px);
      left: 0;
      z-index: 999;
      border: $input-border-width solid $input-border-color;
      border-bottom-left-radius: $input-border-radius;
      border-bottom-right-radius: $input-border-radius;
      .table {
        margin-bottom: 0;
        thead {
          &:first-child {
            th {
              border-top: none;
              .selector {
                margin-left: 1em;
                margin-right: 0;
                width: calc(50% - 2em);
                & + .selector {
                  margin-left: 0.5em;
                  margin-right: 1em;
                }
              }
            }
          }
        }
        tr {
          &.compact {
            th,
            td {
              padding: 0.5rem;
            }
          }
          th {
            a.month_nav {
              cursor: pointer;
            }
          }
          td {
            cursor: pointer;
            background: white;
            &:hover {
              background: $primary;
              color: color-yiq($primary);
            }
            &.active {
              background: $primary;
              color: color-yiq($primary);
            }
            &.off-month {
              opacity: .5;
            }
          }
        }
      }
    }
  }
</style>
