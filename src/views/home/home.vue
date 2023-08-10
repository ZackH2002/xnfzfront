<template>
    <el-container>
        <!-- 这是头部标签 -->
        <el-header>
            欢迎进入虚拟仿真实训平台后台管理系统
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command=1>用户信息</el-dropdown-item>
                    <el-dropdown-item command=2>注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
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
    data() {
        return {
            user: {
                userId: '',
                name: '',
                account: '',
                email: '',
                password: '',
                intro: '',
                phone: '',
                type: '',
                createTime: '',
                updateTime: ''
            },
        }
    },
    components: {
        NavMenu
    },
    methods: {
        // 注销方法，清空用户数据，并跳转登录页面
        logout() {
            this.$store.commit("logout");
            this.$router.push("/");
        },
        handleCommand(command) {
            if (command == 1) {

            } else if (command == 2) {
                this.$store.commit("logout");
                this.$router.push("/");
            }
        }
    },
    mounted() {
        this.user = this.$store.state.user;
    }
}
</script>

<style scoped>
.dropdown {
    float: right;
    margin-right: 30px;
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
    height: 860px;
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