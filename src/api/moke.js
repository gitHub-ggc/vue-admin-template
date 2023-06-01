import { getAction,postAction } from "./api";

export const userinfo = (params) => { return getAction('/userinfo',params)}