<template>
  <div class="page-wrapper">
    <nav class="menu-wrapper">
      <ul class="menu-list">
        <li v-for="menu in menus" :key="menu.path"
          :class="['menu-list-item', currentRoute.path===menu.path ? 'active': '']" @click="handleRoute(menu)">
          {{ menu.name }}
        </li>
      </ul>
    </nav>
    <section class="content-wrapper">
      <!-- <table-exm /> -->
      <component :is="currentRoute.comp" />
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, markRaw} from "vue";
import TableExm from "./table.vue";
import FormExm from "./form.vue";

const menus = [
  {
    name: '表格Table',
    path: '/table',
    comp: markRaw(TableExm)
  },
  {
    name: '表单Form',
    path: '/form',
    comp: markRaw(FormExm)
  }
]
// 路由切换
let currentRoute = ref(menus[0]);
const handleRoute = (menu)=> {
  currentRoute.value = menu;
}
</script>
<style scoped lang="less">
.page-wrapper {
  display: flex;

}

.menu-wrapper {
  flex: 0 0 200px;

  .menu-list {
    list-style: none;
    padding: 0;
    text-align: left;

    &-item {
      margin: 20px;
      cursor: pointer;
      &.active {
        color: #409eff;
      }
    }
  }
}

.content-wrapper {
  flex: 1;
  // background-color: gray;
}
</style>

