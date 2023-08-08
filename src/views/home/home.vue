<template>
    <el-container>
        <!-- 这是头部标签 -->
        <el-header>
            欢迎进入虚拟仿真实训平台后台管理系统
            <el-button type="info" class="but" @click="logout">注销</el-button>
        </el-header>

        <el-container>
            <!-- 左侧菜单 -->
            <NavMenu></NavMenu>
            <!-- 页面主体内容 -->
            <el-main>
                <!-- 显示子页面内容 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import NavMenu from "./navMenu.vue"
export default {
    components: {
        NavMenu
    },
    methods: {
        // 注销方法，清空用户数据，并跳转登录页面
        logout() {
            this.$store.commit("logout");
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
.but {
    float: right;
    margin-top: 10px;
}

.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 780px;
    /* line-height: 650px; */
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>