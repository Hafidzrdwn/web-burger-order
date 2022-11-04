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

function dragStart(e) {
  const img = e.target;
  e.dataTransfer.setData('image-src', e.target.src);
  e.dataTransfer.setData('name', img.getAttribute('data-name'));
  e.dataTransfer.setData('price', img.getAttribute('data-price'));
}

imagesSlider.forEach(img => {
  img.addEventListener('dragstart', dragStart);
});

const order_img = document.querySelectorAll('#order > img');


function dragOver(e) {
  e.preventDefault();
  order_img.forEach(img => {
    img.style.marginBottom = '-50px'
  })
}

function dragLeave(e) {
  e.preventDefault();
  order_img.forEach(img => {
    img.style.marginBottom = '-97px'
  })
}

function dropItem(e) {
  e.preventDefault();
  order_img.forEach(img => {
    img.style.marginBottom = '-97px'
  })

  const breadBottom = document.getElementById('breadBottom');
  const container = document.getElementById('order');

  if (e.target == container) {
      const src = e.dataTransfer.getData('image-src');
      const name = e.dataTransfer.getData('name');
      const price = e.dataTransfer.getData('price');

      // if(src){
      //     let gambar = document.createElement('img');
      //     gambar.src = src;
      //     gambar.classList.add('order_img');
      //     gambar.setAttribute('data-name', name);
      //     gambar.setAttribute('data-price', price);
      //     gambar.addEventListener('dragstart', dragStart(e));
      //     container.insertBefore(gambar, breadBottom);

      //     console.log(gambar)
      // }

      // saveOrder();
    }else{
        return;
    }
}
