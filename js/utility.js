var Utility = {
  convertDate: function (d, seperator) {
    var st = '';
    var sep = seperator ? seperator : global_var.data_eliminator;
    try {
      st = d.substring(4, 6) + sep + d.substring(6, 8) + sep + d.substring(0, 4);
    } catch (e) {}
    return st;
  },
  convertTime: function (d, seperator) {
    var st = '';
    var sep = seperator ? seperator : global_var.time_eliminator;
    try {
      st = d.substring(0, 2) + sep + d.substring(2, 4);
    } catch (e) {}
    return st;
  },
  convertDTpicker: function (d, seperator, type) {
    var st = '';
    var sep = seperator ? seperator : global_var.data_eliminator;
    try {
      if (type && type === 'mm/dd/yy') {
        st = d.substring(4, 6) + sep + d.substring(6, 8) + sep + d.substring(0, 4);
      } else {
        st = d.substring(0, 4) + sep + d.substring(4, 6) + sep + d.substring(6, 8);
      }
    } catch (e) {}
    return st;
  },
  convertTMpicker: function (d, seperator) {
    var st = '';
    var sep = seperator ? seperator : global_var.time_eliminator;
    try {
      st = d.substring(0, 2) + sep + d.substring(2, 4);
    } catch (e) {}
    return st;
  },
  focus: function (id) {
    setTimeout(function () {
      $('#' + id).focus();
    }, 600);
  },
  addParamToUrl: function (param, value) {
    var newurl = Utility.replaceUrlParam(document.location.href, param, value);
    window.history.pushState({ path: newurl }, '', newurl);
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
    var parts = document.location.href.split('?');
    var params = parts[parts.length - 1];
    var pairs = params.split('&');
    var res = '';
    for (var i = 0; i < pairs.length; i++) {
      var k = pairs[i].split('=')[0];
      var v = pairs[i].split('=')[1];
      if (k === param) {
        res = v;
        break;
      }
    }
    return res.replace('#', '');
  },
  setParamOnLoad: function () {
    var parts = document.location.href.split('?');
    var params = parts[parts.length - 1];
    var pairs = params.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var k = pairs[i].split('=')[0];
      var v = pairs[i].split('=')[1];
      try {
        v = v.replace(/#/g, '');
      } catch (ee) {}
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
  setActionId: function () {
    var parts = document.location.href.split('?');
    var params = parts[parts.length - 1];
    var pairs = params.split('#');
    pairsid = pairs[pairs.length - 1];
    return pairsid;
  },
  getEllipsis: function (command, characters) {
    for (var i = command.length; i >= 0; i--) {
      if (command.substring(0, i).length < characters) {
        if (i < command.length) {
          command = command.substring(0, i) + '...';
        }
        return command;
      }
    }
  },
  getRemoveHTMLTags: function (intext) {
    var html = intext;
    var div = document.createElement('div');
    div.innerHTML = html;
    var intext = div.textContent || div.innerText || '';
    return intext;
  },
};
