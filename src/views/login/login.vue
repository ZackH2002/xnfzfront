<template>
	<el-row>
		<!--设置背景-->
		<div class="firstbackground">
			<img :src="imgSrc" width="100%" height="100%" />
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
					<el-button type="primary" class="login-but" @click="login('form')">登录</el-button>
					<el-button @click="register">注册</el-button>
				</el-form>
			</div>
		</el-col>
	</el-row>
</template>

<script>
import { commonUrl } from "../../api/api.js"
export default {
	data() {
		return {
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
		login(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//登录
					let params = {
						account: this.form.account,
						password: this.form.password
					}
					//发送登录请求
					this.request.post(commonUrl.login, params).then(res => {
						if (res.code == 200) {
							//获取data当中的菜单值
							res.data.menus.forEach((item, index) => {
								const menu = {
									path: item.path,
									name: item.cname,
									component: () => import("@/views" + item.component)
								}
								this.$router.addRoute("home", menu); //添加动态菜单，并指定路由
							});
							this.$store.commit("setMenu", JSON.stringify(res.data.menus)) //菜单放到缓存当中
							//token和user放到缓存中
							this.$store.commit("setToken", res.data.token);
							this.$store.commit("setUser", res.data.user);
							// this.$message.success(res.message);
							this.$router.push("/home/content");
						}
						else {
							this.$message.error(res.message);
						}
					})
				}
				else {
					//校验失败
					this.$message.error("请根据提示正确填写用户名和密码");
					return false;
				}
			});
		},
		register() {
			this.$router.push("/register")
		}
	},
	created() {

	}
}
</script>

<style lang="less">
@h: 40px; //使用less 通过@定义变量h
@w: 160px;

.grid-content {
	border-radius: 4px;
	min-height: 36px;
	margin-top: 50% !important;
}

.el-row {
	position: inherit !important;
}

.firstbackground {
	width: 100%;
	height: 100%;
	z-index: -1;
	position: absolute !important;
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
