
const boxArray = [];
const div = document.querySelectorAll('#products')[0];

var endLimit = 11;
var startLimit = 0;
var rowCount = 0;
$(function () {
  $(window).on('scroll', function (e) {
    var $this = $(this);
    var $results = $('#products');

    if (!$results.data('loading')) {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        endLimit = endLimit + 11;
        startLimit = startLimit + 11;
        if (startLimit < rowCount) {
          $results
            .after(
              $(
                `<div class='col-md-12 loading text-center'><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`
              ).fadeIn('slow')
            )
            .data('loading', true);
          new genCategory().loadResults(startLimit, endLimit);
        }
      }
    }
  });
});

// var catname = Utility.getParamFromUrl('category');

class genCategory {
  filterImg(mov) {
    return (
      mov.includes('.jpeg') ||
      mov.includes('.jpg') ||
      mov.includes('.webp') ||
      mov.includes('.png') ||
      mov.includes('.gif') ||
      mov.includes('.svg')
    );
  }
  boxHTML(data) {

    return `
      <div  class="owl-lazy col-md-3 item-${data.id}">
      <div class="blog-entry product-item-box">
        <div class="product-item-box-in">
        <div id='${data.id}'  class="owl-carousel product-item-carousel">
        ${this.imgArr(data.fayl, data.aciqlama, data.id).join('')}
        </div>
        <span class="product-item-numbers count-${data.id}">0/0</span>
        <span class="product-id-name"></span>
        <a href="detail.html?catid=${data.id}&category=${Utility.getRemoveHTMLTags(data.mezmun)}">
          <div class="d-flex">
            <span class="product-short-desc d-flex">
              <strong class="mr-auto"> ${Utility.getEllipsis(data.aciqlama,75)}</strong>
              <strong clas="float-right"><i class="fa fa-image"></i> ${this.imgCountArr(data.fayl)}</strong>
            </span>
          </div>
        </a>
        </div>
        <div class="text text-2 pt-1 mt-1">
          <h3 class="mb-2"><a href="detail.html?catid=${data.id}&category=${Utility.getRemoveHTMLTags(data.mezmun)}">${Utility.getRemoveHTMLTags(data.mezmun)}</a></h3> 
        </div>
      </div>
    </div>
      `;
  }
  imgArr(fayl, aciqlama, id) {
    try {
      const imageArr = fayl.split('|').filter(this.filterImg).slice(-10);
    var imgHTML = imageArr.map(
      (e) => `
        <div class="product-item">
        <a href="https://test.sourcedagile.com/api/get/files/${e}" rel="prettyPhoto[cat_list_gallery-${id}]" title="${aciqlama}">
        <img class="owl-lazy" data-src="https://test.sourcedagile.com/api/get/files/${e}" alt="photo"></a>
        </div>`
    );
    return imgHTML;
    } catch (error) {
      return '';
    }
    
  }
  imgCountArr(fayl) {
    const imageCountArr = fayl.split('|');
    var imgCountHTML = imageCountArr.length;
    return imgCountHTML;
  }
  handleApi(res) {
    res.forEach((e) => {
      div.insertAdjacentHTML('beforeend', this.boxHTML(e));
      // console.log(e.id);
      //OWL CAROUSEL
      // this.counter(e)
      this.genPrettyAndCorusel(e.id);
    });
  }
  loadResults(startLimit, endLimit) {
    var fkKateqoriyaId = Utility.getParamFromUrl('menu');
    var text  =  Utility.getParamFromUrl('key');
        text  =  decodeURI(text).split('+')
    var data = {
      kv: {
        startLimit: startLimit,
        endLimit: endLimit,
        searchText: text,
        fkKateqoriyaId: fkKateqoriyaId,
      },
    };
    data = JSON.stringify(data);
    var that = this;
    $.ajax({
      url: 'https://test.sourcedagile.com/api/post/nasrv/48edh/22050618260504718835',
      method: 'POST',
      data: data,
      contentType: 'application/json',
      crossDomain: true,
      async: true,
      success: function (data) {
        var $results = $('#products');
        $('.loading').fadeOut('fast', function () {
          $(this).remove();
        });
        that.handleApi(data.tbl[0].r);
        rowCount = data.kv.rowCount;
        $results.removeData('loading');
      },
    });
  }
  counter(event, id) {
    var element = event.target; // DOM element, in this example .owl-carousel
    var items = event.item.count; // Number of items
    var item = event.item.index + 1; // Position of the current item

    // it loop is true then reset counter from 1
    if (item > items) {
      item = item - items;
    }
    $(`.count-${id}`).html(item + ' / ' + items);
  }
  genPrettyAndCorusel(id) {
    var that = this;
    $(`#${id}`).owlCarousel({
        loop: false,
        rewind: true,
        items: 1,
        lazyLoad:true,
        lazyLoadEager: true,
        margin: 15,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayHoverPause: true,
        smartSpeed: 300,
        autoplayTimeout: 8000,
        animateOut: 'fadeOut',
        navText: [
          "<i class='fa fa-chevron-left'></i>",
          "<i class='fa fa-chevron-right'></i>",
        ],
        onInitialized  :function (e) {
          that.counter(e,id)
        } , //When the plugin has initialized.
        onTranslated : function (e) {
          that.counter(e,id)
        } //When the translation of the stage has finished.
      });

      // PRETTY PHOTO
      $(`.product-item-carousel a[rel^='prettyPhoto[cat_list_gallery-${id}]']`
      ).prettyPhoto({
        theme: 'facebook',
        slideshow: 5000,
        autoplay_slideshow: true,
        allow_resize: true,
        social_tools: false,
        deeplinking: false,
      });
   }

}

$(document).on("click",".cat-click",function() {
  var url = $(this).attr('href');
  var urlName = $(this).text();
  $('#category-map').attr('href', url);
  $('#category-map').html(urlName);
  new genCategory().loadResults(startLimit, endLimit);
});
new genCategory().loadResults(startLimit, endLimit);