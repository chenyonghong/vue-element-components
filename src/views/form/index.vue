<template>
  <div class="app-container">
    <ve-form
      ref="testForm"
      :model.sync="formModel"
      :config="formOptions"
      :fields="fieldList"
      @submit="submit"
    >
      <!-- <template #label-address>
                <span class="rap-star"> *</span>地址
            </template> -->
      <template #prefix-firstName>
        <h3>这是标题1。。。</h3>
      </template>
      <template #prefix-address>
        <h3>这是标题2。。。</h3>
      </template>
      <template #address="{ formData }">
        <el-col :lg="4">
          <el-form-item prop="province">
            <el-input v-model="formData.province" placeholder="省"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="4" style="padding-left: 5px">
          <el-form-item prop="city">
            <el-input v-model="formData.city" placeholder="市"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="4" style="padding-left: 5px">
          <el-form-item prop="district">
            <el-input v-model="formData.district" placeholder="区"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12" style="padding-left: 5px">
          <el-form-item prop="detailAddress">
            <el-input
              v-model="formData.detailAddress"
              placeholder="详细地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </template>
      <template #label-gender>
        性别
        <i class="el-icon-male"></i>
        <i class="el-icon-female"></i>
      </template>
      <template #gender="{ formData }">
        <test-gender
          :default-value="formData.gender"
          @change="handleGenderChange"
        ></test-gender>
      </template>
      <template #skill="{ formData }">
        <el-input
          v-model="formData.skillNames"
          @click.native="orgzDialogVisible = true"
        ></el-input>
      </template>
      <template #relateUser="{ formData }">
        <user-selector
          v-model="formData.relateUser"
          @change="(data) => (formData.relateUser = data)"
        />
      </template>
      <template #form-footer>
        <div style="text-align: center">
          <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
          <el-button type="default">取消</el-button>
        </div>
      </template>
    </ve-form>
    <!-- <orgz-dialog
      :visible.sync="orgzDialogVisible"
      :checked-keys="formModel.skill"
      @confirm="handleOrgzDialogConfirm"
    ></orgz-dialog> -->
    <h3 style="border-top: 1px solid lightgray; padding-top: 20px">
      所有表单输入域类型
    </h3>
    <ve-form
      ref="typeForm"
      :model.sync="typeFormModel"
      :config="typeFormConf"
      :fields="typeFields"
    >
      <template #prefix-radio>
        <h4>单、复选框</h4>
      </template>
      <template #prefix-input>
        <h4>input输入框</h4>
      </template>
      <template #prefix-select>
        <h4>下拉选择框</h4>
      </template>
      <template #prefix-cascader>
        <h4>级联选择器</h4>
      </template>
      <template #prefix-switch>
        <h4>switch开关</h4>
      </template>
      <template #prefix-slider>
        <h4>slider滑块</h4>
      </template>
      <template #prefix-time>
        <h4>时间选择器</h4>
      </template>
      <template #prefix-date>
        <h4>日期选择器</h4>
      </template>
      <template #prefix-upload>
        <h4>upload上传（有缺陷，建议使用slot）</h4>
      </template>
      <template #prefix-rate>
        <h4>Rate评分</h4>
      </template>
      <template #prefix-color>
        <h4>颜色选择器</h4>
      </template>
       <template #prefix-transfer>
        <h4>穿梭框</h4>
      </template>
      <template #inputCombine="{ formData }">
        <el-input
          placeholder="请输入内容"
          v-model="formData.inputCombine"
          class="input-with-select"
        >
          <el-select
            v-model="formData.inputCombinePre"
            slot="prepend"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </template>
      <template #selectSlot="{ formData }">
        <el-select
          v-model="formData.selectSlot"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option-group
            v-for="group in selectOptions"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.gender
              }}</span>
            </el-option>
          </el-option-group>
        </el-select>
      </template>
      <template #switchExtraValue-suffix>
        <span style="margin-left: 20px"
          >value: {{ typeFormModel.switchExtraValue }}</span
        >
      </template>
    </ve-form>
  </div>
</template>

