<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="number" label="设备编号" width="150">
      </el-table-column>
      <el-table-column prop="name" label="设备名称" width="150">
      </el-table-column>
      <el-table-column prop="type" label="类别" width="120">
      </el-table-column>
      <el-table-column prop="softwareSystem" label="软件系统" width="120">
      </el-table-column>
      <el-table-column prop="versionNumber" label="版本号" width="120">
      </el-table-column>
      <el-table-column prop="supplier" label="设备供应商" width="120">
      </el-table-column>
      <el-table-column prop="purpose" label="用途" width="120">
      </el-table-column>
      <el-table-column prop="laboratoryId" label="所属实验室" width="120">
      </el-table-column>
      <el-table-column prop="status" label="设备状态" width="120"
        :filters="[{ text: '正常', value: '1' }, { text: '保修', value: '2' }, { text: '损坏', value: '3' }]"
        :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.status)" disable-transitions>{{ tagText(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="200">
        <template slot-scope="scope">
          {{ time(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click="viewDetails(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">设备状态操作</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看diaglog -->
    <el-dialog title="设备详细信息" :visible.sync="dialogTableVisible">
      <el-descriptions direction="vertical" :column="2" border>
        <!-- 设备编号、设备名称 、类别 、软件系统 、版本号 、设备供应商 、用途 、所在实验室、 设备状态。 -->
        <el-descriptions-item label="设备编号">{{ simulationEquipment.number }}</el-descriptions-item>
        <el-descriptions-item label="设备名称">{{ simulationEquipment.name }}</el-descriptions-item>
        <el-descriptions-item label="类别">{{ simulationEquipment.type }}</el-descriptions-item>
        <el-descriptions-item label="软件系统">{{ simulationEquipment.softwareSystem }}</el-descriptions-item>
        <el-descriptions-item label="版本号">{{ simulationEquipment.versionNumber }}</el-descriptions-item>
        <el-descriptions-item label="设备供应商">{{ simulationEquipment.supplier }}</el-descriptions-item>
        <el-descriptions-item label="用途">{{ simulationEquipment.purpose }}</el-descriptions-item>
        <el-descriptions-item label="所在实验室">{{ simulationEquipment.laboratoryId }}</el-descriptions-item>
        <el-descriptions-item label="设备状态">
          <el-tag :type="tagType(simulationEquipment.status)" disable-transitions>{{ tagText(simulationEquipment.status)
          }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import {
  simulationEquipmentUrl
} from "../../api/api.js";
import { dateFormat } from "../../utils/common.js";
import { nullFormat } from "../../utils/common.js";
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    filterTag(value, row) {
      return row.status === value;
    },
    tagType(status) {
      //状态为正常设置标签为primary
      if (status === 1) {
        return 'primary';
      } else if (status === 2) {
        //状态为保修
        return 'success';
      } else if (status === 3) {
        return 'danger';
      }
    },
    tagText(status) {
      if (status === 1) {
        return '正常';
      } else if (status === 2) {
        //状态为保修
        return '保修';
      } else if (status === 3) {
        return '损坏';
      }
    },
    time(row) {
      if (row.updatTimes == undefined || row.updatTimes == null || row.updatTimes === '') {
        return row.createTime;
      } else {
        return row.updateTime;
      }
    },
    handleSizeChange(val) {
      //改变每页显示数量重新请求数据，重置当前页为第一页
      this.pageSize = val;
      this.currPage = 1;
      this.getData()
    },
    handleCurrentChange(val) {
      //点击改变当前页
      this.currPage = val;
      this.getData()
    },
    listSimulationEquipmentList() {
      this.request.get(simulationEquipmentUrl.qureySimulationEquipmentList).then(res => {
        res.data.data.forEach((item, index) => {
          item.createTime = dateFormat(item.createTime);
          item.updateTime = dateFormat(item.updateTime);
          item.softwareSystem = nullFormat(item.softwareSystem);
          item.versionNumber = nullFormat(item.versionNumber);
          item.laboratoryId = nullFormat(item.laboratoryId);
        })
        this.tableData = res.data.data;
      })
    },
    getRowData(row) {
      this.simulationEquipment.number = row.number;
      this.simulationEquipment.name = row.name;
      this.simulationEquipment.type = row.type;
      this.simulationEquipment.softwareSystem = row.softwareSystem;
      this.simulationEquipment.versionNumber = row.versionNumber;
      this.simulationEquipment.supplier = row.supplier;
      this.simulationEquipment.purpose = row.purpose;
      this.simulationEquipment.laboratoryId = row.laboratoryId;
      this.simulationEquipment.status = row.status;
    },
    viewDetails(row) {
      this.dialogTableVisible = true;
      this.getRowData(row);
    }
  },

  data() {
    return {
      total: 0,
      currPage: 1,  //默认第一页
      pageSize: 10, //默认展示10条数据
      perpage: [
        { value: 10, label: "10" },
        { value: 20, label: "20" },
      ],
      tableData: [],
      dialogTableVisible: false,
      // 设备编号、设备名称 、类别 、软件系统 、版本号 、设备供应商 、用途 、所在实验室、 设备状态。
      simulationEquipment: {
        simulationEquipmentId: '',
        name: '',
        number: '',
        type: null,
        softwareSystem: '',
        versionNumber: null,
        supplier: "2",
        status: 1,
        purpose: "23",
        laboratoryId: null,
        thumbnail: null,
        createTime: "2023-07-21T06:27:21.000+00:00",
        updateTime: null
      }
    }
  },
  mounted() {
    this.listSimulationEquipmentList();
  }
}
</script>
