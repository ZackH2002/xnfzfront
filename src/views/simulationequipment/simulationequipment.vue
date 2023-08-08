<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed prop="number" label="设备编号" width="150">
    </el-table-column>
    <el-table-column prop="name" label="设备名称" width="150">
    </el-table-column>
    <el-table-column prop="type" label="类别" width="120">
    </el-table-column>
    <el-table-column prop="software_system" label="软件系统" width="120">
      <!-- 为空显示为-- -->
      <template slot-scope="scope">{{ scope.row.software_system ? scope.row.software_system : '--' }}</template>
    </el-table-column>
    <el-table-column prop="version_number" label="版本号" width="120">
      <template slot-scope="scope">{{ scope.row.version_number ? scope.row.version_number : '--' }}</template>
    </el-table-column>
    <el-table-column prop="supplier" label="设备供应商" width="120">
      <template slot-scope="scope">{{ scope.row.supplier ? scope.row.supplier : '--' }}</template>
    </el-table-column>
    <el-table-column prop="purpose" label="用途" width="120">
      <template slot-scope="scope">{{ scope.row.purpose ? scope.row.purpose : '--' }}</template>
    </el-table-column>
    <el-table-column prop="laboratory" label="所属实验室" width="120">
      <template slot-scope="scope">{{ scope.row.laboratory ? scope.row.laboratory : '--' }}</template>
    </el-table-column>
    <el-table-column prop="status" label="设备状态" width="120"
      :filters="[{ text: '正常', value: '1' }, { text: '保修', value: '2' }, { text: '损坏', value: '3' }]"
      :filter-method="filterTag" filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag :type="tagType(scope.row)" disable-transitions>{{ tagText(scope.row) }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="更新时间" width="200">
      <template slot-scope="scope">
        {{ time(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="250">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">设备状态操作</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    filterTag(value, row) {
      return row.status === value;
    },
    tagType(row) {
      //状态为正常设置标签为primary
      if (row.status === '1') {
        return 'primary';
      } else if (row.status === '2') {
        //状态为保修
        return 'success';
      } else if (row.status === '3') {
        return 'danger';
      }
    },
    tagText(row) {
      if (row.status === '1') {
        return '正常';
      } else if (row.status === '2') {
        //状态为保修
        return '保修';
      } else if (row.status === '3') {
        return '损坏';
      }
    },
    time(row) {
      if (row.update_time == '') {
        return row.create_time;
      } else {
        return row.update_time;
      }
    }
  },

  data() {
    return {
      tableData: [{
        number: 'S0001',
        name: '电脑',
        type: '1',
        software_system: 'Android',
        version_number: '1.0.0',
        supplier: 'HP',
        purpose: '教学',
        laboratory: 'testlab',
        status: '1',
        create_time: '2023-07-21 14:27:21',
        update_time: '2023-07-21 14:27:21',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        number: 'S0002',
        name: '显微镜',
        type: '1',
        software_system: '',
        version_number: '',
        supplier: 'Huawei',
        purpose: '实验',
        status: '2',
        create_time: '2023-07-21 14:27:21',
        update_time: '2023-07-21 14:27:21',
        laboratory: 'testlab',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        number: 'S0003',
        name: '主机',
        type: '1',
        software_system: 'Android',
        version_number: '1.0.0',
        supplier: 'Apple',
        purpose: 'lab',
        status: '3',
        create_time: '2023-07-23 14:27:21',
        update_time: '',
        laboratory: 'testlab',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        number: 'S0004',
        name: '平板',
        type: '1',
        software_system: 'Android',
        version_number: '1.0.0',
        supplier: 'HI',
        purpose: 'test',
        status: '1',
        create_time: '2023-07-22 14:27:21',
        update_time: '',
        laboratory: 'testlab',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  }
}
</script>
