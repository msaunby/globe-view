/**
 * The main handler for drag'n'drop and also for file selection. The XTK scene
 * gets created here and the viewer gets activated. Inspired by
 * http://imgscalr.com - THANKS!!
 */


jQuery(document).ready(function() {


  detect_viewingmode();

  //initBrowserWarning();
  //initDnD();
  //initExamples();

  ren3d = null;
  configurator = function() {

  };

  // from http://stackoverflow.com/a/7826782/1183453
  var args = document.location.search.substring(1).split('&');
  argsParsed = {};
  for (var i=0; i < args.length; i++)
  {
      arg = unescape(args[i]);

      if (arg.length == 0) {
        continue;
      }

      if (arg.indexOf('=') == -1)
      {
          argsParsed[arg.replace(new RegExp('/$'),'').trim()] = true;
      }
      else
      {
          kvp = arg.split('=');
          argsParsed[kvp[0].trim()] = kvp[1].replace(new RegExp('/$'),'').trim();
      }
  }

  // setup logging hotkey
  $(window).keypress(function(e) {
    if (e.charCode == 108) {
      $('#log').show();
      _LOG_ = true;
    }
  });

  if ('14yrold' in argsParsed) {

    load14yrold();

  } else if ('scene' in argsParsed) {

    // we have a scene
    var _scene = document.location.href.split('=');
    _scene.shift(); // remove first part (slicedrop.com?scene)

    _scene = _scene.join('=');

    console.log('Found scene ' + _scene);
    loadScene(_scene);

  } else if ('url' in argsParsed) {

    console.log('Found url ' + argsParsed['url']);

  } else {

    //for (var a in argsParsed) {
    var _url = document.location.search;
    if (_url.length > 1) {
      loadFile(document.location.search.substring(1));
    }
    //}

  }

  function switch_orientation(id) {

    var _width = jQuery(id).width();
    var _height = jQuery(id).height();

    // now convert to percentage
    console.log('old', _width, _height);
    _width = jQuery(id).width() / jQuery(document).width() * 100;
    _height = jQuery(id).height() / jQuery(document).height() * 100;
    console.log('new', _width, _height);
    jQuery(id).height(_width + '%');
    jQuery(id).width(_height + '%');
    jQuery(id).css('position', 'absolute');

  }

  function detect_viewingmode() {

    // portrait or landscape display
    if (jQuery(document).width() < jQuery(document).height()) {

      jQuery(document.body).removeClass('landscape');
      jQuery(document.body).addClass('portrait');

    } else {

      jQuery(document.body).removeClass('portrait');
      jQuery(document.body).addClass('landscape');

    }

  }

  // add a handler for viewing mode detecting
  jQuery(window).resize(detect_viewingmode);

});
