'use strict';

//Variable Declarations

Product.allThreePics = document.getElementById('products-pics');
Product.pics = [document.getElementById('product-pic1'), document.getElementById('product-pic2'),document.getElementById('product-pic3')];
Product.list = document.getElementById('productlist');
Product.productChart;
Product.chartDrawn = false;

//Arrays

Product.allProducts = [];
Product.compareProducts = [];
Product.clicks = [];

//Constructor Function

function Product (name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

//Instances

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

//Function Declarations

//randomly display images

function randomGenerator () {
  return Math.floor(Math.random() * Product.names.length);
}

//display images

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

//click handler

Product.totalClicks = 0;

function clickOnProducts (event) {
  if (event.target === Product.allThreePics) {
    return alert('You must click on an image.');
  }
  // console.log(Product.totalClicks, 'total clicks');

  if (Product.totalClicks > 24) {
    Product.allThreePics.removeEventListener('click', clickOnProducts);
    Product.allThreePics.style.display = 'none';
    updateProductArrays();
    drawChart();
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

//update chart

function updateProductArrays () {
  for (var i = 0; i < Product.allProducts.length; i++) {
    Product.clicks[i] = Product.allProducts[i].clicks;
  }
}

//Add In The Chart
//Charts rendered using Chart JS v.2.6.0
//http://www.chartjs.org

var data = {
  labels: Product.names,
  datasets: [{
    // label: '# of votes',
    data: Product.clicks,
    backgroundColor: [
      'pink',
      'purple',
      'red',
      'blue',
      'orange',
      'tan',
      'navy',
      'bisque',
      'darkgray',
      'burlywood',
      'lightblue',
      'yellow',
      'violet',
      'gray',
      'lime',
      'fuchsia',
      'crimson',
      'black',
      'gold',
      'brown'
    ],
    hoverBackgroundColor: 'green'
  }]
};

function drawChart () {
  var ctx = document.getElementById('voting-chart').getContext('2d');
  console.log(data);
  Product.productChart = new Chart(ctx, {
    type: 'polarArea',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 3000,
        easing: 'easeOutBounce'
      },
    }
  });
  Product.chartDrawn = true;
}

//Execution, Event Listeners

displayPics();
Product.allThreePics.addEventListener('click', clickOnProducts);