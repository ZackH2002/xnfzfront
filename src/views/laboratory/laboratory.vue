<template>
  <div>
    <!-- <div>
    <el-table :key="mainTableKey" :data="laboratoryData" style="widows: 100%;">
      <el-table-column prop="laboratoryName" label="实验室名称" />
      <el-table-column prop="stationNum" label="工位数" />
      <el-table-column prop="area" label="实验室面积(m²)" />
      <el-table-column prop="facilitiesPrice" label="设施总值(万元)" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="关联设备数" width="150" />
      <el-table-column prop="updateTime" label="更新时间" />
    </el-table>
  </div> -->
  <!-- 显示实验室卡片 -->
    <el-row :gutter="20">
      <el-col class="lab-el-col" :span="6" v-for=" (item) in laboratoryData" :key="item.laboratoryId">
        <el-card :body-style="{ padding: '0px' }">
          <div class="clearfix">
            <span style="float: left; font-size: 26px;">{{ item.laboratoryName }}</span>
            <el-button style="float: right;" type="primary" @click="simulationEquipment(item)">管理实验室设备</el-button>
          </div>
          <div style="padding: 15px;" @click="viewDetails(item)">
            <el-descriptions class="margin-top" :column="1">
              <el-descriptions-item label="编号">{{ item.laboratoryNumber }}</el-descriptions-item>
              <el-descriptions-item label="地址">{{ item.address }}</el-descriptions-item>
              <el-descriptions-item label="工位数">{{ item.stationNum }}</el-descriptions-item>
              <el-descriptions-item label="实验室面积">{{ item.area }}(m²)</el-descriptions-item>
              <el-descriptions-item label="设施总值">{{ item.facilitiesPrice }}万元</el-descriptions-item>
              <el-descriptions-item label="关联设备数">{{ item.simulationEquipmentNum }}</el-descriptions-item>
              <el-descriptions-item label="更新时间">{{ item.updateTime }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--控制分页部分-->
    <el-row>
    <el-col :span="22">
    <div class="pagaination-tool" style="padding:15px; ">
      <!--elementUI的分页控件-->
      <el-pagination background :current-page.sync="currPage" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </el-col>
    <el-col :span="30">
      <el-button type="primary" icon="el-icon-plus" @click="showAddFrom()">新增实验室</el-button>
    </el-col>
  </el-row>

    <!-- 查看diaglog -->
    <el-dialog title="实验室详细信息" :visible.sync="dialogTableVisible" @close='closeDialog'>
      <el-descriptions direction="vertical" :column="2" border>
        <!-- 设备编号、设备名称 、类别 、软件系统 、版本号 、设备供应商 、用途 、所在实验室、 设备状态。 -->
        <el-descriptions-item label="编号">{{ lab.laboratoryNumber }}</el-descriptions-item>
        <el-descriptions-item label="名称">{{ lab.laboratoryName }}</el-descriptions-item>
        <el-descriptions-item label="工位数">{{ lab.stationNum }}</el-descriptions-item>
        <el-descriptions-item label="实验室面积">{{ lab.area }}</el-descriptions-item>
        <el-descriptions-item label="设施总值">{{ lab.facilitiesPrice }}</el-descriptions-item>
        <el-descriptions-item label="关联设备数">{{ lab.simulationEquipmentNum }}</el-descriptions-item>
        <el-descriptions-item label="地址">{{ lab.address }}</el-descriptions-item> 
        <el-descriptions-item label="简介" :span="2">{{ lab.profile }}</el-descriptions-item>
        <el-descriptions-item label="概要介绍" :span="2">{{ lab.detail }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="showUpdateForm()" style="margin-right: 30px;">修改实验室信息</el-button>
      <el-button type="primary" @click="showDelete()" style="margin-right: 30px;">删除实验室信息</el-button>
    </el-dialog>

    <!-- 编辑和新增窗口 -->
    <el-dialog title="实验室详细信息" :visible.sync="dialogFormVisible" @close='closeDialog'>
      <el-form ref="lab" :model="lab" :rules='rules' label-width="150px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="实验室编号" prop="laboratoryNumber">
              <el-input v-model="lab.laboratoryNumber" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="实验室名称" prop="laboratoryName">
              <el-input v-model="lab.laboratoryName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="地址" prop="address">
              <el-input v-model="lab.address"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="工位数" prop="stationNum">
              <el-input v-model="lab.stationNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="实验室面积" prop="area">
              <el-input v-model="lab.area" placeholder="单位(m²)"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="设施总值" prop="facilitiesPrice">
              <el-input v-model="lab.facilitiesPrice" placeholder="单位(万元)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="简介" prop="profile">
          <el-input v-model="lab.profile"></el-input>
        </el-form-item>
        <el-form-item label="概要介绍">
          <el-input v-model="lab.detail" type="textarea" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="dialogStatus == 'add'" @click="submitAddForm('lab')" style="
          margin-right: 30px;">添加实验室</el-button>
        <el-button type="primary" v-if="dialogStatus == 'update'" @click="submitUpdateForm('lab')" style="
          margin-right: 30px;">修改实验室</el-button>
        <el-button @click="closeDialog()">取 消</el-button>
      </div>
    </el-dialog>

      <!-- 删除实验室提示 -->
      <el-dialog title="提示" :visible.sync="dialogDeleteVisible" width="30%" @close='closeDialog'>
      <span>是否要删除实验室信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteLaboratory()">确 定</el-button>
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import { laboratoryUrl } from "../../api/api.js";
import { dateFormat } from "../../utils/common.js";


export default {
  data() {
    return {
      mainTableKey: 1,
      currPage: 1,
      pageSize: 8,
      total: 1,
      laboratoryData: [],
      qurey: {
        inputNumber: '',
        inputName: '',
      },
      dialogStatus: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogDeleteVisible: false,
      lab: {
        laboratoryNumber: '',
        laboratoryId: null,
        laboratoryName: '',
        stationNum: null,
        area: null,
        facilitiesPrice: null,
        address: '',
        profile: '',
        detail: '',
        simulationEquipmentNum: null,
      },
      rules: {
        laboratoryNumber: [
          {
            required: true,
            message: "请输入设备编号",
            trigger: 'blur'
          },
          {
            min: 3,
            max: 12,
            message: "长度3-12位之间",
            trigger: "blur"
          }
        ],
        laboratoryName: [
          {
            required: true,
            message: "请输入设备名称",
            trigger: 'blur',
            type: '',
          },
          {
            min: 3,
            max: 12,
            message: "长度3-12位之间",
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    listLaboratory() {
      // 加载实验室信息
      this.request.get(laboratoryUrl.listLaboratory + "?current=" + this.currPage + "&size=" + this.pageSize).then(res => {
        res.data.data.records.forEach((item, index) => {
          item.updateTime = dateFormat(item.updateTime);
        })
        this.laboratoryData = res.data.data.records;
        this.total = res.data.data.total;
      })
    },
    viewDetails(item) {
      // 展示实验室卡片信息
      this.lab.laboratoryId = item.laboratoryId;
      this.lab.laboratoryName = item.laboratoryName;
      this.lab.stationNum = item.stationNum;
      this.lab.area = item.area;
      this.lab.facilitiesPrice = item.facilitiesPrice;
      this.lab.address = item.address;
      this.lab.profile = item.profile;
      this.lab.detail = item.detail;
      this.lab.laboratoryNumber = item.laboratoryNumber;
      this.lab.simulationEquipmentNum = item.simulationEquipmentNum;
      this.dialogTableVisible = true;
    },
    // 展示新增实验室表单
    showAddFrom(){
      this.dialogFormVisible = true;
      this.dialogStatus = "add";
    },
    showUpdateForm(){
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
    handleSizeChange(val) {
      //改变每页显示数量重新请求数据，重置当前页为第一页
      this.pageSize = val;
      this.currPage = 1;
      this.listLaboratory();
    },
    handleCurrentChange(val) {
      //点击改变当前页
      this.currPage = val;
      this.listLaboratory();
    },
    closeDialog(){
      this.lab.laboratoryId = null;
      this.lab.laboratoryNumber = '';
      this.lab.laboratoryName = '';
      this.lab.stationNum = null;
      this.lab.area = null;
      this.lab.facilitiesPrice = null;
      this.lab.address = '';
      this.lab.profile = '';
      this.lab.detail = '';
      this.dialogFormVisible = false;
      this.dialogTableVisible = false;
    },
    showDelete(){
      this.dialogDeleteVisible = true;
    },
    deleteLaboratory() {
      // 删除实验室
      this.request.post(laboratoryUrl.deleteLaboratory+"?laboratoryId="+this.lab.laboratoryId).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }
      })
      this.dialogDeleteVisible = false;
      this.listLaboratory();
    },
    submitAddForm(lab){
      // 提交添加实验室表单
      this.$refs[lab].validate((valid) => {
        if(valid){
          this.lab.updateTime = new Date();
          let params = this.lab;
          this.request.post(laboratoryUrl.addLaboratory, params).then(res=>{
            if(res.code == 200){
              this.$message({
                message: "新增实验室成功",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.listLaboratory();
            }
          })
        }else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    submitUpdateForm(lab){
      // 提交更新表单
      this.$refs[lab].validate((valid) => {
        if(valid){
          this.updateTime = new Date();
          let params = this.lab;
          this.request.post(laboratoryUrl.updateLaboratory, params).then(res=>{
            if(res.code == 200){
              this.$message({
                message: "更新实验室成功",
                type: "success"
              })
              this.dialogFormVisible = false;
              this.dialogTableVisible = false;
              this.listLaboratory();
            }
          })
        }else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    simulationEquipment(item){
      //跳转仿真设备管理
      this.$router.push({path:'simulationequipment', query:{laboratoryId: item.laboratoryId}});
    }
    },
    mounted() {
      this.listLaboratory()
    }
}
</script>

<style>
.gradualChangeTwo {
  opacity: 85%;
  background-image: linear-gradient(to bottom right, #ffc4b9, #b91f03);
}

.el-card:hover {
  box-shadow: 0 1px 6px rgba(255, 255, 255, 0.932);
  border-color: #eee;
  transition: all 0.2s ease-in-out;
}

.stitle {
  font-size: 200px;
  color: #fff;
  z-index: 11;
  margin-bottom: 10;
}

.clearfix {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.lab-el-col {
  margin-bottom: 20px;
}

.el-card {
  border-radius: 12px;
}
</style>