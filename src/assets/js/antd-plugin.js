/**
 * @description 注册全局组件
 */
import {
  Tooltip,
  Pagination,
  Row,
  Tree,
  Col,
  Icon,
  Tag,
  Select,
  Table,
  Checkbox,
  Radio,
  DatePicker,
  Tabs,
  Button,
  Layout,
  Modal,
  Dropdown,
  Form,
  Input,
  Menu,
  LocaleProvider,
  Popover,
  message,
  upload
} from 'ant-design-vue'
const ComList = [
  Tooltip,
  Pagination,
  Select,
  Checkbox,
  Radio,
  Table,
  Row,
  Col,
  Tree,
  Icon,
  Tag,
  Tabs,
  Button,
  Layout,
  Dropdown,
  DatePicker,
  Modal,
  Form,
  Input,
  Menu,
  LocaleProvider,
  Popover,
  message,
  upload
]
const install = (Vue) => {
  ComList.forEach(item => {
    Vue.use(item)
  })
  Vue.prototype.$message = message
  Vue.prototype.$Modal = Modal
}

export default {
  install
}
