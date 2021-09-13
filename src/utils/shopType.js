/**
 * 判定用户的类别,进行对应的权限名称
 */
let route = {
  customer: [{
    name: 'Product',
  },
  {
    name: 'ProductList',
  },
  {
    name: 'ProductAdd',
  },{
    name: 'ProductEdit',
  },],
  admin: [{
    name: 'Product',
  },
  {
    name: 'ProductList',
  },
  {
    name: 'ProductAdd',
  },
  {
    name: 'Category',
  },{
    name: 'ProductEdit',
  },],
}

// 导出一个函数用于判定有哪些路由需要添加
export default function (role, routes) {

  //根据角色得到允许的路由的名字
  const allowRoute = route[role].map(item => item.name);

  //得到允许的路由
  const resultRoutes = routes.filter(r => {

    const obj = r;

    if (allowRoute.indexOf(obj.name) !== -1) {
      //过滤掉路由中子路由
      let children = obj.children;

      obj.children = children.filter(item => allowRoute.indexOf(item.name) !== -1)

      return true;
    }
    return false;
  })
  return resultRoutes;

}