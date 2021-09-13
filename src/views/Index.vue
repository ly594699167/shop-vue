<template>
  <div class="main">
    <a-layout class="layout">
      <a-layout-header class="header">
        <Headers />
      </a-layout-header>
      <a-layout>
        <a-layout-sider> 
          <Aside/>
        </a-layout-sider>
        <a-layout-content> 
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Headers from "../components/layout/header";
import Aside from '../components/layout/aside'
export default {
  components: {
    Headers,
    Aside,
  },
};
</script>

<style lang='less'>
.main {
  width: 100%;
  height: 100%;
  .layout {
    height: 100%;
    .header {
      width: 100%;
      height: 90px;
      line-height: 90px;
      background: skyblue;
    }
  }
}
</style>