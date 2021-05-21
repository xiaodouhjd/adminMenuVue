<template>
<!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group> -->
<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @select="selectMenu"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div v-for="item in menuList" :key="item.path">
                <!-- 没有子菜单 -->
                <template v-if="!item.children || item.children.length == 0">
                    <el-menu-item :index="item.path">
                        <i :class="item.icon"></i>
                        {{item.label}}
                    </el-menu-item>
                </template>

                <!-- 有子菜单 -->
                <el-submenu v-else :index="item.path">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        {{item.label}}
                    </template>

                    <template v-for="child in item.children">
                        <!-- 这里是类似递归循环 -->
                        <sidebar-item
                            v-if="child.children&&child.children.length>0"
                            :item="child"
                            :key="child.path"
                        />
                        <el-menu-item v-else :key="child.path" :index="child.path">
                            <i :class="child.icon"></i>
                            {{child.label}}
                        </el-menu-item>
                    </template>
                </el-submenu>
            </div>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-3">
          <template slot="title"><i class="el-icon-location"></i>选项4</template>
          <el-menu-item index="1-3-1"><i class="el-icon-location"></i>选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu> 
</template>


<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        menuList:this.$store.state.User.asyncMenuList[0].children
      };
    },
    created(){
      console.log(this.MeunList);
    },
    computed:{
      async MeunList(){
         var arr =this.$store.state.User.asyncMenuList[0].children
         console.log(arr);
        return arr
      }
    },
    methods: {
      selectMenu(key, keyPath){
        console.log(key, keyPath)
        this.currentIndexLight = key;
        this.$router.push({path:key})
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>