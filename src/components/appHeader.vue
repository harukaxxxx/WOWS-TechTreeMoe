<template>
  <div class="logo" />
  <a-menu
    theme="dark"
    mode="horizontal"
    v-model:selectedKeys="selectedKeys"
    :style="{ lineHeight: '64px' }"
  >
    <a-menu-item key="1">
      <router-link to="/">TechTreeMoe</router-link>
    </a-menu-item>
    <a-menu-item key="2">
      <router-link to="/intro">介紹與教學</router-link>
    </a-menu-item>
    <a-menu-item key="3">
      <router-link to="/custom">客製化</router-link>
    </a-menu-item>
    <a-menu-item key="4">
      <router-link to="/about">更新紀錄與詳細資訊</router-link>
    </a-menu-item>
    <a-menu-item key="5">
      <router-link to="/charts">統計數據與萌化進度</router-link></a-menu-item
    >
    <a-menu-item key="6">
      <router-link to="/dashboard">後台</router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  name: "HelloWorld",
  date() {
    return {
      selectedKeys: ["2"],
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
