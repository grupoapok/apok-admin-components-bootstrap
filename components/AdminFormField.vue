<template>
    <div :is="!inline ? 'b-form-group' : 'div'"
         :class="['col-12 col-sm', `form-group-${type}`,state && `form-group-${type}-${state}`, inline && 'd-flex align-items-center mt-2 mt-sm-0 filter-group',$attrs.class]"
         :label="$t(label)"
         :label-for="id"
         :state="state"
         :invalid-feedback="$t(error)"
         :description="$t($attrs.description)"
    >
        <b-input-group>
            <b-input-group-prepend
                    is-text
                    v-if="hasPrepend"
                    v-for="(p,i) in $attrs.prepend"
                    :key="`prepend_${i}`"
            >
                <icon v-bind="p" v-if="typeof p === 'object' && p.hasOwnProperty('icon')"/>
                <span v-else>{{ p }}</span>
            </b-input-group-prepend>

            <b-form-input
                    trim
                    :state="state"
                    :readonly="readonly"
                    :type="type"
                    v-if="showTextField"
                    v-bind="[$attrs.props, $attrs]"
                    :value="value"
                    @update="emit"
            />
            <b-form-textarea
                    trim
                    :state="state"
                    :readonly="readonly"
                    v-if="type === 'textarea'"
                    v-bind="[$attrs.props, $attrs]"
                    :value="value"
                    @update="emit"
            />
            <b-form-select
                    plain
                    :state="state"
                    :disabled="readonly"
                    v-if="type === 'select'"
                    v-bind="{ ...$attrs.props, options: [] }"
                    :value="value"
                    @input="emit"
            >
                <template v-for="o in $attrs.props.options">
                    <option v-if="typeof o === 'object'" :value="o.value">{{ o.text | translate }}</option>
                    <option v-else :value="o">{{ o }}</option>
                </template>
            </b-form-select>

            <b-form-radio-group
                    :state="state"
                    :disabled="readonly"
                    v-if="type === 'radio'"
                    v-bind="[$attrs.props, $attrs]"
                    :checked="value"
                    @input="emit"
            />
            <b-form-checkbox-group
                    :state="state"
                    :disabled="readonly"
                    v-if="type === 'checkbox'"
                    v-bind="[$attrs.props, $attrs]"
                    :checked="value"
                    @input="emit"
            />
            <admin-field-calendar
                    :state="state"
                    :readonly="readonly"
                    v-if="type==='calendar'"
                    :value="value"
                    @input="emit"
                    v-bind="[$attrs.props, $attrs]"
            />
            <admin-field-multi-select
                    :state="state"
                    :readonly="readonly"
                    :value="value"
                    v-if="type === 'multiselect'"
                    v-bind="[$attrs.props, $attrs]"
                    @input="emit"
            />

            <v-select
                    :state="state"
                    :disabled="readonly"
                    :no-drop="readonly"
                    :value="value"
                    v-if="type === 'vselect'"
                    v-bind="[$attrs.props, $attrs]"
                    @input="emit"
            />

            <time-picker
                    :state="state"
                    v-if="type === 'time'"
                    :readonly="readonly"
                    :value="value"
                    v-bind="[$attrs.props, $attrs]"
                    @input="emit"
            />

            <b-form-file
                    :state="state"
                    :value="value"
                    v-if="type === 'file'"
                    :disabled="readonly"
                    @change="selectFile"
                    v-bind="[$attrs.props, $attrs]"
            />


            <b-input-group-append
                    is-text
                    v-if="hasAppend"
                    v-for="(p,i) in $attrs.append"
                    :key="`append_${i}`"
            >
                <icon v-bind="p" v-if="typeof p === 'object' && p.hasOwnProperty('icon')"/>
                <span v-else>{{ p }}</span>
            </b-input-group-append>
            <b-input-group-append v-if="loading" is-text>
                <icon icon="spinner" spin></icon>
            </b-input-group-append>

        </b-input-group>

        <transition name="fade">
            <div v-if="showThumbnail" class="thumbnail">
                <b-img
                        v-if="thumbnail"
                        :src="thumbnail"
                        v-bind="$attrs.props.thumbnail"
                        class="img-thumbnail"
                />
            </div>
        </transition>
    </div>
</template>

<script>
    import vSelect from 'vue-select';
    import AdminFieldCalendar from "./AdminFieldCalendar";
    import AdminFieldMultiSelect from "./AdminFieldMultiSelect";
    import AdminFieldTimePicker from './AdminFieldTimePicker'
    import Icon from "./Icon";

    export default {
        name: "AdminFormField",
        components: { AdminFieldCalendar, Icon, AdminFieldMultiSelect, vSelect, AdminFieldTimePicker },
        inheritAttrs: false,
        props: {
            inline: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: "text"
            },
            label: {
                type: String,
                default: null
            },
            id: {
                type: String,
                default: null
            },
            value: {
                default() {
                    return null;
                }
            },
            error: {
                type: String,
                default: null,
            }
        },
        watch: {
            value(val) {
                if (this.type === 'vselect') {
                    console.log(this.value);
                }
            }
        },
        computed: {
            hasAppend() {
                return this.$attrs.hasOwnProperty("append");
            },
            hasPrepend() {
                return this.$attrs.hasOwnProperty("prepend");
            },
            showTextField() {
                return (
                    this.type !== "checkbox" &&
                    this.type !== "radio" &&
                    this.type !== "select" &&
                    this.type !== "multiselect" &&
                    this.type !== "calendar" &&
                    this.type !== "textarea" &&
                    this.type !== "file" &&
                    this.type !== "vselect" &&
                    this.type !== "time"
                );
            },
            showThumbnail() {
                return (
                    this.type === "file" &&
                    this.$attrs.hasOwnProperty("props") &&
                    this.$attrs.props.hasOwnProperty("showThumbnail") &&
                    this.$attrs.props.showThumbnail &&
                    this.value
                );
            },
            thumbnail() {
                if (this.value) {
                    if (typeof this.value === "string" || this.value instanceof String) {
                        return this.value;
                    }
                    return window.URL.createObjectURL(this.value);
                }
                return null;
            },
            state() {
                if (this.error) {
                    return "invalid";
                }
                return null;
            }
        },
        methods: {
            emit(e) {
                this.$emit("input", e);
            },
            selectFile(e) {
                this.emit(e.target.files[0]);
            }
        },
    };
</script>

<style lang="scss">
    .form-group-file {
        &:not(.form-group-file-invalid) {
            > div[role="group"] {
                display: flex !important;
                flex-direction: row;
                .thumbnail {
                    max-width: 33%;
                    margin-left: 0.5em;
                }
            }
        }
    }

    .v-select {
        width: 100%;
    }
</style>
