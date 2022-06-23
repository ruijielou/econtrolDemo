<script setup>
import * as echarts from "echarts";
import { provide } from "vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from "./components/HelloWorld.vue";
provide("echarts", echarts);
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <!-- <p>
    <router-link to="/pc">Go to Home</router-link>
    <router-link to="/mobile">Go to mobile</router-link>
  </p> -->
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>

<style>
* {
  box-sizing: border-box;
}

/*reset.css*/
body,
div,
span,
header,
footer,
nav,
section,
aside,
article,
ul,
dl,
dt,
cite,
dd,
li,
a,
p,
h1,
h2,
h3,
h4,
h5,
h6,
i,
b,
textarea,
button,
input,
select,
figure,
figcaption {
  padding: 0;
  margin: 0;
  list-style: none;
  font-style: normal;
  text-decoration: none;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
    Segoe UI, Arial, Roboto, "PingFang SC", "miui", "Hiragino Sans GB",
    sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  /* &:focus {
      outline: none;
  } */
}

body {
  /*font-family: 'PingFang SC';*/
  background: rgba(248, 250, 251, 1);
  --van-nav-bar-icon-color: "#fff";
  /* --van-step-active-color: '#0081FF' !important; */
  /* --van-primary-color: #FFA200 !important; */
  --van-tab-text-color: #8d9eae;
  --van-tab-active-text-color: #1d252f;
  --van-tabbar-height: 90px !important;
}

/* del {
  color: #949497;
} */

input {
  border: none;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

textarea {
  border: none;
  outline: none;
}

button {
  border: none;
  outline: none;
}

a {
  text-decoration: none;
  color: #333;
}

li {
  list-style-type: none;
}

.pf-bold {
  font-weight: 700;
}

/*flex居左布局*/
.flex-start {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-start;
}

/*flex居右布局*/
.flex-end {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-end;
}

/*flex两端布局*/
.space-between {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  -webkit-flex-wrap: wrap; /* Safari 6.1+ */
  flex-wrap: wrap;
}

/*flex居中布局*/
.space-center {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
}

/*flex围绕布局*/
.space-around {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-around;
}

/*flex居左垂直居中布局*/
.flex-start-align {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

/*flex居两端垂直居中布局*/
.space-between-align {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/*flex居两端around布局*/
.space-around-align {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/*flex居右垂直居中布局*/
.flex-start-end {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/*flex居两端布局-垂直底部*/
.space-between-align-items {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

/*flex居两端布局-垂直顶部*/
.align-items-top {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: start;
}

/*flex居两端布局-中轴线*/
.align-items-center {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
}

/*flex垂直布局*/
.flex-content {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
}

/*flex垂直布局上*/
.flex-content-start {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
}

/*flex垂直布局局居中*/
.flex-content-center {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}

/*flex垂直布局轴线占满整个交叉轴*/
.flex-content-stretch {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-content: stretch;
  flex-wrap: wrap;
}

/*flex垂直布局上下两端*/
.flex-content-between {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
}

h2 {
  color: #1d252f;
  font-weight: 600;
  font-size: 20px;
  line-height: 35px;
}

h3 {
  color: #1d252f;
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
}

h6 {
  color: #8d9eae;
  opacity: 0.8;
  line-height: 20px;
}

.font-12 {
  font-size: 12px;
  white-space: nowrap;
}

.font-14 {
  font-size: 14px;
}

.font-12-wrap {
  font-size: 12px;
  white-space: wrap;
}

/*单行文本省略*/
.text-line1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/*两行文本省略*/
.text-line2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.font-bold {
  font-weight: bold;
}

/*背景白色*/
.bg-w {
  background: #fff;
}

.m20-t {
  margin-top: 20px;
}

.m20-b {
  margin-bottom: 20px;
}

.m20-y {
  margin-top: 20px;
  margin-bottom: 20px;
}

.m16-t {
  margin-top: 16px;
}

.p20 {
  padding: 20px;
}

.p20-b {
  padding-bottom: 20px;
}

.p20-y {
  padding: 20px 0;
}

.p10-t {
  padding-top: 10px;
}

.p16-x {
  padding: 0 16px;
}

.p16 {
  padding: 16px;
}

.p16-b {
  padding-bottom: 16px;
}

.p16-y {
  padding: 16px 0;
}

.p10-y {
  padding: 10px 0;
}

.p10-b {
  padding-bottom: 10px;
}

.radius10 {
  border-radius: 10px;
}

.m10-y {
  margin-top: 10px;
  margin-bottom: 10px;
}

.m10-b {
  margin-bottom: 10px;
}

.m10-t {
  margin-top: 10px;
}

.m15-t {
  margin-top: 15px;
}

.hide {
  display: none;
}

.m0-t {
  margin-top: 0;
}

.m0-l {
  margin-left: 0;
}

.m0-b {
  margin-bottom: 0;
}

.m0-r {
  margin-right: 0;
}

.p8-16 {
  padding: 8px 16px;
}
</style>