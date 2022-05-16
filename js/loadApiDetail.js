
const boxArray = [];
const div = document.querySelectorAll('#products')[0];

var endLimit = 10;
var startLimit = 0;
var rowCount = 0;


class genDetail {

  imgArr(e, kv) {
    return `
    <div class="product-item">
      <a href="https://test.sourcedagile.com/api/get/files/${e.fayl}" rel="prettyPhoto[cat_single_gallery]" title="${e.kaName}: ${e.aciqlama}">
      <img class="owl-lazy" data-src="https://test.sourcedagile.com/api/get/files/${e.fayl}" alt="photo"></a>
    </div>`
    }

  handleApi(res,kv) {
    var that = this;

    $('#ItemDetailPageMap').html(`<a href="#">Əsas səhifə</a> > <a href="category.html?menuname=${Utility.getRemoveHTMLTags(kv.categoryName)}&menu=${kv.categoryId}">${Utility.getRemoveHTMLTags(kv.categoryName)}</a> > ${Utility.getRemoveHTMLTags(kv.mezmun)}`);
    $('#ItemDetailCatNum').text(`${kv.kataloqNo}`);
    $('#ItemDetailCatName').text(`${Utility.getRemoveHTMLTags(kv.categoryName)}`);
    $('#ItemdetailTitle').text(`${Utility.getRemoveHTMLTags(kv.mezmun)}`);
    $('#ItemdetailDesc').text(`${Utility.getRemoveHTMLTags(kv.aciqlama)}`);
    var div = $('.product-single-carousel');
    res.forEach((e) => {
    
      div.append(that.imgArr(e, kv));
    });
    var that = this;
   
    $(`.product-single-carousel`).owlCarousel({
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
        that.counter(e)
      } , //When the plugin has initialized.
      onTranslated : function (e) {
        that.counter(e)
      } //When the translation of the stage has finished.
    });

    // PRETTY PHOTO
    $(`.product-single-carousel a[rel^='prettyPhoto[cat_single_gallery']`
    ).prettyPhoto({
      theme: 'facebook',
      slideshow: 5000,
      autoplay_slideshow: true,
      allow_resize: true,
      social_tools: false,
      deeplinking: false,
    });
  }

  loadResults() {
    var fkKataloqId = Utility.getParamFromUrl('catid');
    // var text  =  Utility.getParamFromUrl('key');
    //     text  =  decodeURI(text).split('+')
    var data = {
      kv: {
        // startLimit: startLimit,
        // endLimit: endLimit,
        fkKataloqId: fkKataloqId,
      },
    };
    data = JSON.stringify(data);
    var that = this;
    $.ajax({
      url: 'https://test.sourcedagile.com/api/post/nasrv/48edh/220513183241046710996',
      method: 'POST',
      data: data,
      contentType: 'application/json',
      crossDomain: true,
      async: true,
      success: function (data) {
        var $results = $('#item-detail');
        $('.loading').fadeOut('fast', function () {
          $(this).remove();
        });
        that.handleApi(data.tbl[0].r, data.kv);
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
    $(`.product-single-item-numbers`).html(item + ' / ' + items);
  }

}

$(document).on("click",".cat-click",function() {
  var url = $(this).attr('href');
  var urlName = $(this).text();
  $('#category-map').attr('href', url);
  $('#category-map').html(urlName);
  new genDetail().loadResults(startLimit, endLimit);
});
new genDetail().loadResults(startLimit, endLimit);