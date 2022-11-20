const btnNav = document.querySelectorAll('.btn-arrow');

btnNav.forEach(btn => {
  btn.addEventListener('click', function () {
    const position = (this.classList[1] === "next") ? 1 : -1;
    const slides = document.querySelectorAll('.slide');
    const currentActive = document.querySelector('.slide.active');
    let newIndex = [...slides].indexOf(currentActive) + position;

    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex > slides.length - 1) newIndex = 0;

    currentActive.classList.remove('active');
    slides[newIndex].classList.add('active');
  })
});

let imagesSlider = document.querySelectorAll('.slide > img');
imagesSlider.forEach(img => {
  img.addEventListener('dragstart', dragStart);
});

function dragStart(e) {
  const img = e.target;
  e.dataTransfer.setData('image-src', e.target.src);
  e.dataTransfer.setData('name', img.getAttribute('data-name'));
  e.dataTransfer.setData('price', img.getAttribute('data-price'));
  e.dataTransfer.setData('item-id', img.getAttribute('data-item-id'));
}

function dragOver(e) {
  e.preventDefault();
}

// drop order item
let orderIndex = 2;
function dropItem(e) {
  e.preventDefault();

  const breadBottom = document.getElementById('breadBottom');
  const container = document.getElementById('order');

  if (e.target == container) {
      const src = e.dataTransfer.getData('image-src');
      const name = e.dataTransfer.getData('name');
      const price = e.dataTransfer.getData('price');

      if(src){
          let gambar = document.createElement('img');
          gambar.src = src;
          gambar.classList.add('order_img');
          gambar.setAttribute('data-name', name);
          gambar.setAttribute('data-price', price);
          gambar.setAttribute('ondragstart', 'dragStart(event)');
          gambar.setAttribute('data-item-id', `${name}-${orderIndex}`);
          gambar.style.zIndex = orderIndex;
          container.insertBefore(gambar, breadBottom);
          
          orderIndex++;
      }

      saveOrder();  
    }else{
        return;
    }
}

const resetTableDetail = () => {
  const tableDetail = document.getElementById('detail');
  const tableTotal = document.getElementById('total');
  tableDetail.innerHTML = '';
  tableTotal.innerHTML = '';
}

// reset order
const btnReset = document.getElementById('btn-reset');
btnReset.addEventListener('click', function () {
  const orderImg = document.querySelectorAll('.order_img');
  orderImg.forEach(item => {
    item.remove();
  })

  saveOrder();
  sessionStorage.clear();
  resetTableDetail();
})

// drop reset item
function dropResetItem(e) {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('item-id');
  // delete element by item name
  const orderImg = document.querySelectorAll('.order_img');
  
  orderImg.forEach(item => {
    if (item.getAttribute('data-item-id') === itemId) {
      item.remove();
    }
  })


  const trDetail = document.querySelectorAll('#detail > tbody > tr');

  if (orderImg.length > 1) {
    trDetail.forEach(item => {
      if (item.getAttribute('data-id') === itemId) {
        item.remove();
      }
    })
  } else {
    resetTableDetail();
  }
    

  const totalPrice = document.querySelector('#total > tbody > tr > td > p.total-nominal');
  const price = parseFloat(totalPrice.innerHTML.replace('$', ''));
  const itemPrice = parseFloat(e.dataTransfer.getData('price'));
  const newPrice = price - itemPrice;
  totalPrice.innerHTML = `$${newPrice}`;

}

const removeTableChilds = parent => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

let dataJson;
let dataOrder = [];
// save order item
function saveOrder () {

  const orderImg = document.querySelectorAll('.order_img');
  const tableDetail = document.getElementById('detail');
  const tableTotal = document.getElementById('total');

  tableDetail.getAttribute('data-name');
  removeTableChilds(tableDetail);
  let total = 0;
  orderImg.forEach(item => {
      const dataPrice = parseFloat(item.getAttribute('data-price'));
      total += dataPrice;
      tableDetail.innerHTML += `
        <tr data-id="${item.getAttribute('data-item-id')}">
        
        <td>
            <p class="m-0 my-1">${item.getAttribute('data-name')}</p>
        </td>
        
        <td>
            <p class="m-0 my-1">$${item.getAttribute('data-price')}</p>
        </td>
        
        </tr>
      `;
  });

  dataOrder.length = 0;
  orderImg.forEach(item => {
      const _dataOrder = {name: item.getAttribute('data-name'), price: item.getAttribute('data-price')};
      dataOrder.push(_dataOrder);
  });

  dataJson = JSON.stringify(dataOrder);
  orderNow(dataJson, total);

  tableTotal.innerHTML = `
      <tr>
      
        <td>
            <p class="m-0 my-1">Total Price</p>
        </td>
      
        <td>
            <p class="total-nominal m-0 my-1">$${total}</p>
        </td>
      
      </tr>
  `;

}

// order 
function orderNow(data, total) {
  const btnOrder = document.getElementById('btn-order');
  btnOrder.addEventListener('click', function () { 
    window.location.href = 'order.html';
    sessionStorage.setItem('order-data', data);
    sessionStorage.setItem('total-price', total);
  })
}