<script>
import VeForm from "@/components/Form";
import TestGender from "@/components/Form/components/testGenger.vue";
import userSelector from "@/views/common/components/select/userSelector";
import { getUserList, fetchRestaurants } from "@/api/test";
// import OrgzDialog from "@/views/common/components/dialog/orgz.vue";

const isMobilePhone = (str) => /^1[345789]\d{9}$/.test(str);

const checkMobile = (rule, value, callback) => {
  if (!value) return callback(new Error("请输入手机号码！"));
  if (isMobilePhone(value)) callback();
  else callback(new Error("请输入正确格式的手机号码!"));
};

export default {
  name: "formExm",
  components: {
    VeForm,
    TestGender,
    userSelector,
    // OrgzDialog
  },
  data() {
    return {
      getUserList,
      fetchRestaurants,
      orgzDialogVisible: false,
      dialogValue: "",
      formModel: {
        firstName: "陈",
        lastName: "七",
        gender: "",
        age: "",
        skill: [809],
        skillNames: "",
        relateUser: 4,
        province: "",
        city: "",
        district: "",
        detailAddress: "",
        remark: "",
        date: "",
      },
      formOptions: {
        ref: "ref",
        labelWidth: "60px",
        rules: {
          firstName: [{ required: true, message: "请输入姓", trigger: "blur" }],
          lastName: [{ required: true, message: "请输入名", trigger: "blur" }],
          phone: [
            { required: true },
            {
              validator: checkMobile,
              message: "请输入正确的电话号码",
              trigger: "blur",
            },
          ],
          // address: [
          //     { required: true }
          // ],
          province: [{ required: true, message: "不能为空" }],
          city: [{ required: true, message: "不能为空" }],
          district: [{ required: true, message: "不能为空" }],
          // detailAddress: [
          //     { required: true }
          // ]
        },
        footerWrap: true,
        // footer: {
        //   confirm: true,
        //   reset: true,
        //   cancel: true,
        // },
      },
      fieldList: [
        {
          type: "input",
          key: "firstName",
          label: "姓名",
          el: {
            placeholder: "姓",
            events: {
              change: (data) => {
                console.log(data);
              },
              input: (data) => {
                console.log(data);
              },
            },
          },
          layout: {
            xs: 6,
            md: 5,
            lg: 3,
            xl: 3,
          },
        },
        {
          type: "input",
          key: "lastName",
          // label: "",
          labelWidth: "10px",
          el: {
            placeholder: "名",
            events: {
              change: (data) => {
                console.log(data);
              },
              input: (data) => {
                console.log(data);
              },
            },
          },
          layout: {
            xs: 6,
            md: 5,
            lg: 2,
            xl: 2,
          },
        },
        {
          type: "input",
          key: "phone",
          label: "联系电话",
          labelWidth: "100px",
          br: true,
          layout: {
            offset: 1,
          },
        },
        {
          slot: true,
          key: "address",
          label: "地址",
          requiredStar: true, // 是否显示label前面的红色*
          // required: true,
          // showMessage: false,
          layout: {
            xs: 24,
            md: 24,
            lg: 12,
            xl: 12,
          },
        },
        {
          type: "select",
          options: [
            {
              id: 1,
              name: "男",
            },
            {
              id: 2,
              name: "女",
            },
          ],
          props: {
            label: "name",
            value: "id",
          },
          // slot: true,
          key: "gender",
          label: "性别",
          labelWidth: "80px",
        },
        {
          key: "age",
          label: "年龄",
          type: "input",
        },
        {
          slot: true,
          key: "skill",
          label: "特长",
        },
        {
          slot: true,
          key: "relateUser",
          label: "用户类型",
          labelWidth: "100px",
        },
        {
          key: "remark",
          label: "备注",
          type: "input",
          el: {
            type: "text",
            "show-word-limit": true,
            maxlength: 10,
          },
        },
        {
          key: "date",
          type: "date-picker",
          label: "时间",
          el: {
            style: {
              width: "100%!important",
            },
          },
        },
      ],

      typeFormModel: {
        radio: 1,
        radioGroup: 1,
        checkbox: false,
        checkboxGroup: [2],
        input: "",
        textarea: "",
        inputIcon: "",
        inputSize: "",
        inputAutocomplete: "",
        inputCombine: "",
        inputCombinePre: "",
        inputNumber: "",
        select: "",
        selectMulti: "",
        selectSearch: "",
        selectSlot: "",
        cascader: "",
        cascaderMulti: "",
        switch: "",
        switchLabel: "",
        switchExtraValue: 0,
        switchDisabled: "",
        slider: 0,
        sliderStepInput: 10,
        sliderMark: [30, 60],
        time: "",
        timeAny: "",
        timeRange: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        date: "",
        dateUnit: "",
        dateRange: ["", ""],
        // uploadPhotoWall: []
        rate: 0,
        rateText: 0,
        rateIcon: null,
        color: '#409EFF',
        transfer: [1,4]
      },
      typeFormConf: {
        labelWidth: "80px",
        fieldLayout: {
          xs: 20,
          md: 12,
          lg: 8,
          xl: 8,
        },
      },
      typeFields: [
        {
          type: "radio",
          label: "单选框：",
          key: "radio",
          options: [
            {
              value: 1,
              label: "备选项1",
            },
            {
              value: 2,
              label: "备选项2",
            },
          ],
        },
        {
          type: "radio-group",
          label: "分组：",
          key: "radioGroup",
          options: [
            {
              value: 1,
              label: "备选项1",
            },
            {
              value: 2,
              label: "备选项2",
              border: true,
            },
            {
              value: 3,
              label: "备选项3",
            },
            {
              value: 4,
              label: "备选项4",
            },
          ],
          layout: {
            lg: 16,
          },
          br: true,
        },
        {
          type: "checkbox",
          label: "复选框(单选项)：",
          labelWidth: "120px",
          key: "checkbox",
          options: [
            {
              // value: false,
              label: "开启",
            },
          ],
        },
        {
          type: "checkbox-group",
          label: "分组：",
          labelWidth: "100px",
          key: "checkboxGroup",
          options: [
            {
              value: 1,
              label: "复选框1",
            },
            {
              value: 2,
              label: "复选框2",
            },
            {
              value: 3,
              label: "复选框3",
            },
            {
              value: 4,
              label: "复选框4",
            },
          ],
          layout: {
            lg: 12,
          },
          br: true,
        },

        {
          type: "input",
          key: "input",
          label: "基础用法：",
          labelWidth: "100px",
          // el: {
          //     clearable: true
          // }
        },
        {
          type: "input",
          key: "textarea",
          label: "文本域",
          el: {
            type: "textarea",
            placeholder: "请输入文本域内容",
            maxlength: 30,
            "show-word-limit": true,
            rows: 5,
          },
        },
        {
          type: "input",
          key: "inputIcon",
          label: "带图标：",
          el: {
            "prefix-icon": "el-icon-date",
            "suffix-icon": "el-icon-search",
          },
          br: true,
        },
        {
          type: "input",
          key: "inputSize",
          label: "尺寸：",
          el: {
            size: "mini",
          },
          layout: {
            lg: 6,
          },
        },
        {
          type: "input",
          key: "inputAutocomplete",
          label: "远程搜索：",
          labelWidth: "100px",
          el: {
            tagName: "el-autocomplete",
            "fetch-suggestions": this.querySearchAsync,
            style: {
              width: "100%",
            },
            events: {
              select: (data) => {
                console.log(data);
              },
            },
          },
        },
        {
          type: "input",
          key: "inputCombine",
          label: "复合型",
          slot: true,
          layout: {
            lg: 10,
          },
          br: true,
        },
        {
          type: "input-number",
          key: "inputNumber",
          label: "计数器",
          br: true,
        },
        {
          type: "select",
          key: "select",
          label: "基础选择框",
          labelWidth: "100px",
          options: [],
          props: {
            value: "id",
            label: "name",
          },
        },
        {
          type: "select",
          key: "selectMulti",
          label: "多选",
          options: [],
          props: {
            value: "id",
            label: "name",
          },
          el: {
            multiple: true,
            innerHTML: (props) => [
              <span style="float: left; ">{props.name}</span>,
              <span style="float: right; color: #8492a6; font-size: 13px;margin-right: 20px">
                {props.gender}
              </span>,
            ],
          },
        },
        {
          type: "select",
          key: "selectSearch",
          label: "远程搜索",
          options: [],
          props: {
            value: "id",
            label: "value",
          },
          el: {
            loading: false,
            filterable: true,
            remote: true,
            "remote-method": this.selectRemoteSearch,
          },
        },
        {
          key: "selectSlot",
          label: "slot自定义",
          labelWidth: "100px",
          slot: true,
          br: true,
        },
        {
          type: "cascader",
          key: "cascader",
          label: "基础用法",
          el: {
            options: [],
            props: { expandTrigger: "hover" },
          },
        },
        {
          type: "cascader",
          key: "cascaderMulti",
          label: "多选、任意级别",
          labelWidth: "120px",
          el: {
            options: [],
            props: { multiple: true, checkStrictly: true },
            // 'collapse-tags': true
          },
        },
        {
          type: "cascader",
          key: "cascaderLazy",
          label: "动态加载",
          el: {
            // options: [],
            props: {
              lazy: true,
              lazyLoad(node, resolve) {
                const { level } = node;
                setTimeout(() => {
                  const nodes = Array.from({ length: level + 1 }).map(
                    (item, index) => ({
                      value: level + 1 + index,
                      label: `选项${level + 1 + index}`,
                      leaf: level >= 2,
                    })
                  );
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(nodes);
                }, 1000);
              },
            },
          },
          br: true,
        },
        {
          type: "switch",
          key: "switch",
          label: "基本用法：",
          labelWidth: "90px",
          layout: {
            lg: 4,
          },
        },
        {
          type: "switch",
          key: "switchLabel",
          label: "文字描述：",
          labelWidth: "90px",
          el: {
            "active-color": "#13ce66",
            "inactive-color": "#ff4949",
            "active-text": "按月付费",
            "inactive-text": "按年付费",
          },
          layout: {
            lg: 7,
          },
        },
        {
          type: "switch",
          key: "switchExtraValue",
          label: "扩展value：",
          labelWidth: "90px",
          el: {
            "active-color": "#13ce66",
            "inactive-color": "#ff4949",
            "active-value": "100",
            "inactive-value": "0",
          },
          layout: {
            lg: 6,
          },
        },
        {
          type: "switch",
          key: "switchDisabled",
          label: "禁用状态：",
          labelWidth: "90px",
          el: {
            disabled: true,
          },
          layout: {
            lg: 4,
          },
          br: true,
        },
        {
          type: "slider",
          key: "slider",
          label: "基本用法",
          layout: {
            lg: 5,
          },
        },
        {
          type: "slider",
          key: "sliderStepInput",
          label: "离散和输入框：",
          labelWidth: "120px",
          el: {
            "show-stops": true,
            step: 10,
            "show-input": true,
          },
          layout: {
            lg: 11,
          },
        },
        {
          type: "slider",
          key: "sliderMark",
          label: "展示标记：",
          labelWidth: "100px",
          el: {
            range: true,
            marks: {
              0: "0°C",
              8: "8°C",
              37: "37°C",
              50: {
                style: {
                  color: "#1989FA",
                },
                // label: this.$createElement("strong", "50%") 暂未实现
                label: "50%",
              },
            },
          },
          layout: {
            lg: 8,
          },
        },
        {
          type: "time-select",
          key: "time",
          label: "固定时间：",
          labelWidth: "100px",
          el: {
            pickerOptions: { start: "08:30", step: "00:15", end: "18:30" },
            placeholder: "选择时间",
          },
          layout: {
            lg: 7,
          },
        },
        {
          type: "time-picker",
          key: "timeAny",
          label: "任意时间：",
          labelWidth: "100px",
          el: {
            "arrow-control": true,
            "picker-options": {
              selectableRange: "18:30:00 - 20:30:00",
            },
            placeholder: "任意时间点",
          },
          layout: {
            lg: 7,
          },
        },
        {
          type: "time-picker",
          key: "timeRange",
          label: "时间范围：",
          labelWidth: "100px",
          el: {
            "is-range": true,
            "arrow-control": true,
            "range-separator": "至",
            "start-placeholder": "开始时间",
            "end-placeholder": "结束时间",
            placeholder: "选择时间范围",
          },
          layout: {
            lg: 10,
          },
        },
        {
          type: "date-picker",
          key: "date",
          label: "带快捷选项:",
          labelWidth: "110px",
          el: {
            align: "right",
            type: "date",
            placeholder: "选择日期",
            "picker-options": {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
              shortcuts: [
                {
                  text: "今天",
                  onClick(picker) {
                    picker.$emit("pick", new Date());
                  },
                },
                {
                  text: "昨天",
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit("pick", date);
                  },
                },
                {
                  text: "一周前",
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", date);
                  },
                },
              ],
            },
          },
          layout: {
            lg: 7,
          },
        },
        {
          type: "date-picker",
          key: "dateUnit",
          label: "日期单位：",
          labelWidth: "90px",
          el: {
            type: "dates",
            placeholder: "选择一个或多个日期",
          },
          layout: {
            lg: 7,
          },
        },
        {
          type: "date-picker",
          key: "dateRange",
          label: "日期范围：",
          labelWidth: "90px",
          el: {
            type: "daterange",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            "default-time": ["00:00:00", "23:59:59"],
          },
          layout: {
            lg: 10,
          },
          br: true,
        },
        {
          type: "upload",
          key: "upload",
          label: "点击上传：",
          labelWidth: "90px",
          el: {
            class: "upload-demo",
            action: "https://jsonplaceholder.typicode.com/posts/",
            "on-preview": (file) => {
              console.log(file);
            },
            "on-remove": (file, fileList) => {
              console.log(file, fileList);
            },
            "before-remove": (file) => this.$confirm(`确定移除 ${file.name}？`),
            multiple: true,
            limit: 3,
            "on-exceed": (files, fileList) => {
              this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                  files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
              );
            },
            "file-list": [
              {
                name: "food.jpeg",
                url:
                  "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
              },
              {
                name: "food2.jpeg",
                url:
                  "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
              },
            ],
            innerHTML: () => [
              <el-button size="small" type="primary">
                点击上传
              </el-button>,
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>,
            ],
          },
          layout: {
            lg: 10,
          },
        },
        {
          type: "upload",
          key: "uploadPhotoWall",
          label: "照片墙：",
          el: {
            action: "https://jsonplaceholder.typicode.com/posts/",
            "list-type": "picture-card",
            "on-preview": (file) => {
              console.log(file);
            },
            "on-remove": (file, fileList) => {
              console.log(file, fileList);
            },
            innerHTML: () => <i class="el-icon-plus"></i>,
          },
          layout: {
            lg: 12,
          },
          br: true,
        },
        {
          type: "upload",
          key: "uploadDrag",
          label: "拖拽上传：",
          labelWidth: "90px",
          el: {
            class: "upload-demo",
            drag: true,
            action: "https://jsonplaceholder.typicode.com/posts/",
            multiple: true,
            innerHTML: () => [
              <i class="el-icon-upload"></i>,
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>,
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>,
            ],
          },
          layout: {
            lg: 12,
          },
        },
        {
          type: "upload",
          key: "uploadManual",
          label: "手动上传：",
          labelWidth: "90px",
          el: {
            class: "upload-demo",
            ref: "upload",
            action: "https://jsonplaceholder.typicode.com/posts/",
            "on-preview": (file) => {
              console.log(file);
            },
            "on-remove": (file, fileList) => {
              console.log(file, fileList);
            },
            "file-list": [
              {
                name: "food.jpeg",
                url:
                  "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
              },
              {
                name: "food2.jpeg",
                url:
                  "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
              },
            ],
            "auto-upload": false,
            // slot 未实现
            innerHTML: () => [
              <el-button slot="trigger" size="small" type="primary">
                选取文件
              </el-button>,
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                click="this.$refs.upload.submit();"
              >
                上传到服务器
              </el-button>,
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>,
            ],
          },
          br: true
        },
        {
          type: "rate",
          key: "rate",
          label: "基础用法：",
          labelWidth: "90px",
          el: {
            style: {
              'margin-top': '10px'
            }
          }
        },
        {
          type: "rate",
          key: "rateText",
          label: "辅助文字：",
          labelWidth: "90px",
          el: {
            'show-text': true,
            texts: ['极差', '很差','中等','很好','极好'],
            style: {
              'margin-top': '10px'
            }
          }
        },
        {
          type: "rate",
          key: "rateIcon",
          label: "其它Icon：",
          labelWidth: "90px",
          el: {
            "icon-classes": ['el-icon-user-solid', 'el-icon-eleme', 'el-icon-platform-eleme'],
            "void-icon-class": "el-icon-user",
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            style: {
              'margin-top': '10px'
            }
          }
        },
        {
          type: 'color-picker',
          key: 'color',
          label: "基础用法：",
          labelWidth: "90px",
          br: true
        },
        {
          type: "transfer",
          key: "transfer",
          label: "穿梭框：",
          el: {
            data: (() => {
              const data = [];
              for (let i = 1; i <= 15; i++) {
                data.push({
                  key: i,
                  label: `备选项 ${ i }`,
                  disabled: i % 4 === 0
                });
              }
              return data;
            })()
          },
          layout: {
            lg: 22
          }
        }
      ],
      selectOptions: [],
    };
  },
  created() {
    // this.fetchRestaurants().then(({ code, data }) => {
    //   if (code === 200) {
    //     this.restaurants = data;
    //   }
    // });
    this.getUserList().then(({ code, data }) => {
      if (code === 200) {
        this.typeFields
          .filter((item) => ["select", "selectMulti"].includes(item.key))
          .forEach((matchItem) => {
            matchItem.options = data;
          });
        this.typeFields
          .filter((item) => ["cascader", "cascaderMulti"].includes(item.key))
          .forEach((matchItem) => {
            matchItem.el.options = this.formatCascader(data);
          });
        this.selectOptions = this.formatSelectGroup(data);
      }
    });
  },
  methods: {
    formatUserType(data) {
      return data.data;
    },

    handleUserTypeChange(data) {
      // debugger;
      this.formModel.relateUser = data;
    },

    handleGenderChange(data) {
      this.formModel.gender = data;
    },
    handleOrgzDialogConfirm(data) {
      this.formModel.skill = data.map((item) => {
        return item.id;
      });
      this.formModel.skillNames = data
        .map((item) => {
          return item.orgName;
        })
        .join(",");
    },

    querySearchAsync(queryString, cb) {
      this.fetchRestaurants({ queryString }).then(({ code, data }) => {
        if (code === 200) {
          cb(data);
        }
      });
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    selectRemoteSearch(query) {
      const config = this.typeFields.filter(
        (item) => item.key === "selectSearch"
      )[0];
      config.loading = true;
      this.fetchRestaurants({ queryString: query }).then(({ code, data }) => {
        config.loading = false;
        if (code === 200) {
          config.options = data;
        }
      });
    },

    formatSelectGroup(data) {
      let result = [];
      data.forEach((item) => {
        const matchItem = result.filter(
          (alItem) => alItem.label === item.department
        );
        if (matchItem.length) {
          matchItem[0].options.push({
            value: item.id,
            label: item.name,
            gender: item.gender,
          });
        } else {
          result.push({
            label: item.department,
            options: [
              {
                value: item.id,
                label: item.name,
                gender: item.gender,
              },
            ],
          });
        }
      });
      return result;
    },
    formatCascader(data) {
      let result = [];
      data.forEach((item) => {
        const matchItem = result.filter(
          (alItem) => alItem.label === item.department
        );
        if (matchItem.length) {
          matchItem[0].children.push({
            value: item.id,
            label: item.name,
          });
        } else {
          result.push({
            value: item.id,
            label: item.department,
            disabled: item.department === "研发部",
            children: [
              {
                value: item.id,
                label: item.name,
              },
            ],
          });
        }
      });
      return result;
    },
    handleSubmit() {
      console.log("submit", this.formModel);
      this.$refs.testForm.elForm.validate((isValid) => {
        if (isValid) {
          console.log(this.formModel);
        }
      });
    },

    submit(formData) {
      console.log(formData);
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
.rap-star {
  color: #ff4949;
  margin-right: 4px;
}
</style>
