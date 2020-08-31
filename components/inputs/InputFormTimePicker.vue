<template>
  <div class="time-picker-container" @keyup.esc="showDialog = false">
    <b-form-input
      type="time"
      :state="state"
      :value="time"
      class="w-100 d-block d-sm-none"
      :class="{'readonly': readonly}"
      :readonly="readonly"
      @input="$emit('input',$event)"
    />
    <b-form-input
      :value="time"
      :state="state"
      @click="openDialog"
      readonly
      v-bind="$attrs"
      class="w-100 d-none d-sm-block"
      :class="{'readonly': readonly}"
    />
    <div class="time-picker-dialog" v-if="showDialog" :style="dialogWidth">
      <button class="close" @click="showDialog = false">&times;</button>
      <b-container>
        <b-row>
          <b-col v-if="showHours">
            <button-renderer :variant="buttonsVariant" @click="increaseHours" icon-only block
                         icon="chevron-up"/>
          </b-col>

          <b-col v-if="showMinutes">
            <button-renderer :variant="buttonsVariant" @click="increaseMinutes" icon-only block
                         icon="chevron-up"/>
          </b-col>

          <b-col v-if="showSeconds">
            <button-renderer :variant="buttonsVariant" @click="increaseSeconds" icon-only block
                         icon="chevron-up"/>
          </b-col>
        </b-row>

        <b-row class="my-2">
          <b-col v-if="showHours">
            <b-form-input class="text-center" v-model="model.hours" @input="emitFormattedTime"/>
          </b-col>

          <b-col v-if="showMinutes">
            <b-form-input class="text-center" v-model="model.minutes" @input="emitFormattedTime"/>
          </b-col>

          <b-col v-if="showSeconds">
            <b-form-input class="text-center" v-model="model.seconds" @input="emitFormattedTime"/>
          </b-col>
        </b-row>

        <b-row>
          <b-col v-if="showHours">
            <button-renderer :variant="buttonsVariant" @click="decreaseHours" icon-only block
                         icon="chevron-down"/>
          </b-col>
          <b-col v-if="showMinutes">
            <button-renderer :variant="buttonsVariant" @click="decreaseMinutes" icon-only block
                         icon="chevron-down"/>
          </b-col>
          <b-col v-if="showSeconds">
            <button-renderer :variant="buttonsVariant" @click="decreaseSeconds" icon-only block
                         icon="chevron-down"/>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
  import { format } from 'date-fns'

  export default {
    name: "InputFormTimePicker",
    inheritAttrs: false,
    data() {
      return {
        showDialog: false,
        model: {
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }
    },
    props: {
      readonly: {
        type: Boolean,
        default: false,
      },
      state: {
        type: String,
        default: null
      },
      buttonsVariant: {
        type: String,
        default: null
      },
      hoursInterval: {
        type: Number,
        default: 1,
      },
      minutesInterval: {
        type: Number,
        default: 1
      },
      secondsInterval: {
        type: Number,
        default: 1,
      },
      value: {
        type: String,
        default: null
      },
      format: {
        type: String,
        default: 'HH:mm'
      }
    },
    computed: {
      use24Hours() {
        return this.format.indexOf("H") !== -1 || this.format.indexOf("k") !== -1
      },
      showSeconds() {
        return this.format.indexOf("s") !== -1
      },
      showHours() {
        return this.format.indexOf("h") !== -1 || this.format.indexOf("H") !== -1
      },
      showMinutes() {
        return this.format.indexOf("m") !== -1
      },
      time() {
        const time = new Date();
        time.setHours(this.model.hours);
        time.setMinutes(this.model.minutes);
        time.setSeconds(this.model.seconds);
        return format(time, this.format)
      },
      dialogWidth() {
        const colWidth = 75;
        let cols = 0;
        if (this.showHours) cols++;
        if (this.showMinutes) cols++;
        if (this.showSeconds) cols++;
        return {
          maxWidth: `calc(2em + ${cols * colWidth}px)`,
          width: `calc(2em + ${cols * colWidth}px)`
        }
      }
    },
    watch: {
      value: {
        handler: 'updateModel',
        immediate: true
      },
      ['model.hours']() {
        this.$emit('input', this.time)
      },
      ['model.minutes']() {
        this.$emit('input', this.time)
      },
      ['model.seconds']() {
        this.$emit('input', this.time)
      },
    },
    methods: {
      openDialog() {
        if (!this.readonly) {
          this.showDialog = true
        }
      },
      updateModel(val) {
        if (val) {
          const time = new Date(val);
          this.model.hours = time.getHours();
          this.model.minutes = time.getMinutes();
          this.model.seconds = time.getSeconds();
        }
      },
      increaseHours() {
        this.model.hours = (this.model.hours + this.hoursInterval) % (this.use24Hours ? 24 : 12)
      },
      increaseMinutes() {
        this.model.minutes = (this.model.minutes + this.minutesInterval) % 60
      },
      increaseSeconds() {
        this.model.seconds = (this.model.seconds + this.secondsInterval) % 60
      },
      decreaseHours() {
        this.model.hours = (this.model.hours - this.hoursInterval) % (this.use24Hours ? 24 : 12)
        if (this.model.hours < 0) {
          this.model.hours += (this.use24Hours ? 24 : 12)
        }
      },
      decreaseMinutes() {
        this.model.minutes = (this.model.minutes - this.minutesInterval) % 60
        if (this.model.minutes < 0) {
          this.model.minutes += 60
        }
      },
      decreaseSeconds() {
        this.model.seconds = (this.model.seconds - this.secondsInterval) % 60
        if (this.model.seconds < 0) {
          this.model.seconds += 60;
        }
      },
      emitFormattedTime() {
        this.$emit('input', this.time)
      }
    }
  }
</script>

<style scoped lang="scss">
  .time-picker-container {
    flex-grow: 1;
    position: relative;
    input[type="text"], input[type="time"] {
      background: $input-bg !important;
      &.readonly {
        background: $input-disabled-bg !important;
      }
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
      width: 24px;
      text-align: center;
      outline: none !important;
    }
    .container {
      max-width: 300px;
    }
    .time-picker-dialog {
      background: $white;
      border-radius: $input-border-radius;
      padding: calc(24px + .5em) 0 1em 0;
      border: 1px solid $input-border-color;
      position: absolute;
      z-index: 9999;
      left: 0;
      top: 100%;
    }
  }
</style>
