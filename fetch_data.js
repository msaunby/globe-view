/* fetch_data.js
 * @msaunby
 */

var fs = require('fs'),
  http = require('http'),
  request = require('request'),
  xml2js = require('xml2js'),
  util = require('util');

var parser = new xml2js.Parser();

function getCapabilities(callback){
  return http.get({
    host: 'neowms.sci.gsfc.nasa.gov',
    path: '/wms/wms?version=1.3.0&service=WMS&request=GetCapabilities'
  }, function(res){
    var body = '';
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {
          callback(body);
        });
  });
}

function getPNG(layer, time, outname){
  request({
    url: 'http://neowms.sci.gsfc.nasa.gov/wms/wms',
    encoding: null,  // returns body as binary buffer rather than string
    qs: {
      layers: layer,
      time: time,
      version:'1.3.0', service:'WMS', request:'GetMap',
      styles: 'rgb',
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

function parseCapabilities(data){
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
  return menu;
}

function fromFile(){
 fs.readFile(__dirname + '/capabilities.xml', function(err, data) {
     parseCapabilities(data);
 });
}


getCapabilities(function(body){
  menu = parseCapabilities(body);
  //console.log(JSON.stringify(menu));
  var wstream = fs.createWriteStream('menu.json');
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
