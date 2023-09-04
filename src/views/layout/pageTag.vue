<template>
  <div class="pageTags">
    <ul v-dragscroll>
      <li>首页<i class="iconfont icon-guanbi"></i></li>
      <li v-for="(item,index) of openPageTags" :key="item.name" @click="switchTags(item)" :class="isActive(item) ? 'active' : ''">
        {{item.name}}
        <i class="iconfont icon-guanbi" @click="delTagsItem(index)"></i>
      </li>
    </ul>
    <div class="tagsTool">
      <i class="iconfont icon-shezhi" @click="showTagstoolDrop"></i>
      <div class="tagstoolDrop" :style="{'display': datas.isTagstoolDrop}">
        <p @click="handleCloseAll">关闭全部</p>
        <p @click="handleCloseCurrent">关闭当前标签</p>
        <p @click="closeOthersTags">关闭其他</p>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref,reactive } from "vue";
import { useMenu } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

/*
定义默认参数 data
 */
const datas = reactive({
  isTagstoolDrop: 'none'
})

/*
引用属性
 */
const router = useRouter();
const visible = ref(false);
// 折叠侧边栏-菜单
const mainStore = useMenu();
const { openPageTags } = storeToRefs(mainStore);

console.log(openPageTags, 'openPageTags')

const isActive = (val: any) => {
  console.log(router.currentRoute.value.path, val.path, '当前的数据')
  return router.currentRoute.value.path === val.path;
};
const showTagstoolDrop = () => {
  if (datas.isTagstoolDrop === 'none') {
    datas.isTagstoolDrop = 'block'
  } else {
    datas.isTagstoolDrop = 'none'
  }
}
// 关闭当前标签
const delTagsItem = (val: any) => {
  mainStore.delCurrentPageTags(val);
};
// 下拉框-关闭当前选中的数据
const handleCloseCurrent = () => {
  console.log(router.currentRoute.value.meta, "当前的数据");
  let currentRoute = router.currentRoute.value.meta;
  mainStore.delCurrentPageTags(currentRoute);
};
// 关闭全部
const handleCloseAll = () => {
  mainStore.closeAllTags();
  router.push("/");
};
// 切换标签
const switchTags = (val) => {
  router.push(val.path);
};

// 关闭其他
const closeOthersTags = () => {};
</script>

<style lang="scss" scoped>
.active {
  background: #cccccc !important;
}
.pageTags {
  background: silver;
  .iconfont, p {
    cursor: pointer;
  }
  ul {
    width: calc(100% - 150px);
    height: 50px;
    overflow: hidden;
    white-space: nowrap;
    float: left;
    li {
      display: inline-block;
      padding: 0 4px;
      height: 50px;
      background: white;
      margin-right: 2px;
      white-space: nowrap;
      cursor: pointer;
      .iconfont {
        vertical-align: bottom;
        padding: 0 1px;
        display: none;
      }
    }
    li:hover .iconfont {
      display: inline-block;
    }
  }
  .tagsTool {
    width: 30px;
    height: 50px;
    float: right;
    text-align: center;
    border-left: 1px solid gainsboro;
    position: relative;
    .tagstoolDrop {
      width: 100px;
      padding: 4px 0;
      text-align: center;
      position: absolute;
      left: -68px;
      top: 46px;
      p {
        height: 30px;
        line-height: 30px;
        margin: 0;
        background: whitesmoke;
        border-bottom: 1px solid gainsboro;
      }
      p:last-child {
        border-bottom:none;
      }
    }
  }
}
</style>
