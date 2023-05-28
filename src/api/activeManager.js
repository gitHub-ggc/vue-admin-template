import { getAction, postAction,putAction } from "./api";

//活动查询
const activeQuery = (data) => postAction('/dyb/activity/pageQuery',data);
//活动新增
const activeAdd = (data) => postAction('/dyb/activity/add',data);
//活动编辑
const activeEdit = (data) => postAction('/dyb/activity/edit',data);
//活动删除
const activeDel = (data) => postAction('/dyb/activity/delete',data);
//问卷查询
const questionQuery = (data) => postAction('/dyb/question/pageQuery',data);
//问卷新增
const questionAdd = (data) => postAction('/dyb/question/add',data);
//问卷编辑
const questionEdit = (data) => postAction('/dyb/question/edit',data);
//问卷删除
const questionDel = (data) => postAction('/dyb/question/delete',data);
//题目删除
const questionTitleDel = (data) => postAction('/dyb/question/deleteBytitle',data);

export {
    activeQuery, 
    activeAdd,
    activeEdit,
    activeDel,
    questionQuery,
    questionAdd,
    questionEdit,
    questionDel,
    questionTitleDel,
}