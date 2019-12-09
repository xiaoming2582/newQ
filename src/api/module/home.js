import ax from "../axios";

//查找班级-家长是否有小孩
export function queryStudentExist(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/parentManagement/queryStudentExist.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//查找班级-新增学生
export function createStudent(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/studentManagement/createStudent.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//查找班级-搜索学校
export function querySchoolList(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/schoolManagement/querySchoolList.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//查找班级-搜索学校-搜索班级
export function querySchoolClassList(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/schoolManagement/querySchoolClassList.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}
//查找班级-搜索学校-搜索班级-加入班级
export function parentJoinStudentForClass(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/schoolClassManagement/parentJoinStudentForClass.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//查找班级-搜索学校-搜索班级-同名列表
export function querySameNameStudentsInClass(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/studentManagement/querySameNameStudentsInClass.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//查找班级-搜索学校-搜索班级-同名列表-确认关联
export function submitAuditJoinClassToMainParent(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/parentManagement/submitAuditJoinClassToMainParent.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}
