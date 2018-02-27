'use strict';

//Variable Declarations

Product.allThreePics = document.getElementById('products-pics');
Product.pics = [document.getElementById('product-pic1'), document.getElementById('product-pic2'), document.getElementById('product-pic3')];
Product.list = document.getElementById('productlist');
Product.productChart;
Product.chartDrawn = false;

//Arrays

Product.allProducts = [];
Product.compareProducts = [];
Product.clicks = [];
Product.names = ['r2d2', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'duck-nose', 'dragon-meat', 'pen', 'baby-sweeper', 'scissors', 'shark', 'pet-sweeper', 'tauntaun', 'unicorn-meat', 'tentacle', 'watering-can', 'wine-glass'];

//Constructor Function

function Product (name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

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

  for (var i = 0; i < 3; i++) {
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

  if (Product.totalClicks >= 24) {
    Product.allThreePics.removeEventListener('click', clickOnProducts);
    Product.allThreePics.style.display = 'none';
    updateProductArrays();
    drawChart();
    localStorage.setItem('productsArray', JSON.stringify(Product.allProducts));
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
    label: 'Voting Results',
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

  Product.productChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//Execution, Event Listeners

if (localStorage.getItem('productsArray')) {
  var retrieveData = localStorage.getItem('productsArray');
  Product.allProducts = JSON.parse(retrieveData);
} else {

  new Product(Product.name[0], 'img/bag.jpg');
  new Product(Product.name[1], 'img/banana.jpg');
  new Product(Product.name[2], 'img/bathroom.jpg');
  new Product(Product.name[3], 'img/boots.jpg');
  new Product(Product.name[4], 'img/breakfast.jpg');
  new Product(Product.name[5], 'img/bubblegum.jpg');
  new Product(Product.name[6], 'img/chair.jpg');
  new Product(Product.name[7], 'img/cthulhu.jpg');
  new Product(Product.name[8], 'img/dog-duck.jpg');
  new Product(Product.name[9], 'img/dragon.jpg');
  new Product(Product.name[10], 'img/pen.jpg');
  new Product(Product.name[11], 'img/pet-sweep.jpg');
  new Product(Product.name[12], 'img/scissors.jpg');
  new Product(Product.name[13], 'img/shark.jpg');
  new Product(Product.name[14], 'img/sweep.png');
  new Product(Product.name[15], 'img/tauntaun.jpg');
  new Product(Product.name[16], 'img/unicorn.jpg');
  new Product(Product.name[17], 'img/usb.gif');
  new Product(Product.name[18], 'img/water-can.jpg');
  new Product(Product.name[19], 'img/wine-glass.jpg');
}

displayPics();
Product.allThreePics.addEventListener('click', clickOnProducts);