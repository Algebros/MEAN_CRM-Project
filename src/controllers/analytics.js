const moment = require('moment');
const Order = require('../models/order');

const overview = async (req, res) => {
  const allOrders = await Order.find({ user: req.user.id }).sort({date: 1});
  const ordersMap = getOrdersMap(allOrders);
  const totalOrdersNumber = allOrders.length;
  const totalDaysNumber = Object.keys(ordersMap).length;
  const totalOrdersPerDay = (totalOrdersNumber / totalDaysNumber).toFixed(0);
  const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];
  const yesterdayOrdersNumber = yesterdayOrders.length;
  const percentOrders = (((yesterdayOrdersNumber / totalOrdersPerDay) - 1) * 100).toFixed(2);
  const totalRevenues = calcPrice(allOrders);
  const revenuesPerDay = totalRevenues / totalDaysNumber;
  const yesterdayRevenues = calcPrice(yesterdayOrders);
  const percentRevenues = (((yesterdayRevenues / revenuesPerDay) - 1) * 100).toFixed(2);
  const compareRevenues = (yesterdayRevenues - revenuesPerDay).toFixed(2);
  const compareOrdersNumber = (yesterdayOrdersNumber - totalOrdersPerDay).toFixed(2);

  res.status(200).json({
    revenues: {
      percent: Math.abs(+percentRevenues),
      compare: Math.abs(+compareRevenues),
      yesterday: +yesterdayRevenues,
      isHigher: +percentRevenues > 0
    },
    orders: {
      percent: Math.abs(+percentOrders),
      compare: Math.abs(+compareOrdersNumber),
      yesterday: +yesterdayOrdersNumber,
      isHigher: +percentOrders > 0
    }
  });
}

const analytics = async (req, res) => {
  res.status(200).json({
    login: 'reg'
  })
}

function getOrdersMap(orders = []) {
  const daysOrders = {}
  orders.forEach((order) => {
    const date = moment(order.date).format('DD.MM.YYYY');
    if (date === moment().format('DD.MM.YYYY')) return;
    if (!daysOrders.date) daysOrders.date = [];
    daysOrders.date.push(order);
  });

  return daysOrders;
}

function calcPrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((totalList, item) => {
      return totalList += item.cost * item.quantity;
    }, 0);

    return total += orderPrice;
  }, 0);
}

module.exports = {
  overview,
  analytics
}