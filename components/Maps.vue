<template>
  <div
    class="p-0"
    :class="['map-container form-control d-flex flex-column', readOnly && 'readOnly']"
  >
    <div v-if="getPosition" class="geolocation" @click="getCurrentLocation">
      <icon icon="map-marker-alt" />
    </div>
    <GmapMap
      class="col-12"
      :class="mapClass"
      :center="{lat: location.latitude, lng: location.longitude}"
      :zoom="16"
      map-type-id="roadmap"
      style="width: 100%; min-height: 500px"
    >
      <GmapMarker
        :position="{lat: location.latitude, lng: location.longitude}"
        :clickable="true"
        :draggable="true"
        @click="onClick"
        @dragend="onClick"
      />
    </GmapMap>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Icon from './Icon';

  export default {
    name: 'SimpleSelect',
    components: { Icon },
    props: {
      value: {},
      options: {
        type: Array,
      },
      loading: Boolean,
      readOnly: {
        type: Boolean,
        default: false,
      },
      getPosition: {
        type: Boolean,
        default: true,
      },
      mapClass: {
        type: String,
      },
      placeholder: {
        type: String,
        default: 'Map',
      },
      loadingText: {
        type: String,
        default: 'loading',
      },
      noOptionsText: {
        type: String,
        default: 'noOptions',
      },
    },
    data() {
      return {
        showOptions: false,
        location: {
          latitude: 0,
          longitude: 0,
        },
        currentPosition: {
          latitude: 0,
          longitude: 0,
        },
      };
    },
    computed: {
      ...mapState('auth', ['lang']),
      availableOptions() {
        return this.options;
      },
    },
    methods: {
      doEmit(e) {
        this.$emit('input', e);
        this.showOptions = false;
      },
      onClick(e) {
        const location = {
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
        };
        this.doEmit(location);
      },
      setLocation(e) {
        this.location = e;
        this.doEmit(this.location);
      },
      getCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
          this.currentPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          this.setLocation(this.currentPosition);
        });
      },
    },
    watch: {
      value(newVal) {
        this.location = newVal;
        this.currentPosition = newVal;
//        console.log('mapVal', newVal);
      },
    },
    mounted() {
      if (this.value) {
        this.location = this.value;
        this.currentPosition = this.value;
      }
    },
  };
</script>

<style lang="scss">

  .map-container {
    min-height: 500px;
  }

  .geolocation {
    z-index: 99999;
    color: #666666;
    background-color: white;
    font-size: 1.6em;
    text-align: center;
    background: none rgb(255, 255, 255);
    border: 0px;
    margin: 10px;
    padding: 0px;
    position: absolute;
    cursor: pointer;
    user-select: none;
    border-radius: 2px;
    height: 40px;
    width: 40px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
    overflow: hidden;
    top: 50px;
    right: 0px;
  &:hover {
     color: #111;
   }
  }
</style>
