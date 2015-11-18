/* fetch_data.js
 * @msaunby
 */

var fs = require('fs'),
  http = require('http'),
  request = require('request'),
  xml2js = require('xml2js'),
  util = require('util');

var parser = new xml2js.Parser();

function getCapabilities(wmsUrl, callback){

  request({
    url: wmsUrl,
    qs: {
      version: '1.3.0', service: 'WMS', request: 'GetCapabilities'
    }
  }, function(err, res, body){
          callback(body, wmsUrl);
  });
}

function getPNG(layer, outname){
  request({
    //url: 'https://ogcie.iblsoft.com/ncep/gfs',
    url: 'http://wms-wetoffice.rhcloud.com/iblgfs',
    encoding: null,  // returns body as binary buffer rather than string
    qs: {
      layers: layer,
      version:'1.3.0', service:'WMS', request:'GetMap',
      //styles: 'default',
      crs: 'CRS:84',
      bbox: '-180,-90,180,90',
      width: '2048',
      height: '1024',
      format: 'image/png'
      }
    },
    function(err, res, body){
      var wstream = fs.createWriteStream(outname);
      wstream.write(body);
      wstream.end();
    }
  );
}

function parseCapabilities(data, wmsUrl){
  var menu = [];
  parser.parseString(data, function (err, result) {
      //console.log(util.inspect(result, false, null));
      var allcap = result.WMS_Capabilities.Capability[0].Layer[0];
      allcap.Layer.forEach(function(el){
        el.Layer.forEach(function(l){
          menu.push([l.Name[0],l.Title[0]]);
          /*
          if (/NDVI/g.test(l.Name)){
            console.log(util.inspect(l, false, null));
          }
          */
        });
      });
  });
  return ({server:wmsUrl,layers:menu})
}

var wmsUrl = 'https://ogcie.iblsoft.com/ncep/gfs';

getCapabilities(wmsUrl, function(body, wmsUrl){
  menu = parseCapabilities(body, wmsUrl);
  //console.log(JSON.stringify(menu));
  var wstream = fs.createWriteStream('menu_gfs.json');
  wstream.write(JSON.stringify(menu, null, '\t'));
  wstream.end();
});


/*
dates=['2014-10-01','2014-11-01','2014-12-01','2015-01-01',
'2015-02-01','2015-03-01','2015-04-01','2015-05-01','2015-06-01',
'2015-07-01','2015-08-01','2015-09-01'];

dates.forEach(function(d){
  getPNG('MOD13A2_M_NDVI', d, 'MOD13A2_M_NDVI_'+d+'.png');
}
);
*/

getPNG('temperature', 'temperature.png');
getPNG('wind', 'wind.png');
getPNG('wind-streamlines', 'wind-streamlines.png');
getPNG('msl-pressure', 'msl-pressure.png');
