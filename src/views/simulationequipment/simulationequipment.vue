<template>
  <div>
    <div>
      <el-form :inline="true" :model="qurey" class="demo-form-inline">
        <el-form-item label="编号">
          <el-input v-model="qurey.inputNumber" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="qurey.inputName" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" style="margin-left: 20px;" @click="submitQurey()">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="showAddFrom()">新增设备</el-button>
          <el-button type="primary" icon="el-icon-download" @click="download()">导出数据</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table" style="padding: 20px;">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="number" label="设备编号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="设备名称">
        </el-table-column>
        <el-table-column prop="type" label="类别">
          <template slot-scope="scope">
            {{ getCodeNameByValue(typeOption, scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="softwareSystem" label="软件系统" width="120">
        </el-table-column>
        <el-table-column prop="versionNumber" label="版本号" width="120">
        </el-table-column>
        <el-table-column label="设备供应商">
          <template slot-scope="scope">
            {{ getCodeNameByValue(supplierOption, scope.row.supplier) }}
          </template>
        </el-table-column>
        <el-table-column prop="purpose" label="用途">
          <template slot-scope="scope">
            {{ getCodeNameByValue(purposeOption, scope.row.purpose) }}
          </template>
        </el-table-column>
        <el-table-column prop="laboratoryId" label="所属实验室">
          <template slot-scope="scope">
            {{ getCodeNameByValue(laboratoryOption, scope.row.laboratoryId) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="设备状态"
          :filters="[{ text: '正常', value: '1' }, { text: '保修', value: '2' }, { text: '损坏', value: '3' }]"
          :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="tagType(scope.row.status)" disable-transitions>{{
              getCodeNameByValue(statusOption, scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="200">
          <template slot-scope="scope">
            {{ time(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
                <el-button @click="viewDetails(scope.row)" type="primary" size="small" icon="el-icon-info"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                <el-button @click="showUpdateFrom(scope.row)" type="primary" size="small"
                  icon="el-icon-edit-outline"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="设备状态操作" placement="bottom">
                <el-button @click="updateStatu(scope.row)" type="primary" size="small" icon="el-icon-setting"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                <el-button @click="showDelete(scope.row)" type="primary" size="small" icon="el-icon-delete"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--控制分页部分-->
    <div class="pagaination-tool" style="padding:15px; ">
      <!--elementUI的分页控件-->
      <el-pagination background :current-page.sync="currPage" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 查看diaglog -->
    <el-dialog title="设备详细信息" :visible.sync="dialogTableVisible" @closed='closeDialog'>
      <el-descriptions direction="vertical" :column="2" border>
        <!-- 设备编号、设备名称 、类别 、软件系统 、版本号 、设备供应商 、用途 、所在实验室、 设备状态。 -->
        <el-descriptions-item label="设备编号">{{ simulationEquipment.number }}</el-descriptions-item>
        <el-descriptions-item label="设备名称">{{ simulationEquipment.name }}</el-descriptions-item>
        <el-descriptions-item label="类别">{{ getCodeNameByValue(typeOption,
          simulationEquipment.type) }}</el-descriptions-item>
        <el-descriptions-item label="软件系统">{{ simulationEquipment.softwareSystem }}</el-descriptions-item>
        <el-descriptions-item label="版本号">{{ simulationEquipment.versionNumber }}</el-descriptions-item>
        <el-descriptions-item label="设备供应商">{{ getCodeNameByValue(supplierOption, simulationEquipment.supplier)
        }}</el-descriptions-item>
        <el-descriptions-item label="用途">{{ getCodeNameByValue(purposeOption, simulationEquipment.purpose)
        }}</el-descriptions-item>
        <el-descriptions-item label="所在实验室">{{ simulationEquipment.laboratoryId }}</el-descriptions-item>
        <el-descriptions-item label="设备状态">
          <el-tag :type="tagType(simulationEquipment.status)" disable-transitions>{{ getCodeNameByValue(statusOption,
            simulationEquipment.status) }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <!-- 编辑和新增窗口 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" center @closed='closeDialog'>
      <el-form ref="simulationEquipment" :model="simulationEquipment" :rules="rules" :label-position="labelPosition"
        label-width="150px">
        <!-- 设备编码、缩略图、设备名称 、类别 、软件系统 、版本号 、设备供应商 、用途 、所在实验室、 设备状态； -->
        <el-form-item label="设备编号" prop="number">
          <el-input v-model="simulationEquipment.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="simulationEquipment.name"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <el-select v-model="simulationEquipment.type" placeholder="请选择">
            <el-option v-for="item in typeOption" :key="item.codeValue" :label="item.codeName" :value="item.codeValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="软件系统和版本号">
          <el-row>
            <el-col :span="11">
              软件系统<el-input v-model="simulationEquipment.softwareSystem"></el-input>
            </el-col>
            <el-col :span="11" style="float: right;">
              版本号
              <el-input v-model="simulationEquipment.versionNumber"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="设备供应商" prop="supplier">
          <el-select v-model="simulationEquipment.supplier" placeholder="请选择">
            <el-option v-for="item in supplierOption" :key="item.codeValue" :label="item.codeName"
              :value="item.codeValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用途" prop="purpose">
          <el-select v-model="simulationEquipment.purpose" placeholder="请选择">
            <el-option v-for="item in purposeOption" :key="item.codeValue" :label="item.codeName" :value="item.codeValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属实验室" prop="laboratoryId">
          <el-select v-model="simulationEquipment.laboratoryId" placeholder="请选择">
            <el-option v-for="item in laboratoryOption" :key="item.codeValue" :label="item.codeName"
              :value="item.codeValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'add'" label="设备状态" prop="status">
          <el-select v-model="simulationEquipment.status" placeholder="请选择">
            <el-option v-for="item in statusOption" :key="item.codeValue" :label="item.codeName" :value="item.codeValue">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="dialogStatus == 'add'" @click="submitAddForm('simulationEquipment')" style="
          margin-right: 30px;">添加设备</el-button>
        <el-button type="primary" v-if="dialogStatus == 'update'" @click="submitEditForm('simulationEquipment')" style="
          margin-right: 30px;">修改设备</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑仿真设备状态" :visible.sync="dialogStatusVisible" center width="600px" @close='closeDialog'>
      <h3>设备名称:{{ simulationEquipment.name }}</h3>
      <br>
      <label>设备状态：</label>
      <el-select v-model="simulationEquipment.status" placeholder="请选择">
        <el-option v-for="item in statusOption" :key="item.codeValue" :label="item.codeName" :value="item.codeValue">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitStatu(simulationEquipment)" style="margin-right: 30px;">确 定</el-button>
        <el-button @click="dialogStatusVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogNoticeVisible" width="30%" @close='closeDialog'>
      <span>是否要删除改仿真设备</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteEquipment(simulationEquipment)">确 定</el-button>
        <el-button @click="dialogNoticeVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style></style>
<script>
import {
  simulationEquipmentUrl, laboratoryUrl
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
      if (status === '1') {
        return 'primary';
      } else if (status === '2') {
        //状态为保修
        return 'success';
      } else if (status === '3') {
        return 'danger';
      }
    },
    time(row) {
      if (row.updateTime == undefined || row.updateTime == null || row.updateTime === '') {
        return dateFormat(row.createTime);

      } else {
        return dateFormat(row.updateTime);
      }
    },
    handleSizeChange(val) {
      //改变每页显示数量重新请求数据，重置当前页为第一页
      this.pageSize = val;
      this.currPage = 1;
      this.listSimulationEquipmentList();
    },
    handleCurrentChange(val) {
      //点击改变当前页
      this.currPage = val;
      this.listSimulationEquipmentList();
    },
    listSimulationEquipmentList() {
      this.request.get(simulationEquipmentUrl.qureySimulationEquipmentList + "?current=" + this.currPage + "&size=" + this.pageSize).then(res => {
        res.data.data.records.forEach((item, index) => {
          item.createTime = dateFormat(item.createTime);
          item.updateTime = dateFormat(item.updateTime);
          item.softwareSystem = nullFormat(item.softwareSystem);
          item.versionNumber = nullFormat(item.versionNumber);
          //item.laboratoryId = nullFormat(item.laboratoryId);
        })
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
      })
      // console.log(this.mainTableKey);
      // this.mainTableKey = Math.random();
      // console.log(this.mainTableKey);
    },
    getRowData(row) {
      this.simulationEquipment.simulationEquipmentId = row.simulationEquipmentId;
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
    },
    showAddFrom() {
      this.dialogStatus = 'add';
      this.dialogFormVisible = true;
    },
    showUpdateFrom(row) {
      this.dialogStatus = 'update';
      this.getRowData(row);
      this.dialogFormVisible = true;
    },
    updateStatu(row) {
      this.dialogStatusVisible = true;
      this.getRowData(row);
    },
    showDelete(row) {
      this.dialogNoticeVisible = true;
      this.getRowData(row);
    },
    loadType() {
      this.request.get(simulationEquipmentUrl.loadDictionaryData + "simeqtype").then(res => {
        if (res.code == 200) {
          this.typeOption = res.data.data;
        }
      })
    },
    loadSupplier() {
      this.request.get(simulationEquipmentUrl.loadDictionaryData + "supplier").then(res => {
        if (res.code == 200) {
          this.supplierOption = res.data.data;
        }
      })
    },
    loadPurpose() {
      this.request.get(simulationEquipmentUrl.loadDictionaryData + "purpose").then(res => {
        if (res.code == 200) {
          this.purposeOption = res.data.data;
        }
      })
    },
    loadStatus() {
      this.request.get(simulationEquipmentUrl.loadDictionaryData + "status").then(res => {
        if (res.code == 200) {
          this.statusOption = res.data.data;
        }
      })
    },
    loadLaboratoryOption() {
      // Make the GET request using this.request.get() and handle the response
      this.request.get(laboratoryUrl.getList).then(res => {
        if (res.code === 200) {
          // Create a new array to store the modified data
          const modifiedOptions = res.data.data.map(item => {
            return {
              codeValue: item.laboratoryId,
              codeName: item.laboratoryName
            };
          });
          // Assign the modified data to this.laboratoryOption
          this.laboratoryOption = modifiedOptions;
          console.log(this.laboratoryOption[0]);
        }
      });
    },
    getCodeNameByValue(typeOption, targetCodeValue) {
      for (let i = 0; i < typeOption.length; i++) {
        if (typeOption[i].codeValue == targetCodeValue) {
          return typeOption[i].codeName;
        }
      }
      return null;
    },
    submitEditForm(simulationEquipment) {
      this.$refs[simulationEquipment].validate((valid) => {
        if (valid) {
          let params = this.simulationEquipment;
          this.request.post(simulationEquipmentUrl.updateSimulationEquipment, params).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            }
          })
          this.listSimulationEquipmentList();
          this.listSimulationEquipmentList();
          this.dialogFormVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    submitStatu(simulationEquipment) {
      this.request.post(simulationEquipmentUrl.updateSimulationEquipment, simulationEquipment).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '修改状态成功',
            type: 'success'
          });
        }
      })
      this.dialogStatusVisible = false;
      this.listSimulationEquipmentList();
      this.listSimulationEquipmentList();
    },
    deleteEquipment(simulationEquipment) {
      this.request.post(simulationEquipmentUrl.deleteSimulationEquipment + "?simulationEquipmentId=" + simulationEquipment.simulationEquipmentId).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }
      })
      this.dialogNoticeVisible = false;
      this.listSimulationEquipmentList();
      this.listSimulationEquipmentList();
    },
    submitAddForm(simulationEquipment) {
      this.$refs[simulationEquipment].validate((valid) => {
        if (valid) {
          let params = this.simulationEquipment;
          this.request.post(simulationEquipmentUrl.addSimulationEquipment, params).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '新增仿真设备成功',
                type: 'success'
              });
            }
          })
          this.dialogFormVisible = false;
          this.listSimulationEquipmentList();
          this.listSimulationEquipmentList();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    clearSimulationData() {
      this.simulationEquipment.simulationEquipmentId = '';
      this.simulationEquipment.number = '';
      this.simulationEquipment.name = '';
      this.simulationEquipment.type = '';
      this.simulationEquipment.softwareSystem = '';
      this.simulationEquipment.versionNumber = '';
      this.simulationEquipment.supplier = '';
      this.simulationEquipment.purpose = '';
      this.simulationEquipment.laboratoryId = '';
      this.simulationEquipment.status = '';
      this.simulationEquipment.createTime = '';
      this.simulationEquipment.updateTime = '';
    },
    //关闭对话框清空数据
    closeDialog() {
      this.clearSimulationData();
    },
    download() {
      window.location = 'http://localhost:8088/simulationEquipment/downloadExcel'
    },
    //查询
    submitQurey() {
      if ((typeof this.qurey.inputNumber == 'string' && this.qurey.inputNumber.length > 0) || (typeof this.qurey.inputName == 'string' && this.qurey.inputName.length > 0)) {
        let url = '';
        if (typeof this.qurey.inputNumber == 'string' && this.qurey.inputNumber.length > 0) {
          url = '?current=' + this.currPage + "&size=" + this.pageSize + '&number=' + this.qurey.inputNumber;
        } else {
          url = '?current=' + this.currPage + "&size=" + this.pageSize + '&name=' + this.qurey.inputName;
        }
        this.request.get(simulationEquipmentUrl.qurey + url).then(res => {
          if (res.code == 200) {
            if (res.data.data.total != 0) {
              res.data.data.records.forEach((item, index) => {
                item.createTime = dateFormat(item.createTime);
                item.updateTime = dateFormat(item.updateTime);
                item.softwareSystem = nullFormat(item.softwareSystem);
                item.versionNumber = nullFormat(item.versionNumber);
                //item.laboratoryId = nullFormat(item.laboratoryId);
              })
              this.tableData = res.data.data.records;
              console.log(this.tableData.records);
              this.total = res.data.data.total;
              this.inputName = '';
              this.inputNumber = '';
            } else {
              this.$message({
                message: '没有查询到数据',
                type: 'warning'
              });
            }
          }
        })
      } else {
        this.$message({
          message: '请输入查询条件',
          type: 'warning'
        });
      }
    }
  },

  data() {
    return {
      //定义变量控制表格刷新，数据更新后mainTableKey随机。
      mainTableKey: 1,
      total: 0,
      currPage: 1,  //默认第一页
      pageSize: 10,
      formLabelWidth: '150px',
      labelPosition: 'left',
      //默认展示10条数据
      perpage: [
        { value: 10, label: "10" },
        { value: 20, label: "20" },
      ],
      dialogStatus: 'add',
      textMap: {
        add: '新增仿真设备',
        update: '更新仿真设备信息'
      },
      tableData: [],
      //查看窗口
      dialogTableVisible: false,
      //修改窗口
      dialogFormVisible: false,
      //状态修改窗口
      dialogStatusVisible: false,
      //删除提示窗口
      dialogNoticeVisible: false,
      // 设备编号、设备名称 、类别 、软件系统 、版本号 、设备供应商 、用途 、所在实验室、 设备状态。
      simulationEquipment: {
        simulationEquipmentId: '',
        name: '',
        number: '',
        type: '',
        softwareSystem: '',
        versionNumber: null,
        supplier: "",
        status: null,
        purpose: "",
        laboratoryId: null,
        thumbnail: null,
        createTime: "",
        updateTime: "",
      },
      qurey: {
        inputNumber: '',
        inputName: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入设备名称",
            trigger: ['blur', 'change'],
            type: '',
          },
          {
            min: 3,
            max: 12,
            message: "长度3-12位之间",
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: "请输入设备编号",
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: "长度3-12位之间",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change"
          }
        ],
        purpose: [
          {
            required: true,
            message: "请选择用途",
            trigger: "change"
          }
        ],
        supplier: [
          {
            required: true,
            message: "请选择供应商",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择设备状态",
            trigger: "change"
          }
        ],
        laboratoryId: [{
          required: true,
          message: "请选择所属实验室",
          trigger: "change"
        }]
      },
      typeOption: [{
        codeValue: "",
        codeName: "",
      }],
      supplierOption: [{
        codeValue: "",
        codeName: "",
      }],
      purposeOption: [{
        codeValue: "",
        codeName: "",
      }],
      statusOption: [{
        codeValue: "",
        codeName: "",
      }],
      laboratoryOption: [{
        codeValue: null,
        codeName: "",
      }],
      value: ''
    }
  },
  mounted() {
    this.listSimulationEquipmentList();
    this.loadType();
    this.loadSupplier();
    this.loadPurpose();
    this.loadStatus();
    this.loadLaboratoryOption();
  }
}
</script>
