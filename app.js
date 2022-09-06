'use strict';

let imageElements = document.getElementsByTagName('img');

let imageFile1 = 0;
let imageFile2 = 1;
let imageFile3 = 2;
let totalRounds = 25;
let allImagess = [];

function Image(name, imageURL, timesClicked, timesShown) {
  this.name = name;
  this.imageURL = imageURL;

  if (timesClicked) {
    this.timesClicked = timesClicked;
  } else {
    this.timesClicked = 0;
  }
  if (timesShown) {
    this.timesShown = timesShown;
  } else {
    this.timesShown = 0;
  }
  allImagess.push(this);
}

// console.log(allImagess);

function getImagesArray(nameOfThePropertyIWant) {
  let answer = [];
  for (let i = 0; i < allImagess.length; i++) {
    answer[i] = allImagess[i][nameOfThePropertyIWant];
  }
  // console.log(answer);
  return answer;
}

let savedImagesString = localStorage.getItem('savedImages');

if (savedImagesString) {
  let arrayOfNotImages = JSON.parse(savedImagesString);

  for (let i = 0; i < arrayOfNotImages.length; i++) {
    new Image(
      arrayOfNotImages[i].name,
      arrayOfNotImages[i].imageURL,
      arrayOfNotImages[i].timesClicked,
      arrayOfNotImages[i].timesShown
    );
  }
} else {

  new Image('Bag', 'img/bag.jpg');
  new Image('Banana', 'img/banana.jpg');
  new Image('Bathroom', 'img/bathroom.jpg');
  new Image('Boots', 'img/boots.jpg');
  new Image('Breakfast', 'img/breakfast.jpg');
  new Image('Bubblegum', 'img/bubblegum.jpg');
  new Image('Chair', 'img/chair.jpg');
  new Image('Cthulhu', 'img/cthulhu.jpg');
  new Image('Dog-Dug', 'img/dog-duck.jpg');
  new Image('Dragon', 'img/dragon.jpg');
  new Image('Pen', 'img/pen.jpg');
  new Image('Pet-sweep', 'img/pet-sweep.jpg');
  new Image('Scissors', 'img/scissors.jpg');
  new Image('Shark', 'img/shark.jpg');
  new Image('Sweep', 'img/sweep.png');
  new Image('Tauntaun', 'img/tauntaun.jpg');
  new Image('Unicorn', 'img/unicorn.jpg');
  new Image('Water-can', 'img/water-can.jpg');
  new Image('Wine-Glass', 'img/wine-glass.jpg');
}

allImagess[0].timesShown = 1;
allImagess[1].timesShown = 1;

let totalClicks = 0;

function imageWasClicked(event) {
  totalClicks++;



  if (event.srcElement.id === '1') {
    allImagess[imageFile1].timesClicked++;
  } else if (event.srcElement.id === '2') {
    allImagess[imageFile2].timesClicked++;
  } else if (event.srcElement.id === '3') {
    allImagess[imageFile3].timesClicked++;
  }

  let nextimageFile1 = Math.floor(Math.random() * allImagess.length);
  let nextimageFile2 = Math.floor(Math.random() * allImagess.length);
  let nextimageFile3 = Math.floor(Math.random() * allImagess.length);

  while ((nextimageFile1 === imageFile1) &&
    (nextimageFile1 === imageFile2) &&
    (nextimageFile1 === imageFile3) &&
    (nextimageFile1 === nextimageFile2) &&
    (nextimageFile1 === nextimageFile3)) {
    nextimageFile1 = Math.floor(Math.random() * allImagess.length);
  }
  while ((nextimageFile2 === imageFile1) &&
    (nextimageFile2 === imageFile2) &&
    (nextimageFile2 === imageFile3) &&
    (nextimageFile2 === nextimageFile1) &&
    (nextimageFile2 === nextimageFile3)) {
    nextimageFile2 = Math.floor(Math.random() * allImagess.length);
  }
  while ((nextimageFile3 === imageFile1) &&
    (nextimageFile3 === imageFile2) &&
    (nextimageFile3 === imageFile3) &&
    (nextimageFile3 === nextimageFile2) &&
    (nextimageFile3 === nextimageFile1)) {
    nextimageFile3 = Math.floor(Math.random() * allImagess.length);
  }

  imageFile1 = nextimageFile1;
  imageFile2 = nextimageFile2;
  imageFile3 = nextimageFile3;

  imageElements[0].src = allImagess[imageFile1].imageURL;
  allImagess[imageFile1].timesShown++;

  imageElements[1].src = allImagess[imageFile2].imageURL;
  allImagess[imageFile2].timesShown++;

  imageElements[2].src = allImagess[imageFile3].imageURL;
  allImagess[imageFile3].timesShown++;

  if (totalClicks >= totalRounds) {

    localStorage.setItem('savedImages', JSON.stringify(allImagess));

    let footerElement = document.getElementById('footer');

    if (footerElement.firstChildElement) {
      footerElement.firstChildElement.remove();
    }

    let asideUL = document.getElementById('voteResults');

    for (let i = 0; i < allImagess.length; i++) {
      let voteResultsListItem = document.createElement('li');
      voteResultsListItem.textContent = `${allImagess[i].name} was clicked on ${allImagess[i].timesClicked} times and was shown ${allImagess[i].timesShown} times `;
      asideUL.appendChild(voteResultsListItem);

      let percentageListItem = document.createElement('li');
      let math;
      if (allImagess[i].timesClicked === 0) {
        math = `zero click and shown ${allImagess[i].timesShown} times. Must be a bad Images`;
      } else {
        math = Math.round(((allImagess[i]['timesClicked'] / allImagess[i]['timesShown']).toFixed(2) * 100)) + '%';
      }
      percentageListItem.textContent = `${allImagess[i].name} percentage of times clicked on vs. times shown is ${math}`;
      asideUL.appendChild(percentageListItem);
    }

    for (let i = 0; i < imageElements.length; i++) {
      imageElements[i].removeEventListener('click', imageWasClicked);
  
    }
    runMyChartNow();
  }

}
for (let i = 0; i < imageElements.length; i++) {
  imageElements[i].addEventListener('click', imageWasClicked);
}


function runMyChartNow() {
  let ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getImagesArray('name'),
      datasets: [{
        label: 'Number of Votes',
        data: getImagesArray('timesClicked'),
        backgroundColor: [
          'rgba(153, 50, 204, 1)',
          'rgba(255, 140, 255, 1)',
          'rgba(255, 140, 40, 1)',
          'rgba(255, 255, 40, 1)',
          'rgba(0, 64, 159, 1)',
          'rgba(0, 255, 0, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}