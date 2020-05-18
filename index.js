import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import AdminForm from "./components/AdminForm";
import AdminTable from "./components/AdminTable";
import Icon from "./components/Icon";
import IconButton from "./components/IconButton";
import InputFormCalendar from "./components/inputs/InputFormCalendar";
import InputFormCheck from "./components/inputs/InputFormCheck";
import InputFormFile from "./components/inputs/InputFormFile";
import InputFormMultiSelect from "./components/inputs/InputFormMultiSelect";
import InputFormRadio from "./components/inputs/InputFormRadio";
import InputFormSelect from "./components/inputs/InputFormSelect";
import InputFormText from "./components/inputs/InputFormText";
import InputFormTextArea from "./components/inputs/InputFormTextArea";
import InputFormTimePicker from "./components/inputs/InputFormTimePicker";
import Layout from "./components/Layout";
import LayoutFooter from "./components/LayoutFooter";
import LayoutMenu from "./components/LayoutMenu";
import LayoutMenuItem from "./components/LayoutMenuItem";
import LayoutNavBar from "./components/LayoutNavBar";
import Messages from "./components/Messages";
import Pagination from "./components/Pagination";

Vue.use(BootstrapVue);

const renderers = {
  'IconRenderer': Icon,
  'LayoutRenderer': Layout,
  'LayoutNavbarRenderer': LayoutNavBar,
  'LayoutFooterRenderer': LayoutFooter,
  'MenuRenderer': LayoutMenu,
  'MenuItemRenderer': LayoutMenuItem,
  'ButtonRenderer': IconButton,
  'TableRenderer': AdminTable,
  'PaginationRenderer': Pagination,
  'MessagesRenderer': Messages,
  'FormRenderer': AdminForm,
  'FormInputTextRenderer': InputFormText,
  'FormInputPasswordRenderer': InputFormText,
  'FormInputNumberRenderer': InputFormText,
  'FormInputEmailRenderer': InputFormText,
  'FormInputTelRenderer': InputFormText,
  'FormInputColorRenderer': InputFormText,
  'FormInputSearchRenderer': InputFormText,
  'FormInputUrlRenderer': InputFormText,
  'FormInputFileRenderer': InputFormFile,
  'FormInputTextareaRenderer': InputFormTextArea,
  'FormInputSelectRenderer': InputFormSelect,
  'FormInputRadioRenderer': InputFormRadio,
  'FormInputCheckRenderer': InputFormCheck,
  'FormInputCheckboxRenderer': InputFormCheck,
  'FormInputCalendarRenderer': InputFormCalendar,
  'FormInputTimeRenderer': InputFormTimePicker,
  'FormInputMultiSelectRenderer': InputFormMultiSelect,
};

const BootstrapAdminComponents = {
  install: function (vue, options) {
    const componentsToRegister = {
      ...renderers,
      ...options
    };
    Object.keys(componentsToRegister).forEach(component => {
      vue.component(component, componentsToRegister[component])
    });
  }
};

export default BootstrapAdminComponents;
