// 全局文件
export default {
  logo: 'UNI-ADMIN',
  navBar: {
    // 默认选择第0个
    active: '0',
    list: [
      {
        name: '首页',
        subActive: '0',
        submenu: [
          {
            icon: 'el-icon-s-platform',
            name: '后台首页',
            pathname: 'index'
          },
          {
            icon: 'el-icon-s-order',
            name: '相册管理'
          },
          {
            icon: 'el-icon-s-order',
            name: '商品列表',
            pathname: 'shop_goods_list'
          },
          {
            icon: 'el-icon-s-order',
            name: '商品规格'
          }
        ]
      },
      {
        name: '商品',
        subActive: '0',
        submenu: [{
          icon: 'el-icon-s-order',
          name: '商品列表',
          pathname: 'shop_goods_list'
        }]
      },
      { name: '订单' },
      { name: '会员' },
      { name: '设置' },
    ]
  }
}
