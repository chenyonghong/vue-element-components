<template>
  <div class="pane-content">
    <split-pane
      :min-percent="minPercent"
      :default-percent="newDefault"
      :split="split"
      @resize="resizef"
    >
      <template slot="paneL">
        <div class="pleft" :class="oldValue === 0 ? 'padding' : ''">
          <slot name="paneLeft"></slot>
          <span class="dian el-icon-more"></span>
        </div>
        <span
          :class="['toggle-span', oldValue === 0 ? '' : 'hide-span']"
          @click="toggleLeft"
        >
          <i
            :class="[
              oldValue === 0 ? 'el-icon-arrow-left' : 'el-icon-arrow-right',
              'arrow-i',
            ]"
          ></i>
        </span>
      </template>
      <template slot="paneR">
        <div ref="scrollTo" class="pright">
          <slot name="paneRight"></slot>
        </div>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from "vue-splitpane";

export default {
  components: {
    splitPane,
  },
  props: {
    leftPercent: {
      type: Number,
      default: 18,
    },
    minPercent:{
      type:Number,
      default:18
    },
    // 方向，vertical默认竖直, horizontal水平
    split:{
      type:String,
      default:'vertical'
    },
    resize: Function,
  },
  data() {
    return {
      newDefault: this.leftPercent,
      oldValue: 0,
    };
  },
  methods: {
    resizef(persent) {
      this.newDefault = persent;
      if (this.resize && this.resize instanceof Function) {
        this.resize(persent);
      }
    },

    toggleLeft() {
      if (this.oldValue === 0) {
        this.oldValue = this.newDefault;
        this.newDefault = 0;
        this.$emit("close", true);
      } else {
        this.newDefault = this.oldValue;
        this.oldValue = 0;
        this.$emit("close", false);
      }
    },
    // 获取ref以便于控制滚动条
    scrollToTop() {
      this.$nextTick(() => {
        this.$store.commit("SET_SCROLL_DOM", this.$refs.scrollTo);
      });
    },
  },

  watch: {
    defaultPercent: {
      handler(newValue) {
        this.newDefault = newValue;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-splitter-container {
  height: 100%;
  position: relative;
}

.pane-content {
  flex: 1;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  // height: calc(100% - #{20px});
}
.vue-splitter-container {
  ::v-deep .splitter-paneL {
    overflow: hidden;
  }
}
.pleft {
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  ::v-deep {
    > div {
      height: 100%;
    }
  }
  &.padding {
    // margin: 20px;
    padding: 20px;
    // margin-right: 0;
  }
}
.pright {
  height: 100%;
  position: relative;
}
.pright::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
}
.pane-content ::v-deep .splitter-pane-resizer {
  transform: translateX(-15px);
  opacity: 0;
}
.dian {
  position: absolute;
  top: 6px;
  right: 2px;
  z-index: 0;
  transform: rotate(90deg);
  color: #c5c5c5;
}
.pane-content ::v-deep .splitter-pane {
  overflow: hidden;
}
.pane-content ::v-deep .splitter-pane.vertical.splitter-paneL {
  //padding-right: 10px;
  padding-right: 14px;
}
.toggle-span {
  cursor: pointer;
  position: absolute;
  top: 40%;
  right: -1px;
  z-index: 4;
  width: 0;
  height: 50px;
  border-left: 14px solid rgba($color: #000000, $alpha: 0.4);
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  color: #fff;
  .arrow-i {
    position: absolute;
    top: 50%;
    left: -15px;
    z-index: 2;
    transform: translateY(-50%);
  }
  &:hover {
    border-left: 14px solid rgba($color: #000000, $alpha: 0.6);
  }
}

// @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
//   /* IE10+ specific styles go here */
//   .pane-content {
//     position: absolute;
//     width: calc(100% - #{50px});
//     height: calc(100% - #{144px});
//   }
// }
</style>
