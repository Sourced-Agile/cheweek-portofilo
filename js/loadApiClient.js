const boxArray = [];
const div = document.querySelectorAll('#products')[0];
function handleApi(res) {
  res.forEach((e) => {
    div.insertAdjacentHTML('beforeend', boxHTML(e));
    console.log(e.id);
    //OWL CAROUSEL
    $(`#${e.id}`)
      .on('changed.owl.carousel initialized.owl.carousel', function (e) {
        if (!e.namespace) {
          return;
        }
      })
      .owlCarousel({
        loop: false,
        rewind: true,
        items: 1,
        lazyLoad: true,
        margin: 15,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 300,
        autoplayTimeout: 8000,
        animateOut: 'fadeOut',
        navText: [
          "<i class='fa fa-chevron-left'></i>",
          "<i class='fa fa-chevron-right'></i>",
        ],
        onInitialized: counter, //When the plugin has initialized.
        onTranslated: counter, //When the translation of the stage has finished.
      });

    function counter(event) {
      var element = event.target; // DOM element, in this example .owl-carousel
      var items = event.item.count; // Number of items
      var item = event.item.index + 1; // Position of the current item

      // it loop is true then reset counter from 1
      if (item > items) {
        item = item - items;
      }
      $(`.count-${e.id}`).html(item + ' / ' + items);
    }

    // PRETTY PHOTO
    $(
      `.product-item-carousel a[rel^='prettyPhoto[cat_list_gallery-${e.id}]']`
    ).prettyPhoto({
      theme: 'facebook',
      slideshow: 5000,
      autoplay_slideshow: true,
      allow_resize: true,
      social_tools: false,
      deeplinking: false,
    });
  });
}

function filterImg(mov) {
  return (
    mov.includes('.jpeg') ||
    mov.includes('.jpg') ||
    mov.includes('.webp') ||
    mov.includes('.png') ||
    mov.includes('.gif')
  );
}

function imgArr(fileUrl, aciqlama, id) {
  const imageArr = fileUrl.split('|').filter(filterImg);
  console.log(imageArr);
  imgHTML = imageArr.map(
    (e) => `
    
    <div class="product-item">
    <a href="https://test.sourcedagile.com/api/get/files/${e}" rel="prettyPhoto[cat_list_gallery-${id}]" title="${aciqlama}">
    <img src="https://test.sourcedagile.com/api/get/files/${e}" alt="photo"></a>
    </div>`
  );
  return imgHTML;
}

function boxHTML(data) {
  return `
  <div  class="col-md-3 item-${data.id}">
  <div class="blog-entry product-item-box">
    <div class="product-item-box-in">
    <div id='${data.id}'  class="owl-carousel product-item-carousel">
    ${imgArr(data.fileUrl, data.aciqlama, data.id).join('')}
    </div>
    <span class="product-item-brand"><img src="images/azercell.jpg" /></span>
    <span class="product-item-numbers count-${data.id}">0/0</span>
    <span class="product-id-name"></span>
    <a href="detail.html"><span class="product-short-desc">${
      data.aciqlama
    }</span></a>
    </div>
    <div class="text text-2 pt-1 mt-1">
      <h3 class="mb-2"><a href="detail.html">${data.mezmun}</a></h3> 
    </div>
  </div>
</div>
  `;
}
//! /////////////////////////////////////////////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////////////////////////////////////////////

var data = {
  kv: {
    startLimit: '0',
    endLimit: '11',
  },
};

const requestOptions = {
  method: 'POST',
  body: JSON.stringify(data),
};

fetch(
  'https://test.sourcedagile.com/api/post/nasrv/48edh/22050618260504718835',
  requestOptions
)
  .then((response) => response.json())
  .then((res) => handleApi(res.tbl[0].r));
