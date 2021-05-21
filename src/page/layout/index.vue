<template>
  <el-container class="container-content">
    <el-header class="header">Header</el-header>
    <el-container class="content">
      <aside-menu class="aside-menu"></aside-menu>
      <el-container class="Main">
        <Menu-tab></Menu-tab>
        <el-main>
          <basicContainer>
            <router-view></router-view>
          </basicContainer>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import MenuTab from "./menu/Tab";
import asideMenu from "./menu/menu";
export default {
  components: {
    MenuTab,
    asideMenu,
  },
};
</script>

<style lang="less" scoped>
// .el-aside {
//   background-color: #d3dce6;
//   color: #333;
//   text-align: center;
// }

.container-content {
  height: 100%;
  background-color: #f2f2f2;
  .header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
  }
  .content {
    height: 100%;
    overflow: hidden;
    .aside-menu {
      height: 100% ;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .Main {
      display: flex;
      flex-direction: column;
    }
    .el-main {
      background-color: #e9eef3;
      color: #333;
      padding: 0;
      height: 100%;
    }
  }
}
</style>