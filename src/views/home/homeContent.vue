<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card>
                    <div class="equipment-status" id="equipmentStatusChart" :style="myChartStyle"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div :style="myChartStyle">
                        <h2>资源概览</h2>
                        <el-row>
                            <el-col :span="12">
                                <h1>实验室数量</h1>
                                <span
                                    style="border-radius: 50%;    height: 150px;    width: 150px;    display: inline-block; background: #238ff9;  vertical-align: top;">
                                    <span
                                        style="display: block;color: #FFFFFF;height: 150px;line-height: 150px;text-align: center;font-size: 36px;">
                                        {{ laboratoryCount }}</span>
                                </span>
                            </el-col>
                            <el-col :span="12">
                                <h1>设备数量</h1>
                                <span
                                    style="border-radius: 50%;    height: 150px;    width: 150px;    display: inline-block; background: #238ff9;  vertical-align: top;">
                                    <span
                                        style="display: block;color: #FFFFFF;height: 150px;line-height: 150px;text-align: center;font-size: 36px;">
                                        {{ equipmentCount }}</span>
                                </span>
                            </el-col>
                        </el-row>

                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div class="equipment-type" id="equipmentTypeChart" :style="myChartStyle"></div>
                </el-card>
            </el-col>

        </el-row>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { simulationEquipmentUrl } from "../../api/api.js";
import { laboratoryUrl } from "../../api/api.js";
// 引入echarts
export default {
    data() {
        return {
            equipmentStatusChart: {},
            statusData: [],
            typeData: [],
            myChartStyle: { width: "100%", height: "450px", padding: '10px' }, //图表样式
            equipmentCount: null,
            laboratoryCount: null,
        }
    },
    methods: {
        initStausData() {
            this.request.get(simulationEquipmentUrl.getStatusCounts).then(res => {
                if (res.code == 200) {
                    this.statusData = res.data.data;
                    console.log(this.statusData);
                    this.initChart('equipmentStatusChart', this.statusData, '设备状态', '70%');
                }
            })
        },
        initTypeData() {
            this.request.get(simulationEquipmentUrl.getTypeCounts).then(res => {
                if (res.code == 200) {
                    this.typeData = res.data.data;
                    console.log(this.typeData);
                    this.initChart('equipmentTypeChart', this.typeData, '设备类型', ['40%', '70%']);
                }
            })
        },
        initEquipmentCount() {
            this.request.get(simulationEquipmentUrl.getSimulationEquipmentCount).then(res => {
                if (res.code == 200) {
                    this.equipmentCount = res.data.data;
                }
            })
        },
        initLaboratoryCount() {
            this.request.get(laboratoryUrl.getLaboratoryCount).then(res => {
                if (res.code == 200) {
                    this.laboratoryCount = res.data.data;
                }
            })
        },
        initChart(id, initdata, title, radius) {
            var chartDom = document.getElementById(id);
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                title: {
                    text: title,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        label: {
                            show: true,
                            formatter: "{b} : {c}" // b代表名称，c代表对应值，d代表百分比
                        },
                        type: 'pie',
                        // radius: '50%',
                        radius: radius,
                        data: initdata,
                        // itemStyle: {
                        //     borderRadius: 10,
                        //     borderColor: '#fff',
                        //     borderWidth: 2
                        // },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                // borderRadius: 10,
                                // borderColor: '#fff',
                                // borderWidth: 2
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option);

        },
    },
    mounted() {
        this.initStausData();
        this.initTypeData();
        this.initEquipmentCount();
        this.initLaboratoryCount();
    }
}

</script>
