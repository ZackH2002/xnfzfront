<template>
		<el-row>
			<div class="firstbackground">
				<img :src="imgSrc" width="100%" height="100%" alt=""/>
			</div>
			<el-col :span="12">
				<div class="grid-content bg-purple"></div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content bg-purple-light">
					<el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
						<h3>欢迎登录虚拟仿真实训教学管理及资源共享云平台</h3>
						<el-form-item label="账号" prop="account">
							<el-input v-model="form.account"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="form.password"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" class="login-but" @click="login('form')">登录</el-button>&nbsp;&nbsp;<el-button  @click="register()">注册</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="grid-content bg-purple"></div>
			</el-col>
		</el-row>
</template>

<script>
	import {
		commonUrl
	} from "../../api/api.js";
	export default {
		data() {
			return {
				imgSrc:require('../../assets/loginbg.png'),
				// 定义表单参数名
				form: {
					account: '',
					password: '',
				},
				// 表单校验规则
				rules: {
					account: [{
							required: true,
							message: '请输入登录账号',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 12,
							message: '长度在 3 到 12 个字符',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],

				}
			}
		},
		methods: {
			register(){
				this.$router.push("/register"); 
			},
			//登录方法
			login(formName) {
				this.$refs[formName].validate((valid) => { //登录前对表单参加进行校验
					if (valid) {
						let params = {
							account: this.form.account,
							password: this.form.password,
						}
						this.request.post(commonUrl.login, params).then(res => {
							console.log(res.data)
							if (res.code == 200) {
								res.data.menus.forEach((item, index) => {
									if (item.path != null) {//路径不为空
										const menu = {
											path: item.path,
											name: item.cname,
											component: () => import('@/views' + item.component)
										};
										this.$router.addRoute('home', menu); //给系统主页左侧增加菜单
									}
								})
								this.$store.commit("setMenu", JSON.stringify(res.data.menus));//将按钮添加至缓存
								//将token和user保存到localStorage中
								this.$store.commit('setToken', res.data.token)
								this.$store.commit('setUser', res.data.user)
								this.$store.commit('setUserType', res.data.type)
								this.$store.commit('setCodeNum', res.data.codeNum)
								//跳转到登录成功后的页面
								this.$router.push("/home/content"); //校验成功跳转到后台主页
							} else {
								this.$message.error(res.message);
							}
						})

					} else { //校验失败，表单未正确填写
						this.$message.error	('请输入正确个格式的账号或密码');
						return false;
					}
				});
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
	}

	.login-form {
		width: 95%;
		padding: 20px;
		text-align: center;
		margin-top: 100px;
		background-color: #fefefe;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

		.login-but {
			margin-right: 79px;
			height: @h;
			width: @w;
		}
	}
</style>
