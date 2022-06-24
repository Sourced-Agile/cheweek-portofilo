const loadNavigation = (function () {
  const loadNav = function () {
    $.ajax({
      url: 'https://test.sourcedagile.com/api/post/nasrv/48edh/22051012263201764995',
      method: 'POST',
      contentType: 'application/json',
      crossDomain: true,
      async: true,
      success: function (res) {
        const arr = res.tbl[0].r;
        const div = document.querySelector('#colorlib-main-menu .catNav');
        arr.forEach((e) => {
          div.insertAdjacentHTML('beforeend', `<li><a class="cat-click" url='${e.id}'>${e.ad}</a></li>`);
        });
        navigateLinks();
      },
    });
  };

  function navigateLinks() {
    const links = document.querySelectorAll('#colorlib-main-menu .cat-click');
    links.forEach((e) => {
      e.addEventListener('click', (event) => {
        event.preventDefault();
        const url = event.target.getAttribute('url');
        window.history.pushState('', '', `/${url}`);
        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        const param = window.location.pathname.replace('/', '');
        console.log(param);
        buildPage(param);
      });
    });
  }
  function buildPage(param) {
    const page = $('#colorlib-main');
    page.empty();
  }

  return (Object.freeze || Object)({
    init: function init() {},
    load: function () {
      loadNav();
    },
  });
})();
loadNavigation.load();
