export const isEmail = (s) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
};

export const isMobile = (s) => {
  return /^1[0-9]{10}$/.test(s);
};

export const isURL = (s) => {
  return /^http[s]?:\/\/.*/.test(s);
};

export const isString = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "String";
};

export const isNumber = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Number";
};

export const isBoolean = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Boolean";
};

export const isFunction = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Function";
};

export const isNull = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Null";
};

export const isUndefined = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Undefined";
};

export const isObj = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Object";
};

export const isArray = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Array";
};

export const isDate = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Date";
};

export const isRegExp = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "RegExp";
};

export const isError = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Error";
};

export const isSymbol = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Symbol";
};

export const isPromise = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Promise";
};

export const isSet = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Set";
};

export const isWeiXin = () => {
  return ua.match(/microMessenger/i) == "micromessenger";
};

export const isDeviceMobile = () => {
  return /android|webos|iphone|ipod|balckberry/i.test(ua);
};

export const isQQBrowser = () => {
  return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i);
};

export const isIos = () => {
  var u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    //????????????
    return false;
  } else if (u.indexOf("iPhone") > -1) {
    //????????????
    return true;
  } else if (u.indexOf("iPad") > -1) {
    //iPad
    return false;
  } else if (u.indexOf("Windows Phone") > -1) {
    //winphone??????
    return false;
  } else {
    return false;
  }
};

export const isPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

export const download = (url) => {
  var isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
  var isSafari = navigator.userAgent.toLowerCase().indexOf("safari") > -1;
  if (isChrome || isSafari) {
    var link = document.createElement("a");
    link.href = url;
    if (link.download !== undefined) {
      var fileName = url.substring(url.lastIndexOf("/") + 1, url.length);
      link.download = fileName;
    }
    if (document.createEvent) {
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  if (url.indexOf("?") === -1) {
    url += "?download";
  }
  window.open(url, "_self");
  return true;
};

export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

export const copyTextToClipboard = (value) => {
  var textArea = document.createElement("textarea");
  textArea.style.background = "transparent";
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    var successful = document.execCommand("copy");
  } catch (err) {
    console.log("Oops, unable to copy");
  }
  document.body.removeChild(textArea);
};

export const checkStr = (str, type) => {
  switch (type) {
    case "phone": //????????????
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
    case "tel": //??????
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case "card": //?????????
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case "pwd": //?????????????????????????????????6~18????????????????????????????????????????????????
      return /^[a-zA-Z]\w{5,17}$/.test(str);
    case "postal": //????????????
      return /[1-9]\d{5}(?!\d)/.test(str);
    case "QQ": //QQ???
      return /^[1-9][0-9]{4,9}$/.test(str);
    case "email": //??????
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case "money": //??????(?????????2???)
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    case "URL": //??????
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
        str
      );
    case "IP": //IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(
        str
      );
    case "date": //????????????
      return (
        /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
          str
        ) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
      );
    case "number": //??????
      return /^[0-9]$/.test(str);
    case "english": //??????
      return /^[a-zA-Z]+$/.test(str);
    case "chinese": //??????
      return /^[\\u4E00-\\u9FA5]+$/.test(str);
    case "lower": //??????
      return /^[a-z]+$/.test(str);
    case "upper": //??????
      return /^[A-Z]+$/.test(str);
    case "HTML": //HTML??????
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    default:
      return true;
  }
};

export const isCardID = (sId) => {
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
    console.log("??????????????????????????????????????????");
    return false;
  }
  //???????????????
  var aCity = {
    11: "??????",
    12: "??????",
    13: "??????",
    14: "??????",
    15: "?????????",
    21: "??????",
    22: "??????",
    23: "?????????",
    31: "??????",
    32: "??????",
    33: "??????",
    34: "??????",
    35: "??????",
    36: "??????",
    37: "??????",
    41: "??????",
    42: "??????",
    43: "??????",
    44: "??????",
    45: "??????",
    46: "??????",
    50: "??????",
    51: "??????",
    52: "??????",
    53: "??????",
    54: "??????",
    61: "??????",
    62: "??????",
    63: "??????",
    64: "??????",
    65: "??????",
    71: "??????",
    81: "??????",
    82: "??????",
    91: "??????",
  };
  if (!aCity[parseInt(sId.substr(0, 2))]) {
    console.log("???????????????????????????");
    return false;
  }

  // ??????????????????
  var sBirthday = (
      sId.substr(6, 4) +
      "-" +
      Number(sId.substr(10, 2)) +
      "-" +
      Number(sId.substr(12, 2))
    ).replace(/-/g, "/"),
    d = new Date(sBirthday);
  if (
    sBirthday !=
    d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
  ) {
    console.log("?????????????????????????????????");
    return false;
  }

  // ?????????????????????
  var sum = 0,
    weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
    codes = "10X98765432";
  for (var i = 0; i < sId.length - 1; i++) {
    sum += sId[i] * weights[i];
  }
  var last = codes[sum % 11]; //??????????????????????????????????????????
  if (sId[sId.length - 1] != last) {
    console.log("??????????????????????????????");
    return false;
  }

  return true;
};

export const random = (min, max) => {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  } else {
    return null;
  }
};

export const checkPwd = (str) => {
  var Lv = 0;
  if (str.length < 6) {
    return Lv;
  }
  if (/[0-9]/.test(str)) {
    Lv++;
  }
  if (/[a-z]/.test(str)) {
    Lv++;
  }
  if (/[A-Z]/.test(str)) {
    Lv++;
  }
  if (/[\.|-|_]/.test(str)) {
    Lv++;
  }
  return Lv;
};

export const isObjectEqual = (a, b) => {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
};
