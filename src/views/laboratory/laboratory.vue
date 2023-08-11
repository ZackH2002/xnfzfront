<template>
    <el-table :key="mainTableKey" :data="laboratoryData" style="widows: 100%;">
      <el-table-column prop="name" label="实验室名称" width="150"/>
      <el-table-column prop="stationNum" label="工位数" width="150"/>
      <el-table-column prop="area" label="实验室面积(m²)" width="150"/>
      <el-table-column prop="facilitiesPrice" label="设施总值(万元)" width="150"/>
      <el-table-column prop="adress" label="地址" width="150"/>
      <el-table-column prop="SENum" label="关联设备数" width="150"/>
      <el-table-column prop="updateTime" label="更新时间" width="150"/>
    </el-table>
</template>

<script>
import { laboratoryUrl } from "../../api/api.js";
import { dateFormat } from "../../utils/common.js";


export default{
    data(){
        return{
            mainTableKey: 1,
            current: 1,
            pageSize: 12,
            total: "",
            laboratoryData: []
        }
    },
    methods:{
        listLaboratory(){
            this.request.get(laboratoryUrl.listLaboratory + "?current=" + this.current + "&size=" + this.size).then(res =>{
                res.data.data.records.forEach((item, index) =>{
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