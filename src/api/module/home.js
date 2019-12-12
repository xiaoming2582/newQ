import ax from "../axios";

//家长新加入流程

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
    showLoading: false
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


//老师新加入流程

//创建班级
export function createClass(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/schoolClassManagement/createClass.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//创建班级-进入班级
export function getUserAccountDetail(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/accountRoleManagement/getUserAccountDetail.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}


//老师邀请新老师进入班级
export function teacherInvitationNewTeacherToClass(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/schoolClassManagement/teacherInvitationNewTeacherToClass.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//家长邀请新家长关注学生
export function parentInvitationNewParentToStudent(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/parentManagement/parentInvitationNewParentToStudent.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//老师邀请家长加入班级
export function teacherInvitationNewStudentToClass(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/parentManagement/teacherInvitationNewStudentToClass.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//家长管理列表
export function parentList(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/parentManagement/parentList.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}


//第一家长审核流程



//主家长通过审核
export function submitApproved(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/parentManagement/submitApproved.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//主家长不通过审核
export function submitUnapproved(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/parentManagement/submitUnapproved.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//更新家长关系信息
export function updateRelation(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/parentManagement/updateRelation.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}

//移除家长关系信息
export function removeRelation(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/parentManagement/removeRelation.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}


//老师审核学生流程

//查询班级学生列表
export function queryClassStudentList(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/mod-xiaojiao/schoolClassManagement/queryClassStudentList.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}



//老师管理


//查询老师的班级列表
export function queryTeacherClassDetailList(params, config = {
    showLoading: true
}) {
    return ax.post('/qxiao-mp/action/action/mod-xiaojiao/schoolClassManagement/queryTeacherClassDetailList.do', params, config)
        .then(res => res.data)
        .catch(e => console.log(e));
}