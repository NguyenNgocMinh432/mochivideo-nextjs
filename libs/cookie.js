export const setCookie = (cookieName, cookieValue, day) => {
    document.cookie = cookieName + "=; Max-Age=0";
    const valuedCookie = cookieName + "=" + cookieValue;
    const date = new Date();
    date.setTime(+date + day * 86400000);
    document.cookie = valuedCookie + ";expires=" + date.toGMTString() + ";path=/";
};

export const getCookie = (cookieName) => {
    const cookieNameArray = document.cookie.split(cookieName + "=");
    if (cookieNameArray.length === 2) {
      return cookieNameArray[1].split(";")[0];
    } else {
      return;
    }
};

export const delete_cookie = (name) => {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
