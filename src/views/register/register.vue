<template>
    <el-row>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="register-form">
                <h3>用户注册</h3>
                <el-form-item label="账号" prop="account">
                    <el-input v-model="form.account" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordConfirm">
                    <el-input type="password" v-model="form.passwordConfirm"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="userType">
                    <el-select v-model="form.userType">
                    <el-option v-for="item in userTypeOption"
                    :key="item.codeValue" 
                    :label="item.codeName"
                    :value="item.codeValue"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="编号" prop="number">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="register-but" @click="">注册</el-button>
                </el-form-item>
            </el-form>
        </div></el-col> 
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
</template>

<script>
    export default{
        data(){
            // 验证密码
            var validatePass = (rule, value, callback)=>{
                if(value === ""){
                    callback(new Error("请输入密码"))
                }
                else{
                    if(this.form.passwordConfirm !== ""){
                        this.$refs.form.validatePass("passwordConfirm")
                    }
                    callback();
                }
            };
            var validatePassConfirm = (rule, value, callback)=>{
                if(value === ""){
                    callback(new Error("请确认密码"));
                }
                else if(value !== this.form.password){
                    callback(new Error("两次密码输入不一致"));
                }
                else{
                    callback();
                }
            }

            return{
                userTypeOption:[{
                    codeValue: "",
                    codeName: "-请选择用户类型-",
                }],
                // 表单参数
                form: {
                    account: "",
                    password: "",
                    passwordConfirm: "",
                    name: "",
                    phone: "",
                    email: "",
                    userType: "",
                    number: ""
                },
                rules: {
                    account:[
                        {
                            require: true,
                            message: "请输入登录账号",
                            trigger: "blur"
                        },
                        {
                            min: 3,
                            max: 12,
                            message: "长度3-12位之间",
                            trigger: "blur"
                        }
                ],
                password: [
                    {
                        require: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 12,
                        message: "长度3-12位之间",
                        trigger: "blur"
                    },
                    {
                        validator: validatePass,
                        trigger: "blur"
                    }
                ],
                passwordConfirm: [
                    {
                        require: true,
                        message: "请确认密码",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 12,
                        message: "长度3-12位之间",
                        trigger: "blur"
                    },
                    {
                        validator: validatePassConfirm,
                        trigger: "blur"
                    }
                ]
                }
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
		margin-top: 15%!important;
	}
	
	.el-row{
		position: inherit!important;
	}
	
	.firstbackground{
		width: 98%;
		height: 98%;
		z-index: -1;
		position: absolute!important;
	}
	
	.register-form {
		width: 95%;
		padding: 20px;
		text-align: center;
		margin-top: 100px;
		background-color: #fefefe;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	
	.register-but {
		margin-right: 79px;
		height: @h;
		width: @w;
	}
	}
</style>