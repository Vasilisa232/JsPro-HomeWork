"use strict";

var goods = [{
  title: 'Shirt',
  price: 150
}, {
  title: 'Socks',
  price: 50
}, {
  title: 'Jacket',
  price: 350
}, {
  title: 'Shoes',
  price: 250
}];

var renderGoodsItem = function renderGoodsItem(title, price) {
  return "<div class=\"goods-item\">\n <h3>".concat(title, "</h3>\n <p>").concat(price, "</p>\n </div>");
};

var renderGoodsList = function renderGoodsList(list) {
  var goodsList = list.map(function (item) {
    return renderGoodsItem(item);
  }).join("");
  document.querySelector('.goods-list').innerHTML = goodsList;
};

renderGoodsList(goods);