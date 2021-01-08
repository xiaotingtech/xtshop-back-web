import request from '@/utils/request'
import {dataTransform} from "echarts/src/component/marker/markerHelper";
export function fetchList(params) {
  return request({
    url:'/back/order/list',
    method:'get',
    params:params
  })
}

export function closeOrder(params) {
  return request({
    url:'/back/order/close',
    method:'post',
    params:params
  })
}

export function deleteOrder(params) {
  return request({
    url:'/back/order/delete',
    method:'post',
    params:params
  })
}

export function queryExpress(data) {
  return request({
    url:'/back/express/query',
    method:'post',
    data:data
  });
}

export function deliveryOrder(data) {
  return request({
    url:'/back/order/delivery',
    method:'post',
    data:data
  });
}

export function getOrderDetail(id) {
  return request({
    url:'/back/order/detail',
    method:'post',
    data:{order_id:id}
  });
}

export function updateReceiverInfo(data) {
  return request({
    url:'/back/order/receiverinfo',
    method:'post',
    data:data
  });
}

export function updateOrderNote(data) {
  return request({
    url:'/back/order/remark',
    method:'post',
    data:data
  })
}
