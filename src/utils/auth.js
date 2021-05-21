import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 存数据
export function setLocal (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 取数据
export function getLocal (key) {
  return JSON.parse(window.localStorage.getItem(key))
}
// 删数据
export function delLocal (key) {
  window.localStorage.removeItem(key)
}
// 全部清空
export function clearLocal () {
  window.localStorage.clear()
}

