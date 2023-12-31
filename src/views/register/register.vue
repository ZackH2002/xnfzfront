<template>
    <el-row>
        <el-col :span="8">
            <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple-light">
                <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="register-form">
                    <h3>用户注册</h3>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="form.account"></el-input>
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
                            <el-option v-for="item in userTypeOption" :key="item.codeValue" :label="item.codeName"
                                :value="item.codeValue" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="编号" prop="number">
                        <el-input v-model="form.number"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="register-but" @click="register('form')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
</template>

<script>
import { commonUrl } from '@/api/api';
import { userUrl } from '@/api/api';

export default {
    data() {
        // 验证密码
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"))
            }
            else {
                if (this.form.passwordConfirm !== "") {
                    this.$refs.form.validateField("passwordConfirm")
                }
                callback();
            }
        };

        var validatePassConfirm = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请确认密码"));
            }
            else if (value !== this.form.password) {
                callback(new Error("两次密码输入不一致"));
            }
            else {
                callback();
            }
        };

        var validatePhoneNumber = (rule, value, callback) => {
            const reg = /^[1][3,4,5,6,7,8,9,][0-9]{9}$/;
            var flag = reg.test(value);
            if (!flag) {
                callback(new Error("电话号码格式不正确，请重新输入"));
            }
            else {
                callback();
            }
        };

        var validateEmail = (rule, value, callback) => {
            const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            var flag = reg.test(value);
            if (!flag) {
                callback(new Error("邮箱格式不正确，请重新输入"));
            }
            else {
                callback();
            }
        };

        // 校验用户名是否为已经使用的
        var checkAccount = (rule, value, callback) => {
            this.request.post(userUrl.accountIsExist, value).then(res => {
                if (res.code == 500) {
                    callback(new Error(res.message));
                }
                else {
                    callback();
                }
            })
        };

        return {
            userTypeOption: [{
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
                account: [
                    {
                        required: true,
                        message: "请输入登录账号",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 12,
                        message: "长度3-12位之间",
                        trigger: "blur"
                    },
                    {
                        validator: checkAccount,
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
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
                        required: true,
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
                ],
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入联系电话",
                        trigger: "blur"
                    },
                    {
                        validator: validatePhoneNumber,
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur"
                    },
                    {
                        validator: validateEmail,
                        trigger: "blur"
                    }
                ],
                userType: [
                    {
                        required: true,
                        message: "请选择用户类型",
                        trigger: "blur"
                    }
                ],
                number: [
                    {
                        required: true,
                        message: "请输入编号",
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    methods: {
        loadUserType() {
            this.request.get(commonUrl.loadDictionaryData + "userType").then(res => {
                if (res.code == 200) {
                    this.userTypeOption = res.data.data;
                }
            })
        },
        register(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let parmas = {
                        account: this.form.account,
                        password: this.form.password,
                        name: this.form.name,
                        phone: this.form.phone,
                        email: this.form.email,
                        type: this.form.userType,
                        number: this.form.number
                    };
                    this.request.post(userUrl.register, parmas).then(res => {
                        this.$alert(res.message);
                        this.$router.push("/")
                    });
                }
                else {
                    this.$message("请正确填写表单数据")
                }
            })
        }
    },
    mounted() {
        this.loadUserType();
    }
}
</script>

<style lang="less">
@h: 40px; //使用less 通过@定义变量h
@w: 160px;

.grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin-top: 15% !important;
}

.el-row {
    position: inherit !important;
}

.firstbackground {
    width: 98%;
    height: 98%;
    z-index: -1;
    position: absolute !important;
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