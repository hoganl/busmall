'use strict';

//global variables

Product.allThreePics = document.getElementById('products-pics');
Product.pics = [document.getElementById('product-pic1'), document.getElementById('product-pic2'),document.getElementById('product-pic3')];
Product.list = document.getElementById('productlist');

//array to store objects

Product.allProducts = [];
Product.compareProducts = [];

//make an object

function Product (name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

//make new image instances

Product.names = ['R2D2 Luggage', 'Banana Cutter', 'Bathroom Tablet Holder', 'Open Toed Rain Boots', 'All-In-One Breakfast', 'Meatball Bubblegum', 'Reverse Chair', 'Cthulhu Action Figure', 'Doggy Duck Nose', 'Dragon Meat', 'Pen Utencil', 'Pet Sweeper', 'Pizza Scissors', 'Shark Sleeping Bag', 'Baby Sweeper', 'Tauntaun Sleeping Bag', 'Unicorn Meat', 'USB Tentacle', 'Self Watering Can', 'Wine Glass'];

new Product(Product.names[0], 'img/bag.jpg');
new Product(Product.names[1], 'img/banana.jpg');
new Product(Product.names[2], 'img/bathroom.jpg');
new Product(Product.names[3], 'img/boots.jpg');
new Product(Product.names[4], 'img/breakfast.jpg');
new Product(Product.names[5], 'img/bubblegum.jpg');
new Product(Product.names[6], 'img/chair.jpg');
new Product(Product.names[7], 'img/cthulhu.jpg');
new Product(Product.names[8], 'img/dog-duck.jpg');
new Product(Product.names[9], 'img/dragon.jpg');
new Product(Product.names[10], 'img/pen.jpg');
new Product(Product.names[11], 'img/pet-sweep.jpg');
new Product(Product.names[12], 'img/scissors.jpg');
new Product(Product.names[13], 'img/shark.jpg');
new Product(Product.names[14], 'img/sweep.png');
new Product(Product.names[15], 'img/tauntaun.jpg');
new Product(Product.names[16], 'img/unicorn.jpg');
new Product(Product.names[17], 'img/usb.gif');
new Product(Product.names[18], 'img/water-can.jpg');
new Product(Product.names[19], 'img/wine-glass.jpg');

//function to randomly display images

function randomGenerator () {
  return Math.floor(Math.random() * Product.names.length);
}

//create display

function displayPics () {
  while (Product.compareProducts.length < 6) {
    var randomPic = randomGenerator();
    while (!Product.compareProducts.includes(randomPic)) {
      Product.compareProducts.push(randomPic);
    }
  }

  for ( var i = 0; i < 3; i++) {
    var temp = Product.compareProducts.shift();
    Product.pics[i].src = Product.allProducts[temp].filepath;
    Product.pics[i].alt = Product.allProducts[temp].name;
    Product.pics[i].title = Product.allProducts[temp].name;
    Product.allProducts[temp].views += 1;
  }
}

//create handler

Product.totalClicks = 0;

function clickOnProducts(event) {
  if (event.target === Product.allThreePics) {
    return alert('You must click on an image.');
  }
  // console.log(Product.totalClicks, 'total clicks');

  if (Product.totalClicks > 24) {
    Product.allThreePics.removeEventListener('click', clickOnProducts);
    Product.allThreePics.style.display = 'none';
    showList();
  }
  Product.totalClicks += 1;

  for (var i = 0; i < Product.names.length; i++) {
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].clicks += 1;
      // console.log(event.target.alt + ' has ' + Product.allProducts[i].clicks + ' votes in ' + Product.allProducts[i].views + ' views');
    }
  }
  displayPics();
}

//create list

function showList () {
  for (var i = 0; i < Product.allProducts.length; i++) {
    var liEl = document.createElement('li');
    var conversion = (Product.allProducts[i].clicks / Product.allProducts[i].views * 100).toFixed(1);
    liEl.textContent = Product.allProducts[i].name + ' has ' + Product.allProducts[i].clicks + ' votes in ' + Product.allProducts[i].views + ' views for a click-through conversion rate of ' + conversion + '%';

    if (conversion > 49) {
      liEl.style.color = 'white';
      liEl.style.backgroundColor = 'green';
    }

    if (conversion < 30) {
      liEl.style.color = 'white';
      liEl.style.backgroundColor = 'red';
    }

    Product.list.appendChild(liEl);
  }
}

displayPics();
Product.allThreePics.addEventListener('click', clickOnProducts);