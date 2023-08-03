<template>
    <!-- 左侧菜单树 -->
    <el-aside width="200px">
        <el-row class="tac">
            <el-col :span="24">
                <el-menu default-active="2" router class="el-menu-vertical-demo">
                    <el-menu-item v-for="(item, index) in listData" :index="item.path" :key="index"
                    v-if="item.path !== null && item.components !== null && item.pid === 0">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.cname }}</span>
                    </el-menu-item>

                    <el-submenu v-for="(item, index) in listData" :index="item.path" :key="index"
                    v-if="item.path == null && item.components == null">
                      <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.cname }}</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item v-for="(item2, index) in listData" :index="item2.path" :key="index"
                        v-if="item2.pid == item.menuId"/>
                            <i :class="item.icon"></i>
                            <span>{{ item.cname }}</span>
                      </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </el-aside>
</template>

<script>
    export default{
        data(){
            return{
                listData: []
            }
        },
        methods: {
            //加载菜单方法
            loadMenu(){
                this.listData = JSON.parse(this.$store.state.menu);
                console.log(this.listData);
            }
        },
        created(){
            this.loadMenu();
        }
    }
</script>

<style>
    .tac {
            background-color: #eaecee;
            color: #333;
            text-align: center;
            line-height: 600px;
        }
</style>