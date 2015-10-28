# test data
#curl 'http://neowms.sci.gsfc.nasa.gov/wms/wms?version=1.3.0&service=WMS&request=GetCapabilities' >capabilities.xml
curl 'http://neowms.sci.gsfc.nasa.gov/wms/wms?version=1.3.0&service=WMS&request=GetMap&layers=MOD13A2_M_NDVI&styles=rgb&crs=CRS:84&bbox=-180,-90,180,90&width=1024&height=512&format=image/png&transparent=true&bgcolor=0xFF0000&time=2015-09-01' >layer_n.png

curl 'http://neowms.sci.gsfc.nasa.gov/wms/wms?version=1.3.0&service=WMS&request=GetMap&layers=BlueMarbleNG-TB&styles=rgb&crs=CRS:84&bbox=-180,-90,180,90&width=2048&height=1024&format=image/png' >bluemarbleng.png


# 'http://neowms.sci.gsfc.nasa.gov/wms/wms?version=1.1.1&service=WMS&request=GetMap&layers=BlueMarbleNG-TB&styles=rgb&srs=EPSG:4326&bbox=-180,-90,180,90&width=1024&height=512&format=image/jpeg' >bluemarbleng.jpg
