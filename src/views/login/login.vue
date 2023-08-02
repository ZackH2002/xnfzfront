<template>
    <el-row>
        <!--设置背景-->
        <div class="firstbackground">
            <img :src="imgSrc" width="100%" height="100%"/>
        </div>
        <el-col :span="14">
            <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple-light">
				<el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
					<h3>欢迎登陆</h3>
					<el-form-item label="账号" prop="account">
						<el-input v-model="form.account" placeholder="请输入账号"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-button type="primary" class="login-but" @click="">登录</el-button>
					<el-button>注册</el-button>
				</el-form>
			</div>
        </el-col>
    </el-row>
</template>

<script>
import request from '@/utils/request';

    export default{
        data(){
            return{
                imgSrc: require('../../assets/loginbg.png'),
				form: {
					account: "",
					password: ""
				},
				rules: {
					account: [
						{
							required: true,
							message: "请输入账号",
							trigger: "blur"
						},
						{
							min: 3,
							max: 12,
							message: "长度为3-12之间",
							trigger: "blur"
						}
					],
					password: [
						{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						}
					]
				}
			}
        },
		methods: {
				login(){
					let param = {
						account: "admin",
						password: "123456"
					}
					request.post("login", param).then(res=>{
						console.log(res)
					})
				}
			}
    }

</script>

<style lang="less">
    @h: 40px; //使用less 通过@定义变量h
	@w: 160px;

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
		margin-top: 50%!important;
	}
	
	.el-row{
		position: inherit!important;
	}
	
	.firstbackground{
		width: 100%;
		height: 100%;
		z-index: -1;
		position: absolute!important;
        top: 0px;
        left: 0px;
	}

	.login-form {
		width: 95%;
		padding: 20px;
		text-align: center;
		margin-top: 100px;
		background-color: #fefefe;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

		.login-but {
			margin-right: 79px;
			height: @h;
			width: @w;
		}
	}
</style>
