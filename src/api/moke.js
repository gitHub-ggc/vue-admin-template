import { getAction,postAction } from "@api/user.js";

export const userinfo = (params) => { return getAction('/userinfo',params)}