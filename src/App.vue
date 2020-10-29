<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <!-- <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1"> nav 1 </a-menu-item>
        <a-menu-item key="2"> nav 2 </a-menu-item>
        <a-menu-item key="3"> nav 3 </a-menu-item>
      </a-menu> -->
      <AppHeader/>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <!-- <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        Content
      </div> -->
      <router-view/>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <!-- Ant Design ©2018 Created by Ant UED -->
      <AppFooter/>
    </a-layout-footer>
  </a-layout>
  <!-- <AppHeader/>
  <router-view/>
  <AppFooter/> -->
</template>

<script>
import AppHeader from "@/components/appHeader.vue";
import AppFooter from "@/components/appFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
