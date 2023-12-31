//通用模块接口
let commonUrl = {
    login: "login", //登录
    loadDictionaryData: "/dictionary/loadDictionaryData/"
}

// 用户模块
let userUrl = {
    register: "/user/register",
    accountIsExist: "/user/accountIsExist"
}

let simulationEquipmentUrl = {
    qureySimulationEquipmentList: "/simulationEquipment/loadSimulationEquipmentData", //获取仿真设备列表
    loadDictionaryData: "/dictionary/loadDictionaryData/",
    updateSimulationEquipment: "/simulationEquipment/updateSimulationEquipment",
    deleteSimulationEquipment: "/simulationEquipment/deleteSimulationEquipment",
    addSimulationEquipment: "/simulationEquipment/addSimulationEquipment",
    download: "/simulationEquipment/downloadExcel",
    qurey: "/simulationEquipment/getSimulationEquipment",
    getStatusCounts: "/simulationEquipment/statusCounts",
    getTypeCounts: "/simulationEquipment/typeCounts",
    getSimulationEquipmentCount: "/simulationEquipment/count",
    getSimulationEquipmentByLaboratoryId: "/simulationEquipment/getSEByLaboratoryId"
}

let laboratoryUrl = {
    listLaboratory: "/Laboratory/listLaboratory",
    getNumberOfSEByLabId: "/simulationEquipment/getNumberOfSEByLabId",
    getList: "/Laboratory/getList",
    getLaboratoryCount: "/Laboratory/getLaboratoryCount",
    addLaboratory: "/Laboratory/addLaboratory",
    updateLaboratory: "/Laboratory/updateLaboratory",
    deleteLaboratory: "/Laboratory/deleteLaboratory"
}

export {
    commonUrl,
    userUrl,
    simulationEquipmentUrl,
    laboratoryUrl
}
