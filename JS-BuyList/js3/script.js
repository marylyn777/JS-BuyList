
let products_arr = [
  {
    name: 'Помідори',
    count: 2,
    isBuy: true,
  },
  {
    name: 'Печиво',
    count: 2,
    isBuy: false
  },
  {
    name: 'Сир',
    count: 1,
    isBuy: false
  },
];


const products = document.querySelector('.products');
const buttonAdd = document.querySelector('.buttonAdd');
const search = document.querySelector('.search');

// const left = document.querySelector('.left'); // ! ТОЛЬКО ПЕРВОЕ МЕТЧ
// const notLeft = document.querySelector('.left');
// const elemBlock = document.querySelector('.elemBlock'); //! НЕТ ЛОГИКИ!!!!!




const haveProducts = document.querySelector('.haveProducts');
const buyProducts = document.querySelector('.buyProducts');

// logical



const creatElemStatistic = (elem) => {
  const food = document.createElement('input')
  food.classList.add('food')
  food.readOnly = true;
  food.value = elem.name

  const amountOfFood = document.createElement('input')
  amountOfFood.classList.add('amountOfFood')
  amountOfFood.readOnly = true;
  amountOfFood.value = elem.count

  const foodWrap = document.createElement('div')
  foodWrap.classList.add('food-wrapper')
  foodWrap.id = 'statistic-' + elem.name;
  
  foodWrap.append(food, amountOfFood)
  
  if (elem.isBuy) {
    foodWrap.classList.add('line')
    buyProducts.append(foodWrap)
  }
  else haveProducts.append(foodWrap)

}


// const changeCount = (name, newCount) => {
//   const input = document.getElementById('statistic-' + name).children[1]
//   input.value = newCount;
// }

const changeCount = (name, newCount) => {
  const statisticElem = document.getElementById('statistic-' + name);
  const input = statisticElem.querySelector('.amountOfFood');
  input.value = newCount;
}


const changeName = (oldName, newName) => {
  const statisticElem = document.getElementById('statistic-' + oldName);
  if (statisticElem) {
    const foodInput = statisticElem.querySelector('.food');
    if (foodInput) {
      foodInput.value = newName;
    }
    statisticElem.id = 'statistic-' + newName; // Обновление ID элемента статистики
  }
};


const creatProduct = (elem) => {
  const product_c = document.createElement('div')
  product_c.classList.add('product-c');

  // left
  const product_c_left = document.createElement('div')
  product_c_left.classList.add('product-c-left')

  const p = document.createElement('p')
  p.classList.add('productName')
  p.textContent = elem.name;
  if (elem.isBuy) p.classList.add('line');


  product_c_left.append(p)
  // center
  const panelAmount = document.createElement('div')
  panelAmount.classList.add('panelAmount');

  const minus = document.createElement('button')
  minus.classList.add('minus')
  minus.classList.add('tooltip')
  minus.textContent = '-';
  minus.setAttribute('data-tooltip', 'Видалити')



  const plus = document.createElement('button')
  plus.classList.add('plus')
  plus.classList.add('tooltip')
  plus.textContent = '+';
  plus.setAttribute('data-tooltip', 'Додати')

  const input = document.createElement('input')
  input.classList.add('amount')
  input.readOnly = true;
  input.value = elem.count;

  if (elem.count === 1) minus.classList.add('btnDisabled');

  if (elem.isBuy) {
    minus.classList.add('hidden')
    plus.classList.add('hidden')
  }

  plus.onclick = () => {
    elem.count++;
    input.value = elem.count;
    changeCount(elem.name, elem.count)
    if (elem.count === 2) minus.classList.remove('btnDisabled')
  }

  minus.onclick = () => {
    elem.count--;
    input.value = elem.count;
    changeCount(elem.name, elem.count)
    if (elem.count === 1) minus.classList.add('btnDisabled')
  }

  p.onclick = () => {
    if (!elem.isBuy) {
      const originalName = elem.name;
  
      p.remove();
  
      const inputName = document.createElement('input');
      inputName.value = originalName;
      inputName.classList.add('cheese');
      product_c_left.append(inputName);
  
      inputName.onblur = () => {
        const newName = inputName.value.trim();
  
        if (newName && newName !== originalName) {
          const isHave = products_arr.find((item) => item.name === newName);
  
          if (!isHave) {
            elem.name = newName;
            p.textContent = newName;
            changeName(originalName, newName); // Обновление имени в элементе статистики
          }
        }
  
        inputName.remove();
        product_c_left.append(p);
      };
  
      inputName.focus();
    }
  };


  panelAmount.append(minus, input, plus)

  //  right 


  const bought = document.createElement('div')
  bought.classList.add('bought');

  const buttonPurchase = document.createElement('button');
  buttonPurchase.classList.add('buttonPurchase')
  buttonPurchase.classList.add('tooltip')
  buttonPurchase.textContent = elem.isBuy ? 'Не куплено' : 'Куплено';
  buttonPurchase.setAttribute('data-tooltip', 'Купити')

  const no = document.createElement('button');
  no.classList.add('no')
  no.classList.add('tooltip')
  no.textContent = 'x';
  no.setAttribute('data-tooltip', 'Видалити')
  if (elem.isBuy) no.classList.add('hidden')

  no.onclick = () => {
    products_arr = products_arr.filter(e => e.name !== elem.name);
    product_c.remove()
    const statisticElem = document.getElementById('statistic-' + elem.name);
    statisticElem.remove(); // Удаление элемента из статистики
  }

  buttonPurchase.onclick = () => {
    console.log(elem.isBuy);
    if (elem.isBuy) return;

    elem.isBuy = true;
    console.log(elem.isBuy);
    p.classList.add('line')
    minus.classList.add('hidden')
    plus.classList.add('hidden')
    no.classList.add('hidden')
    buttonPurchase.textContent = 'Не куплено' ;

    const statisticElem = document.getElementById('statistic-' + elem.name);
    statisticElem.classList.add('line')
    buyProducts.append(statisticElem)
    // statisticElem



  };

  bought.append(buttonPurchase, no)

  // all 


  product_c.append(product_c_left, panelAmount, bought)
  products.append(product_c)

};

const addNewProduct = () => {
  const nameP = search.value;
  const isHave = products_arr.find(elem => elem.name === nameP);

  if (isHave) return alert('product is already created.')

  const product = {
    name: nameP,
    count: 1,
    isBuy: false
  }

  creatElemStatistic(product)

  products_arr.push(product)
  creatProduct(product)
}

const creatStatistics = () => {
  products_arr.forEach(creatElemStatistic)
}

const creatAllProducts = () => {
  products_arr.forEach(creatProduct)
}
// events 

buttonAdd.onclick = addNewProduct;

// start
creatAllProducts()
creatStatistics()





// tests 

// const test2 = document.querySelector('div')

Math
// one  
// const test = document.querySelector('.test333')
// const test1 = document.querySelector('#to')

// const test2 = document.getElementById('to')


// console.log(test);
// console.log(test1);
// console.log(test2);



// // more 

// // const allTest = document.querySelectorAll('.test');
// // const allTest1 = document.getElementsByClassName('test');

// // console.log(allTest1);

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// innerHTML












