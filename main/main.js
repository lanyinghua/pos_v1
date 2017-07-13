'use strict';
// var tag=["3-2.5","5-2"];
// var devide=tag[0].split("-");
// console.log(devide);
function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}

var tags = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',
  'ITEM000005',
  'ITEM000005-2',
];

function barCount(inputItems) {
  var items =[];
  var item={};
  item.barcode=bar;
  item.count=0.0;

  for (var i=0;i<inputItems.length;i++){
    var bar = tags[i];
    if (item.barcode==bar){
      item.count+=1;
    }else if (item.barcode!=bar){
      var item={};
      item.barcode=bar;
      item.count=1;
      items.push(item);
    }
  }
  return items;
}
var preOutputItems=barCount(tags)
// console.log(barCount(tags))

function split(items) {
  var outputItems=barCount(tags);
  for (var i=0;i<items.length;i++){
    if(outputItems[i].barcode.indexOf("-") > -1){
      var bar=outputItems[i].barcode.slice(0,10);
      var num=parseFloat(outputItems[i].barcode.slice(11))
      // console.log(num);
      outputItems[i].barcode=bar;
      outputItems[i].count=num;
    }else{
continue
    }
  }
return outputItems;
}
var thenOutputItems= split(preOutputItems);
// console.log(thenOutputItems);

function merge(items) {
  var outputItems=[];
  var item={};
  item.barcode=items[0].barcode;
  item.count=0;
  outputItems.push(item);
  for(var i=0;i<items.length;i++){
    if(item.barcode==items[i].barcode){
      item.count+=items[i].count;
    }else{
      var item={};
      item.barcode=items[i].barcode;
      item.count=items[i].count;
      outputItems.push(item);
    }
  }
return outputItems;
}
var outputItemsBarCount=merge(thenOutputItems);

//--------------#1 finished around 40min (plan 20min)--------------------
//Add name, unit,and price to the array.
// And Calculate the subtotal of each kindof items before sale.
function nameUnitPrice(items) {
  var lai=loadAllItems();
  for(var i=0;i<items.length;i++) {
    for (var j = 0; j < lai.length; j++) {
      var item = items[i];
      if (item.barcode == lai[j].barcode) {
        item.name = lai[j].name;
        item.unit = lai[j].unit;
        item.price = lai[j].price;
        item.subtotal = item.price*item.count;
      }
    }
  }
  return items;
}
var outputItemsOtherInfo=nameUnitPrice(outputItemsBarCount);
// console.log(outputItemsOtherInfo);

//--------------#2 finished around 5min (plan 20min)--------------------
//The real subtotal when on sale.
function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}
// var a=loadPromotions();
// var b=a[0].type
// var c=[];
// c=a[0].barcodes;
// console.log(c);

//try to find the barcode in promotions
//why stuck : refer 'barcodes' to be 'barcode'

function realSubandSave(items) {
  var items=nameUnitPrice(outputItemsBarCount);
  var promotion=loadPromotions();
  var bar = promotion[0].barcodes;

  for (var i=0;i<items.length;i++){
    if (items[i] =={} ){
      continue
    }else {items[i].save=0}
  }//Add 'save' to outputItems[i].
  for (var i=0;i<items.length;i++){
    if (items[i].count >= 2){
      for (var j=0;j<bar.length;j++) { //for 'bar'
        if (items[i].barcode == bar[j]) {
          items[i].save = items[i].price;
          items[i].subtotal -= items[i].save

        } else {
          continue
        }
      }
      //change save of items[i] whose barcode is equal to promotion
    }else {items[i].save=0}
  }

  return items;
}

var outputItems=realSubandSave(outputItemsOtherInfo);
// console.log(outputItems);
//--------------#3 finished around 20min (plan 15min)--------------------

function addSubandSave(items) {
  var total = 0;
  var totalSave=0;
  for(var i=0;i<items.length;i++) {

    total += items[i].subtotal;
   totalSave += items[i].save;
 }
 var summary=[total,totalSave]
 return summary;
}
// console.log(addSubandSave(outputItems))
//--------------#4&5 finished around 5min (plan 15&20min)--------------------

function result(outputItems,summary) {
  var outputItems=realSubandSave(outputItemsOtherInfo);
  var summary=addSubandSave(outputItems);
  var str = "***<"+"没钱赚商店>收据***\n";

  for ( var i=0; i<outputItems.length;i++){
    if (outputItems[i].count != 0){
      str+="名称："+outputItems[i].name+"，数量："+outputItems[i].count+outputItems[i].unit
        +"，单价："+outputItems[i].price.toFixed(2) +"(元)，小计："+outputItems[i].subtotal.toFixed(2)+"(元)\n";
    }else {
      continue
    }
  }

  str+="----------------------\n总计："+summary[0].toFixed(2)+"(元)\n节省："
    +summary[1].toFixed(2)+"(元)\n **********************`"

  return str;
}
// var summary=addSubandSave(outputItems);
// console.log(result(outputItems,summary))
//--------------#6 finished around 40min (plan 15min)--------------------
//why stuck: a {} in outputItem:[{}], many status undefined
function printReceipt(tags) {
  var outputItems=realSubandSave(outputItemsOtherInfo);
  var summary=addSubandSave(outputItems);
  console.log(result(outputItems,summary));

}
printReceipt(tags);
