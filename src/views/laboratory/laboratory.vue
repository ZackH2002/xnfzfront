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
    <el-form :inline="true" :model="qurey" class="demo-form-inline">
      <el-form-item label="编号">
        <el-input v-model="qurey.inputNumber" placeholder="编号"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="qurey.inputName" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 20px;" @click="submitQurey()">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="showAddFrom()">新增实验室</el-button>
        <el-button type="primary" icon="el-icon-download" @click="download()">导出数据</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col class="lab-el-col" :span="6" v-for=" (item) in laboratoryData" :key="item.laboratoryId">
        <el-card :body-style="{ padding: '0px' }">
          <div class="clearfix">
            <span style="float: left; font-size: 26px;">{{ item.laboratoryName }}</span>
            <el-button style="float: right;" type="primary" plain>管理实验室设备</el-button>
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
    <div class="pagaination-tool" style="padding:15px; ">
      <!--elementUI的分页控件-->
      <el-pagination background :current-page.sync="currPage" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 查看diaglog -->
    <el-dialog title="实验室详细信息" :visible.sync="dialogTableVisible" @closed='closeDialog'>
      <el-descriptions direction="vertical" :column="2" border>
        <!-- 设备编号、设备名称 、类别 、软件系统 、版本号 、设备供应商 、用途 、所在实验室、 设备状态。 -->
        <el-descriptions-item label="编号">{{ lab.laboratoryNumber }}</el-descriptions-item>
        <el-descriptions-item label="名称">{{ lab.laboratoryName }}</el-descriptions-item>
        <el-descriptions-item label="工位数">{{ lab.stationNum }}</el-descriptions-item>
        <el-descriptions-item label="实验室面积">{{ lab.area }}</el-descriptions-item>
        <el-descriptions-item label="设施总值">{{ lab.facilitiesPrice }}</el-descriptions-item>
        <el-descriptions-item label="关联设备数">{{ lab.simulationEquipmentNum }}</el-descriptions-item>
        <el-descriptions-item label="简介" :span="2">{{ lab.profile }}</el-descriptions-item>
        <el-descriptions-item label="概要介绍" :span="2">{{ lab.detail }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 编辑和新增窗口 -->
    <el-dialog title="实验室详细信息" :visible.sync="dialogFormVisible" @closed='closeDialog'>
      <el-form ref="simulationEquipment" :model="lab" :rules="rules" :label-position="labelPosition" label-width="150px">
        <el-form-item label="实验室" prop="number">
          <el-input v-model="lab.laboratoryNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验室名称" prop="name">
          <el-input v-model="lab.laboratoryName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="lab.address"></el-input>
        </el-form-item>
        <el-form-item label="工位数" prop="stationNum">
          <el-input v-model="lab.stationNum"></el-input>
        </el-form-item>
      </el-form>
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
      dialogTableVisible: false,
      dialogFormVisible: false,
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
    }
  },
  methods: {
    listLaboratory() {
      this.request.get(laboratoryUrl.listLaboratory + "?current=" + this.currPage + "&size=" + this.pageSize).then(res => {
        res.data.data.records.forEach((item, index) => {
          item.updateTime = dateFormat(item.updateTime);
        })
        this.laboratoryData = res.data.data.records;
        this.total = res.data.data.total;
      })
    },
    viewDetails(item) {
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
    closeDialog() {

      this.lab.laboratoryId = null;
      this.lab.laboratoryName = '';
      this.lab.stationNum = null;
      this.lab.area = null;
      this.lab.facilitiesPrice = null;
      this.lab.address = '';
      this.lab.profile = '';
      this.lab.detail = '';
    },
  },
  mounted() {
    this.listLaboratory()
  },
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