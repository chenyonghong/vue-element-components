<template>
  <div id="app">
    <div class="side-bar">
      <div class="logo-container">
        <p>vue-element-components</p>
      </div>
      <div class="menu-list">
        <router-link to="/">Home</router-link>
        <router-link to="/select">下拉选择框</router-link>
        <router-link to="/tree">树形控件</router-link>
        <router-link to="/table">表格</router-link>
        <router-link to="/table2">表格2</router-link>
      </div>
    </div>
    <div class="app-main">
      <div class="nav-bar">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-user" />
            Admin
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  background: #fafafa;
  text-align: center;
}
.side-bar .logo-container {
  font-weight: bold;
  color: #2c3e50;
  overflow: hidden;
  background: #bbe6d6;
}
.side-bar .menu-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.side-bar .menu-list a {
  color: #2c3e50;
  margin: 10px;
  text-decoration: none;
}

.side-bar .menu-list a.router-link-exact-active {
  color: #42b983;
}
.app-main {
  margin-left: 220px;
  min-height: 100%;
  background: #e6e6e6;
}
.app-main .nav-bar {
  width: 100%;
  height: 50px;
  background: #fafafa;
}
.app-main .nav-bar .el-dropdown {
  line-height: 50px;
  float: right;
  margin-right: 30px;
}
.app-main .nav-bar .el-dropdown .el-icon-user {
  font-size: 20px;
  margin-right: 5px;
}
.app-main .main-content {
  margin: 20px;
  padding: 20px;
  background: #fff;
  height: calc(100vh - 130px);
  overflow: auto;
}
</style>
