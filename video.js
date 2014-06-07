// video.js
// A hack of globe.js
var container, stats;
var image,imageContext;
var camera, scene, renderer;
var group;
//var mouseX = 0, mouseY = 0;
var longitudeA = 0, latitudeA = 0;
var zoom = 0;
var texture, texture2;
var cameraZ = 2000;

init();
animate();

function init() {
    
    container = document.getElementById( 'globediv' );
    
    camera = new THREE.PerspectiveCamera( 60, 1, 1, 10000 );
    camera.position.z = cameraZ;

    scene = new THREE.Scene();
    
    
    // Video earth             
    image = document.createElement( 'canvas' );
    image.width = clip_w;
    image.height = clip_h;
    imageContext = image.getContext('2d');
    video = document.getElementById( 'video' );
    group = new THREE.Object3D();
    scene.add( group );
    
       
    var geometry = new THREE.SphereGeometry( 800, 40, 40 );
    //var geometry2 = new THREE.SphereGeometry( 1010, 30, 30 );
    texture = new THREE.Texture( image );
    //texture.offset.set(0.5,0);
    //texture.repeat.set(0.5,1);
    //texture2 = new THREE.Texture( image );
    //texture2.offset.set(0,0);
    //texture2.repeat.set(0.5,1);

    var material = new THREE.MeshBasicMaterial( {  map: texture, overdraw: 1.0 } );
    //var material2 = new THREE.MeshBasicMaterial( {  map: texture2, overdraw: 1.0 } );
    //material2.transparent = true;
    //material2.opacity = 0.5;
    var mesh = new THREE.Mesh( geometry, material );
    //var mesh2 = new THREE.Mesh( geometry2, material2 );
    group.add( mesh );
    //group.add( mesh2 );
    


    renderer = new THREE.CanvasRenderer();
    // Must now call renderer.setSize( width, height );
    // container height will likely be zero, so use container width() and make it square - which works nicely.
    renderer.setSize( jQuery(container).width(), jQuery(container).width() );
    container.appendChild( renderer.domElement );
    
    
    //document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    //window.addEventListener( 'resize', onWindowResize, false );

    jQuery('#xsliderA').on('slide', function(event, ui){ longitudeA = ui.value;} );
    jQuery('#ysliderA').on('slide', function(event, ui){ latitudeA = ui.value;} );
    jQuery('#zslider').on('slide', function(event, ui){ zoom = ui.value;} );
}

function newGlobe(image) {

    scene.remove(group);
    
    group = new THREE.Object3D();
    scene.add( group );

    var loader = new THREE.TextureLoader();
    loader.load( image, function ( texture ) {

            var geometry = new THREE.SphereGeometry( 400, 20, 20 );
            var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
            var mesh = new THREE.Mesh( geometry, material );
            //mesh.position.y = 190;
            group.add( mesh );

        } );
}

function onWindowResize() {
    
    //camera.aspect = 1;
    //camera.updateProjectionMatrix();
    
}

//

function animate() {
    
    requestAnimationFrame( animate );
    
    render();

}

function render() {

    group.rotation.x = 3.14/180.0 * latitudeA;
    group.rotation.y = 3.14/180.0 * (longitudeA - 90.0);
    camera.position.z = cameraZ - (zoom * 10);

    if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

	imageContext.drawImage( video, 0, 0 );

	if ( texture ) texture.needsUpdate = true;
	if ( texture2 ) texture2.needsUpdate = true;
    }


    renderer.render( scene, camera );
    
}

