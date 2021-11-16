let routes = [
  {
    path: '/',
    name: 'layout', // 主布局
    redirect: { name: 'index' },
    // component: () => import('../../views/layout.vue'),
    component: 'layout',
    children: [
      {
        // path: '/index',
        // name: 'index',
        // component: () => import('../../views/index/index.vue')
        meta: {title: '后台首页'},
        component: 'index/index'
      },
      {
        // name: 'shop_goods_list',
        // path: '/shop/goods/list',
        meta: {title: '商品列表'},
        component: 'shop/goods/list'
      }
    ]
  },
  {
    // path: '/login',
    // name: 'login',
    // component: () => import('../../views/login/index.vue')
    meta: {title: '登录页'},
    component: 'login/index'
  },
  {
    path: '*',
    redirect: { name: 'index' }
  }
]
// 获取路由信息方法
let getRoutes = function () {
  // 自动生成路由
  createRoute(routes)
  return routes
}
// 自动生成路由
function createRoute (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return
    // 去除index
    let val = getValue(arr[i].component)
    // 生成name
    arr[i].name = arr[i].name || val.replace(/\//g,'_')
    // 生成path
    arr[i].path = arr[i].name || `/${val}`
    // 自动生成component
    let componentFun = import(`../../views/${arr[i].component}.vue`)
    arr[i].component = () => componentFun
    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children)
    }
  }
}
function getValue (str) {
  // srt = login.index
  // 获取最后一个/的索引
  let index = str.lastIndexOf('/')
  // 获取最后一个/后面的值
  let val = str.substring(index + 1, str.length)
  // 判断是不是index结尾
  if (val === 'index') {
    return str.substring(index, -1)
  }
  return str
}
export default getRoutes()
