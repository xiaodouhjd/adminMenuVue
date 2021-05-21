/** *
 * 获取菜单
 */
export function getAsyncRouter() {
    return request({
      url: '/parameter/Menu',
      method: 'get'
    })
  }