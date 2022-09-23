import { post } from "../utils/service/BaseApi";
import ENDPOINT from "./endPoint";
import { setCookie } from "../libs/cookie";

/**
 * api login with email|password
 * @param data
 * @returns {Promise<void>}
 * @constructor
 */
export const ApiLogin = async (data) => {
    const res = await post(ENDPOINT.URL_LOGIN_BY_EMAIL, data)
    console.log(data);
    if (res.data.code === 1 ) {
        setCookie("user_token", res.data.user.user_token, 365);
        window.localStorage.setItem("usemsg", JSON.stringify(res.data))
    } else {
        window.localStorage.setItem("usemsg",JSON.stringify(res.data))
    }
}

/**
 * api register with email|password
 * @param data
 * @returns {Promise<void>}
 * @constructor
 */
export const ApiRegister = async (data) => {
    const res = await post(ENDPOINT.URL_REGISTER, data)
    if (res.data.code === 1) {
        setCookie("user_token", res.data.user.user_token, 365);
        window.localStorage.setItem("usemsg",JSON.stringify(res.data))
    }
}

/**
 * api login with socials
 * @param provider
 * @param user
 * @returns {Promise<void>}
 * @constructor
 */
export const ApiLoginSocial = async (provider, user) => {
    const res = await post(ENDPOINT.URL_LOGIN_BY_FB_GOOGLE, {
        email: user.email,
        name: user.displayName,
        provider: provider,
        provider_id: user.providerData[0].uid,
        lang: "vn",
        trial_course: 1
    })

    if (res.data.code === 1) {
        console.log("dang nhap thanh cong");
        setCookie("user_token", res.data.user.user_token, 365);
        window.localStorage.setItem("usemsg",JSON.stringify(res.data))
    }
}