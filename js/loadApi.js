const boxArray = [];
const div = document.querySelectorAll('#outdoor')[0];
function handleApi(res) {
  res.forEach((e) => {
    div.insertAdjacentHTML('beforeend', boxHTML(e));
    //OWL CAROUSEL
    $(`#${e.id}`)
      .on('initialized.owl.carousel changed.owl.carousel', function (e) {
        if (!e.namespace) {
          return;
        }
        $('.product-single-item-numbers').text(
          e.relatedTarget.relative(e.item.index) + 1 + ' / ' + e.item.count
        );
      })
      .owlCarousel({
        loop: false,
        rewind: true,
        items: 1,
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
      });
  });
  // PRETTY PHOTO
  $(
    ".product-item-carousel a[rel^='prettyPhoto[cat_list_gallery]']"
  ).prettyPhoto({
    theme: 'facebook',
    slideshow: 5000,
    autoplay_slideshow: true,
    allow_resize: true,
    social_tools: false,
    deeplinking: false,
  });
}

function imgArr(fileUrl, aciqlama) {
  const imageArr = fileUrl.split('|');

  imgHTML = imageArr.map(
    (e) => `
    <div class="product-item">
    <a href="https://test.sourcedagile.com/api/get/files/${e}" rel="prettyPhoto[cat_list_gallery]" title="${aciqlama}">
    <img src="https://test.sourcedagile.com/api/get/files/${e}" alt="photo"></a>
    </div>`
  );
  return imgHTML;
}

function boxHTML(data) {
  return `
  <div  class="col-md-3">
  <div class="blog-entry  product-item-box">
    <div class="product-item-box-in">
    <div id='${data.id}'  class="owl-carousel product-item-carousel">
    ${imgArr(data.fileUrl, data.aciqlama).join('')}
    </div>
    <span class="product-item-numbers">1 / 3</span>
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
//! /////////////////////////////////////////////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////////////////////////////////////////////
//! /////////////////////////////////////////////////////////////////////////////////////////////

var data = {
  kv: {
    startLimit: '0',
    endLimit: '10',
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
