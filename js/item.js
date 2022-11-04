class Item {
  constructor(id, name, cost) {
    this.id = id;
    this.name = name;
    this.cost = cost;
  }
}

let itemList = [];

itemList[0] = new Item('0', 'Top Bread', 1);
itemList[1] = new Item('1', 'Bottom Bread', 1);
itemList[2] = new Item('2', 'Vegetable', 0.5);
itemList[3] = new Item('3', 'Beef', 5);
itemList[4] = new Item('4', 'Egg', 2);
itemList[5] = new Item('5', 'Tomato', 1);
itemList[6] = new Item('6', 'Cheese', 2);
itemList[7] = new Item('7', 'Onion', 1);
itemList[8] = new Item('8', 'pickle', 1);

itemList.forEach((item, index) => {
  document.append();
})
