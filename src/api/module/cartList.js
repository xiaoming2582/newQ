import ax from '../axios';

//卡券列表
export function cardList(params, config = {
  showLoading: false
}) {
  console.log(config)
  return ax.post('/qxiao-mp/coupon/list', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//领取卡券
export function getCoupon(params, config = {
  showLoading: false
}) {

  return ax.post('/qxiao-mp/coupon', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
