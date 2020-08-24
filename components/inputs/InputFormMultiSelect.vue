<template>
  <div
    :class="['multi-select-container form-control d-flex flex-column', readonly && 'readonly']"
  >
    <div class="multi-select-input d-flex flex-row flex-wrap align-items-center">
      <span
        class="selected-option d-inline-flex flex-row align-items-center h-100"
        v-for="(selected, i) in Array.from(selectedOptions)"
        :key="`selectedOption_${i}`"
      >
        <icon-renderer
          icon="times"
          class="delete-option mr-2"
          @click.native="deleteOption(selected)"
          v-if="!readonly"
        />
        {{ selected.text | translate }}
      </span>
      <span
        class="text-secondary"
        v-if="Array.from(selectedOptions).length === 0"
        @click="$refs.input.focus()"
      >
        {{ placeholder | translate }}
      </span>
      <input
        type="text"
        ref="input"
        :readonly="readonly"
        v-model="filter"
        @focus="showOptionsList"
        @keyup.esc="hideOptions($event)"
        @keyup.down="changeHighlightedOption(1)"
        @keyup.up="changeHighlightedOption(-1)"
        @keydown.tab="chooseOption"
      />
    </div>
    <div
      class="multi-select-options w-100"
      :class="[showOptions && 'd-block', !showOptions && 'd-none']"
    >
      <div
        v-for="(option, i) in filteredOptions"
        :key="`option_${i}`"
        class="option"
        :class="{'hovered': highlightedOption === i}"
        @click="select(option)"
        @mouseover="highlightedOption = i"
        @keyup.esc.native="hideOptions($event)"
      >
        {{ option.text | translate }}
      </div>
    </div>
  </div>
</template>

<script>
  import InputMixin from "./InputMixin";

  export default {
    name: 'InputFormMultiSelect',
    mixins: [InputMixin],
    data() {
      return {
        showOptions: false,
        selectedOptions: new Set(),
        filter: null,
        highlightedOption: -1
      };
    },
    props: {
      value: Array,
      options: {
        type: Array,
        default(){
          return [];
        }
      },
      state: {
        type: String,
        default: null
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: 'Select Options',
      },
    },
    computed: {
      filteredOptions() {
        if (this.filter) {
          return this.availableOptions.filter(o => o.label.match(new RegExp(`${this.filter}.*`)))
        }
        return this.availableOptions
      },
      availableOptions() {
        const selectedOptionsArr = Array.from(this.selectedOptions).map(so => so.value);
        return this.processedOptions.filter(o => selectedOptionsArr.indexOf(o.value) === -1);
      },
      processedOptions() {
        return this.options.map(o => {
          if (typeof(o) === 'object' && o.hasOwnProperty('value') && o.hasOwnProperty('text')) {
            return o;
          }
          return {
            label: `${o}`,
            value: o
          }
        })
      }
    },
    methods: {
      chooseOption(e){
        if (this.highlightedOption !== -1){
          e.preventDefault();
          this.select(this.filteredOptions[this.highlightedOption]);
          this.$refs.input.focus();
        }
      },
      changeHighlightedOption(inc){
        this.highlightedOption = (this.highlightedOption + inc) % this.filteredOptions.length;
        if (this.highlightedOption < 0){
          this.highlightedOption += this.filteredOptions.length;
        }
      },
      doEmit() {
        const values = Array.from(this.selectedOptions).map(v => v.value);
        this.$emit('input', values);
        this.hideOptions()
      },
      select(value) {
        const newSet = new Set();
        this.selectedOptions.forEach(e => newSet.add(e));
        newSet.add(value);
        this.selectedOptions = newSet;
        this.doEmit();
      },
      deleteOption(selectedOption) {
        const newSet = new Set();
        this.selectedOptions.forEach((so) => {
          if (so.value !== selectedOption.value) {
            newSet.add(so);
          }
        });
        this.selectedOptions = newSet;
        this.doEmit();
      },
      showOptionsList() {
        if (!this.readonly) {
          this.showOptions = true;
        }
      },
      hideOptions() {
        this.showOptions = false;
        this.filter = null;
        this.highlightedOption = -1;
        this.$refs.input.blur();
      },
      updateSelected(value) {
        if (value) {
          this.selectedOptions = new Set();
          const optionsVals = this.processedOptions.map(o => o.value);
          value.forEach((v) => {
            const indexOfV = optionsVals.indexOf(v);
            if (indexOfV !== -1) {
              this.selectedOptions.add(this.processedOptions[indexOfV]);
            }
          });
        }
      },
    },
    watch: {
      value: {
        handler: 'updateSelected',
        immediate: true,
      },
      options() {
        this.updateSelected(this.value);
      },
    },
  };
</script>

<style lang="scss">
  .multi-select-container {
    position: relative;
    flex-grow: 1;
    height: initial;
    min-height: calc(2.25rem + 2px);
    &.readonly {
      background-color: $input-disabled-bg;
    }
    input {
      border: none;
      background: none;
      min-width: 75px;
      width: 0;
      flex-grow: 1;
      outline: none;
      box-shadow: none;
    }
    .selected-option {
      white-space: nowrap;
      margin-right: .5rem;
      border: 1px solid $multiselect-chip-bg;
      background: $multiselect-chip-bg;
      color: color-yiq($multiselect-chip-bg);
      font-size: .8rem;
      padding: 0 .5rem;
      border-radius: .25rem;
      .delete-option {
        cursor: pointer;
      }
    }
    .multi-select-options {
      border: 1px solid $input-border-color;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      position: absolute;
      background: white;
      top: calc(100% - 1px);
      left: 0;
      max-height: 150px;
      overflow: auto;
      z-index: 1;
      .option {
        cursor: pointer !important;
        padding: .375rem .75rem;
        &.hovered {
          background: lighten($primary, .5);
          color: color-yiq(lighten($primary, .5))
        }
      }
    }
  }
</style>
