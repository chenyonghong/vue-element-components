<template>
    <div>
        <el-button @click="modal">公共弹窗</el-button>
        <el-button type="primary" @click="modal2">内置footer</el-button>
        
        <common-dialog :visible.sync="dialogVisible" title="XXXX 弹窗"></common-dialog>
        <ve-dialog
            :visible.sync="visible2"
            :attr="{
                title: '使用内置footer',
                align: 'left',
                appendToBody: true
            }"
            :footer="{ show: true, align: 'center' }"
            class="device-dialog"
            @confirm="handleConfirm"
        >
            <p>使用内置footer</p>
        </ve-dialog>
    </div>
</template>
<script>
import CommonDialog from '../common/components/dialog/commonDialog.vue';
import VeDialog from "pkgs/Dialog/src/index.vue";
export default {
   components: {
      CommonDialog,
      VeDialog
   },
   data() {
       return {
           dialogVisible: false,
           visible2: false
       }
   },
   methods: {
       modal() {
           this.dialogVisible = true;
       },
       modal2() {
           this.visible2 = true;
       },
       handleConfirm() {
           this.visible2 = false;
       }
   }
}
</script>