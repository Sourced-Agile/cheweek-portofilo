

var Utility = {
    convertDate: function (d, seperator) {
        var st = "";
        var sep = (seperator) ? seperator : global_var.data_eliminator;
        try {
            st = d.substring(4, 6) + sep + d.substring(6, 8) + sep + d.substring(0, 4)
        } catch (e) {
        }
        return st;
    }
    ,
    convertTime: function (d, seperator) {
        var st = "";
        var sep = (seperator) ? seperator : global_var.time_eliminator;
        try {
            st = d.substring(0, 2) + sep + d.substring(2, 4) 
        } catch (e) {
        }
        return st;
    },
    convertDTpicker: function (d, seperator,type) {
        var st = "";
        var sep = (seperator) ? seperator : global_var.data_eliminator;
        try {
            if(type&&type==='mm/dd/yy'){
                st = d.substring(4, 6) + sep +  d.substring(6, 8) + sep +d.substring(0, 4) 

            }
            else{
                st = d.substring(0, 4) + sep + d.substring(4, 6) + sep + d.substring(6, 8)

            }

        } catch (e) {
        }
        return st;
    },
    convertTMpicker: function (d, seperator) {
        var st = "";
        var sep = (seperator) ? seperator : global_var.time_eliminator;
        try {
            st = d.substring(0, 2) + sep + d.substring(2, 4);
        } catch (e) {
        }
        return st;
    },
    focus: function (id) {
        setTimeout(function () {
            $('#' + id).focus();
        }, 600);
    },
    addParamToUrl: function (param, value) {
        var newurl = Utility.replaceUrlParam(document.location.href, param, value);
        window.history.pushState({path: newurl}, '', newurl);
    },
    replaceUrlParam: function (url, paramName, paramValue) {
        if (paramValue == null) {
            paramValue = '';
        }
        var pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
        if (url.search(pattern) >= 0) {
            return url.replace(pattern, '$1' + paramValue + '$2');
        }
        url = url.replace(/[?#]$/, '');
        return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
    },
    getParamFromUrl: function (param) {
        var parts = document.location.href.split("?");
        var params = parts[parts.length - 1];
        var pairs = params.split("&");
        var res = '';
        for (var i = 0; i < pairs.length; i++) {
            var k = pairs[i].split("=")[0];
            var v = pairs[i].split("=")[1];
            if (k === param) {
                res = v;
                break;
            }
        }
        return res.replace("#", "");
    },
    setParamOnLoad: function () {
        var parts = document.location.href.split("?");
        var params = parts[parts.length - 1];
        var pairs = params.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var k = pairs[i].split("=")[0];
            var v = pairs[i].split("=")[1];
            try {
                v = v.replace(/#/g, '');
            } catch (ee) {
            }
            global_var[k] = v;
//            if (k === 'current_project_id') {
////                $('#projectList option')
////                        .removeAttr('selected')
////                        .filter('[value='+v+']')
////                        .attr('selected', true)
//                $('#projectList').val(v);
//            }

        }
    },
}

/* $(document).on("keydown", '#search-input', function () {
    if (e.keyCode == 13) {
    if(document.location.href.contains('?')) {
         
        var url = document.location.href+"&success=yes";
    }else{
        var url = document.location.href+"?success=yes";
    }
      document.location = url;
    }
  }); */


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
        ${this.imgArr(data.fileUrl, data.aciqlama, data.id).join('')}
        </div>
        <span class="product-item-numbers count-${data.id}">0/0</span>
        <span class="product-id-name"></span>
        <a href="detail.html">
          <div class="d-flex">
            <span class="product-short-desc d-flex">
              <strong class="mr-auto">${ data.aciqlama}</strong>
              <strong clas="float-right"><i class="fa fa-image"></i> ${this.imgCountArr(data.fileUrl)}</strong>
            </span>
          </div>
        </a>
        </div>
        <div class="text text-2 pt-1 mt-1">
          <h3 class="mb-2"><a href="detail.html">${data.mezmun}</a></h3> 
        </div>
      </div>
    </div>
      `;
  }
  imgArr(fileUrl, aciqlama, id) {
    const imageArr = fileUrl.split('|').filter(this.filterImg).slice(-10);
    var imgHTML = imageArr.map(
      (e) => `
        <div class="product-item">
        <a href="https://test.sourcedagile.com/api/get/files/${e}" rel="prettyPhoto[cat_list_gallery-${id}]" title="${aciqlama}">
        <img class="owl-lazy" data-src="https://test.sourcedagile.com/api/get/files/${e}" alt="photo"></a>
        </div>`
    );
    return imgHTML;
  }
  imgCountArr(fileUrl) {
    const imageCountArr = fileUrl.split('|');
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
    var text  =  Utility.getParamFromUrl('key');
        text  =  decodeURI(text);
        text = text.replaceAll('+',' ');
    var data = {
      kv: {
        startLimit: startLimit,
        endLimit: endLimit,
        searchText: text,
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

new genCategory().loadResults(startLimit, endLimit);
