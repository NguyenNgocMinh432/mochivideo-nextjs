import axios from "axios";

/**
 * create axios
 * @type {AxiosInstance}
 */
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        PrivateKey: "M0ch1M0ch1_En_$ecret_k3y",
        DeviceType: 4,
        AppVersion: "1.0"
    },
    timeout: 5000,
});

/**
 * method post
 * @param url
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const post = async (url, data) => {
    return await instance.post(url, data);
}

/**
 * method ger
 * @param url
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const get = async (url, data) => {
    const searchParams = new URLSearchParams(data);
    return await instance.get(`${url}?${searchParams}`)
}