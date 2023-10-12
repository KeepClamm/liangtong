<template>
  <div v-if="!item.hidden" :class="`${classType}-sidebar-item-box`">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <div :class="`${classType}-item ${classType == 'sub' ? 'pl-20' : ''}`">
            <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
          </div>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" 
                :index="resolvePath(item.path)" 
                popper-append-to-body>
      <template slot="title">
        <div :class="`${classType}-item`" v-if="item.meta" @click="handleSelectMenu(item)">
          <item :icon="item.meta && item.meta.icon" :title="item.meta.title" />
        </div>
      </template>
      <sidebar-item
        classType="sub"
        class="nest-menu"
        v-for="child in item.children"
        :key="child.path + Math.random()"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)" />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import { setCurWatchStockInfo } from '@/utils/auth';

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    classType: {
      type: String,
      default: ''
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    this.onlyOneChild = null
    return {}
  },
  methods: {
    handleSelectMenu(item) {
      switch (item.name) {
        case 'individualStocks':
          setCurWatchStockInfo(null);
          
          setTimeout(()=> {
            this.$router.push({path: '/individual-stocks/home'});
          },300)
        break;
      }
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
  .parent-item,
  .parent-sidebar-item-box ::v-deep .el-menu-item,
  .parent-sidebar-item-box ::v-deep .el-submenu__title{
    height: 64px;
    line-height: 64px;
    margin-bottom: 12px;
  }
  .sub-item,
  .sub-sidebar-item-box ::v-deep .el-menu-item{
    // height: 49px;
    // line-height: 49px;
    height: 48px;
    line-height: 48px;
    margin-bottom: 12px;
  }
  .parent-sidebar-item-box ::v-deep .parent-item > span {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    // font-size: 16px;
    // line-height: 25px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: #4E5969;
  }
  .parent-sidebar-item-box ::v-deep .is-active .parent-item > span,
  .parent-sidebar-item-box ::v-deep .router-link-active .parent-item > span {
    font-weight: 500;
    color: #012169;
  }
  .sub-sidebar-item-box ::v-deep .el-menu-item > .sub-item > span{
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    // font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: #4E5969;
  }
  .sub-sidebar-item-box ::v-deep .is-active > .sub-item{
    background-color: #EBF8FD;
  }
  .sub-sidebar-item-box ::v-deep .is-active > .sub-item > span{
    font-weight: 500;
    color: #012169;
  }
  .parent-sidebar-item-box ::v-deep .el-submenu >.el-submenu__title,
  .parent-sidebar-item-box ::v-deep a >.el-menu-item{
    border-radius: 4px !important;
    // padding: 0 24px !important;
    padding: 0 12px !important;
  }
  // .parent-sidebar-item-box ::v-deep .is-active >.el-submenu__title,
  .parent-sidebar-item-box ::v-deep .router-link-active >.is-active{
    background-color: rgba(0, 163, 224, 0.08) !important;
    // border-radius: 4px !important;
  }
  ::v-deep .el-submenu__icon-arrow{
    width: 24px;
    height: 24px;
    right: 0px;
    // right: -8px;
    margin-top: -12px;
    background: url('../../../assets/images/layout/arrow-down-icon.png') center center no-repeat;
    background-size: 100% 100%;
  }
  ::v-deep .el-icon-arrow-down:before{
    content: '';
  }
  ::v-deep .sub-item{
    // width: 212px;
    // width: 196px;
    font-size: 18px;
    // width: 172px;
    transition: background-color .3s;
    border-radius: 4px;
    overflow: hidden;
  }
  ::v-deep .sub-item:hover{
    background-color: #EBF8FD !important;
  }

  .parent-sidebar-item-box ::v-deep .el-menu{
    padding-left: 32px !important;
    box-sizing: border-box;
  }
  .nest-menu ::v-deep .el-menu-item{
    width: 100%;
  }

  .parent-sidebar-item-box ::v-deep .el-submenu .el-submenu__title .el-icon-arrow-down{
    display: none;
  }
  .parent-sidebar-item-box ::v-deep .el-submenu__title:hover .el-icon-arrow-down,
  .parent-sidebar-item-box ::v-deep .is-active .el-submenu__title .el-icon-arrow-down{
    display: block;
  }
  .parent-sidebar-item-box ::v-deep .el-menu {
    position: relative;
  }
  .parent-sidebar-item-box ::v-deep .el-menu::before {
    position: absolute;
    content: '';
    top: -22px;
    // left: 39.5px;
    left: 27.5px;
    width: 1.5px;
    height: calc(100% - 25px); // 84px
    background: #F2F3F5;
    display: flex;
    flex-shrink: 0;
    z-index: 1;
  }
  .parent-sidebar-item-box ::v-deep .el-menu > .sub-sidebar-item-box{
    position: relative;
  }
  .parent-sidebar-item-box ::v-deep .el-menu > .sub-sidebar-item-box::before{
    position: absolute;
    content: '';
    top: 0px;
    // left: 7.5px; // 42px
    left: -4.5px;
    width: 16px;
    height: 27px;
    display: flex;
    flex-shrink: 0;
    z-index: 99;
    background: url('../../../assets/images/layout/path.png') center center no-repeat;
    background-size: 100% 100%;
    z-index: 2;
  }

  .parent-sidebar-item-box ::v-deep .el-submenu__title:hover .parent-item > span {
    font-weight: 500;
    color: #012169;
  }


  .el-menu--collapse .parent-sidebar-item-box{
    margin: 0 8px;
  }
</style>