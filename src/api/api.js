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
}

export {
    commonUrl,
    userUrl,
    simulationEquipmentUrl
}
