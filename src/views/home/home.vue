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
                <el-dialog title="用户信息" :visible.sync="dialogTableVisible" center>
                    <el-descriptions direction="vertical" :column="2" border>
                        <el-descriptions-item label="用户名">{{ user.account }}</el-descriptions-item>
                        <el-descriptions-item label="姓名">{{ user.name }}</el-descriptions-item>
                        <el-descriptions-item label="邮箱">{{ user.email }}</el-descriptions-item>
                        <el-descriptions-item label="电话号码">{{ user.phone }}</el-descriptions-item>
                        <el-descriptions-item label="用户类型">
                            <el-tag size="small">{{ getCodeNameByValue(typeOption, user.type) }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="介绍">{{ user.intro }}</el-descriptions-item>
                    </el-descriptions>

                </el-dialog>
                <!-- 显示子页面内容 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import NavMenu from "./navMenu.vue"
import { commonUrl } from "@/api/api";
export default {
    data() {
        return {
            dialogTableVisible: false,
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
            typeOption: [{
                codeValue: "",
                codeName: "",
            }],

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
                this.dialogTableVisible = true;
            } else if (command == 2) {
                this.$store.commit("logout");
                this.$router.push("/");
            }
        },
        getCodeNameByValue(typeOption, targetCodeValue) {
            for (let i = 0; i < typeOption.length; i++) {
                if (typeOption[i].codeValue == targetCodeValue) {
                    return typeOption[i].codeName;
                }
            }
            return null;
        },
        loadUserType() {
            this.request.get(commonUrl.loadDictionaryData + "userType").then(res => {
                if (res.code == 200) {
                    this.typeOption = res.data.data;
                    this.$store.commit("setUserType", res.data.data);
                }
            })
        },
    },
    mounted() {
        this.user = this.$store.state.user;
        this.loadUserType();
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