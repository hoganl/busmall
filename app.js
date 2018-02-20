'use strict';

//global variables

var productsPics = document.getElementById('products-pics');
var productPic1 = document.getElementById('product-pic1');
var productPic2 = document.getElementById('product-pic2');
var productPic3 = document.getElementById('product-pic3');
var randomPic = 0;
var randomProduct1 = 0;
var randomProduct2 = 0;
var randomProduct3 = 0;
var compareProducts = [null, null, null];

//array to store objects

Product.allProducts = [];

//make an object

function Product (name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

//make new image instances

new Product('R2D2 Luggage', 'img/bag.jpg');
new Product('Banana Cutter', 'img/banana.jpg');
new Product('Bathroom Tablet Holder', 'img/bathroom.jpg');
new Product('Open Toed Rain Boots', 'img/boots.jpg');
new Product('All-In-One Breakfast', 'img/breakfast.jpg');
new Product('Meatball Bubblegum', 'img/bubblegum.jpg');
new Product('Reverse Chair', 'img/chair.jpg');
new Product('Cthulhu Action Figure', 'img/cthulhu.jpg');
new Product('Doggy Duck Nose', 'img/dog-duck.jpg');
new Product('Dragon Meat', 'img/dragon.jpg');
new Product('Pen Utencil', 'img/pen.jpg');
new Product('Pet Sweeper', 'img/pet-sweep.jpg');
new Product('Pizza Scissors', 'img/scissors.jpg');
new Product('Shark Sleeping Bag', 'img/shark.jpg');
new Product('Baby Sweeper', 'img/sweep.png');
new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new Product('Unicorn Meat', 'img/unicorn.jpg');
new Product('USB Tentacle', 'img/usb.gif');
new Product('Self Watering Can', 'img/water-can.jpg');
new Product('Wine Glass', 'img/wine-glass.jpg');


//function to randomly display images

function randomGenerator () {
  randomPic = Math.floor(Math.random() * Product.allProducts.length);
}

var clicks = 0;

function clickOnProducts() {
  productPic1.src = Product.allProducts[randomPic].filepath;
  productPic1.alt = Product.allProducts[randomPic].name;
  productPic1.title = Product.allProducts[randomPic].name;
  randomProduct1 = randomPic;
  Product.allProducts[randomProduct1].clicks++;
  Product.allProducts[randomProduct1].views++;
  compareProducts[0];
  randomGenerator();

  if(randomPic === randomProduct1) {
    randomGenerator();
  } else {
    productPic2.src = Product.allProducts[randomPic].filepath;
    productPic2.alt = Product.allProducts[randomPic].name;
    productPic2.title = Product.allProducts[randomPic].name;
    Product.allProducts[randomProduct2].clicks++;
    Product.allProducts[randomProduct2].views++;
    randomProduct2 = randomPic;
    compareProducts[1];
  }
  randomGenerator();

  if (randomPic === randomProduct2 || randomPic === randomProduct1) {
    randomGenerator();
  } else {
    productPic3.src = Product.allProducts[randomPic].filepath;
    productPic3.alt = Product.allProducts[randomPic].name;
    productPic3.title = Product.allProducts[randomPic].name;
    Product.allProducts[randomProduct3].clicks++;
    Product.allProducts[randomProduct3].views++;
    randomProduct3 = randomPic;
    compareProducts[2];
  }

  randomGenerator();
  clicks++;

  if(clicks > 25) {
    productsPics.removeEventListener('click', clickOnProducts);
  }
}

clickOnProducts();
randomGenerator();
productsPics.addEventListener('click', clickOnProducts);