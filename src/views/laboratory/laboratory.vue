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
    <el-row>
      <el-col :span="5" v-for=" (item) in laboratoryData" :key="item.laboratoryId" :offset="1">
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span>{{ item.laboratoryName }}</span>
          </div>
          <div style="padding: 10px;">
            <el-descriptions class="margin-top" :column="1" :size="size">
              <el-descriptions-item label="编号">L001</el-descriptions-item>
              <el-descriptions-item label="地址">{{ item.address }}</el-descriptions-item>
              <el-descriptions-item label="工位数">{{ item.stationNum }}</el-descriptions-item>
              <el-descriptions-item label="实验室面积">{{ item.area }}(m²)</el-descriptions-item>
              <el-descriptions-item label="设施总值">{{ item.facilitiesPrice }}万元</el-descriptions-item>
              <el-descriptions-item label="关联设备数">100</el-descriptions-item>
              <el-descriptions-item label="更新时间">{{ item.updateTime }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { laboratoryUrl } from "../../api/api.js";
import { dateFormat } from "../../utils/common.js";


export default {
  data() {
    return {
      mainTableKey: 1,
      current: 1,
      pageSize: 12,
      total: "",
      laboratoryData: []
    }
  },
  methods: {
    listLaboratory() {
      this.request.get(laboratoryUrl.listLaboratory + "?current=" + this.current + "&size=" + this.pageSize).then(res => {
        res.data.data.records.forEach((item, index) => {
          item.updateTime = dateFormat(item.updateTime);
        })
        this.laboratoryData = res.data.data.records;
        this.total = res.data.data.total;
      })
      this.mainTableKey = Math.random();
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
</style>