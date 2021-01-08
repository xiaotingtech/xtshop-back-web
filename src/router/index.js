import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/product',
    component: Layout,
    redirect: '/product/productlist',
    name: 'product',
    meta: {title: '商品', icon: 'product'},
      children: [{
        path: 'productlist',
        name: 'productlist',
        component: () => import('@/views/product/index'),
        meta: {title: '商品列表', icon: 'product-list'}
      },
      {
        path: 'productadd',
        name: 'productadd',
        component: () => import('@/views/product/add'),
        meta: {title: '添加商品', icon: 'product-add'}
      },
      {
        path: 'productedit',
        name: 'productedit',
        component: () => import('@/views/product/update'),
        meta: {title: '修改商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'productattr',
        name: 'productattr',
        component: () => import('@/views/product/productAttr/index'),
        meta: {title: '商品类型', icon: 'product-attr'}
      },
      {
          path: 'productattradd',
          name: 'productattradd',
          component: () => import('@/views/product/productAttr/add'),
          meta: {title: '商品类型添加', icon: 'product-attr'}
      },
      {
          path: 'productattredit',
          name: 'productattredit',
          component: () => import('@/views/product/productAttr/edit'),
          meta: {title: '商品类型修改', icon: 'product-attr'}
      },
      {
        path: 'productskulist',
        name: 'productskulist',
        component: () => import('@/views/product/productAttr/productSkuList'),
        meta: {title: '商品属性列表'},
        hidden: true
      },
      {
          path: 'productskuvalue',
          name: 'productskuvalue',
          component: () => import('@/views/product/productAttr/productSkuValueList'),
          meta: {title: '属性值列表'},
          hidden: true
      },
      {
          path: 'productcate',
          name: 'productcate',
          component: () => import('@/views/productcate/index'),
          meta: {title: '商品分类', icon: 'product-cate'}
      },
      {
          path: 'addproductcate',
          name: 'addproductcate',
          component: () => import('@/views/productcate/add'),
          meta: {title: '添加商品分类'},
          hidden: true
      },
      {
          path: 'updateproductcate',
          name: 'updateproductcate',
          component: () => import('@/views/productcate/update'),
          meta: {title: '修改商品分类'},
          hidden: true
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/orderlist',
    name: 'order',
    meta: {title: '订单', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'orderlist',
        component: () => import('@/views/order/order/index'),
        meta: {title: '订单列表', icon: 'product-list'}
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/order/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden:true
      },
      {
        path: 'deliver',
        name: 'deliver',
        component: () => import('@/views/order/order/deliverOrderList'),
        meta: {title: '发货列表'},
        hidden:true
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/order/order/setting'),
        meta: {title: '订单设置', icon: 'order-setting'}
      },
      {
        path: 'returnapply',
        name: 'returnapply',
        component: () => import('@/views/order/apply/index'),
        meta: {title: '退货申请处理', icon: 'order-return'}
      },
      {
        path: 'returnreason',
        name: 'returnreason',
        component: () => import('@/views/order/apply/reason'),
        meta: {title: '退货原因设置', icon: 'order-return-reason'}
      },
      {
        path: 'returnapplydetail',
        name: 'returnapplydetail',
        component: () => import('@/views/order/apply/applyDetail'),
        meta: {title: '退货原因详情'},
        hidden:true
      }
    ]
  },
  {
    path:'/market',
    component: Layout,
    redirect: '/market/subject',
    name: 'market',
    meta: {title: '营销', icon: 'sms'},
    children: [
      {
        path: 'subject',
        name: 'subject',
        component: () => import('@/views/market/subject/index'),
        meta: {title: '首页专题', icon: 'sms-subject'}
      },
      {
        path: 'subjectadd',
        name: 'subjectadd',
        component: () => import('@/views/market/subject/add'),
        meta: {title: '专题添加'},
        hidden: true
      },
      {
        path: 'subjectedit',
        name: 'subjectedit',
        component: () => import('@/views/market/subject/update'),
        meta: {title: '专题修改'},
        hidden: true
      }
    ]
  },
  {
    path:'/member',
    component: Layout,
    redirect: '/member/memberlist',
    name: 'member',
    meta: {title: '用户管理', icon: 'member'},
    children: [
      {
        path: 'memberlist',
        name: 'memberlist',
        component: () => import('@/views/member/memberlist'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: 'memberanalysis',
        name: 'memberanalysis',
        component: () => import('@/views/member/memberanalysis'),
        meta: {title: '用户分析', icon: 'ums-admin'}
      }
    ]
  },
  {
    path:'/banner',
    component: Layout,
    redirect: '/banner/bannerlist',
    name: 'banner',
    meta: {title: '轮播', icon: 'banner'},
    children: [
      {
        path: 'bannerlist',
        name: 'bannerlist',
        component: () => import('@/views/banner/index'),
        meta: {title: '轮播列表', icon: 'banner'}
      },
      {
        path: 'banneradd',
        name: 'banneradd',
        component: () => import('@/views/banner/add'),
        meta: {title: '添加轮播'},
        hidden: true
      },
      {
        path: 'banneredit',
        name: 'banneredit',
        component: () => import('@/views/banner/update'),
        meta: {title: '修改轮播'},
        hidden: true
      }
    ]
  },
  {
    path:'/node',
    component: Layout,
    redirect: '/node/nodelist',
    name: 'node',
    meta: {title: '权限', icon: 'ums'},
    children: [
      {
        path: 'nodelist',
        name: 'nodelist',
        component: () => import('@/views/node/nodelist'),
        meta: {title: '菜单列表', icon: 'ums'}
      },
      {
        path: 'nodeadd',
        name: 'nodeadd',
        component: () => import('@/views/node/nodeadd'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'nodeedit',
        name: 'nodeedit',
        component: () => import('@/views/node/nodeedit'),
        meta: {title: '修改菜单'},
        hidden: true
      }
    ]
  },
  {
    path:'/role',
    component: Layout,
    redirect: '/role/rolelist',
    name: 'role',
    meta: {title: '权限', icon: 'ums'},
    children: [
      {
        path: 'rolelist',
        name: 'rolelist',
        component: () => import('@/views/role/rolelist'),
        meta: {title: '角色列表', icon: 'ums-admin'}
      },
      {
        path: 'access',
        name: 'access',
        component: () => import('@/views/role/access'),
        meta: {title: '分配菜单'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
