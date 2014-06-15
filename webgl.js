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
    
    
    jQuery('#xsliderA').on('slide', function(event, ui){ longitudeA = ui.value;} );
    jQuery('#ysliderA').on('slide', function(event, ui){ latitudeA = ui.value;} );
    jQuery('#zslider').on('slide', function(event, ui){ zoom = ui.value;} );
}

function start_play() {
    
    // Video earth             
    image = document.createElement( 'canvas' );
    image.width = clip_w;
    image.height = clip_h;
    imageContext = image.getContext('2d');
    video = document.getElementById( 'video' );
    group = new THREE.Object3D();
    scene.add( group );
    
       
    var geometry = new THREE.SphereGeometry( 800, 40, 40 );
    texture = new THREE.Texture( image );

    var material = new THREE.MeshBasicMaterial( {  map: texture, overdraw: 1.0 } );
    var mesh = new THREE.Mesh( geometry, material );
    group.add( mesh );

    renderer = new THREE.CanvasRenderer();
    //renderer = new THREE.WebGLRenderer();
    // Must now call renderer.setSize( width, height );
    // container height will likely be zero, so use container width() and make it square - which works nicely.
    renderer.setSize( jQuery(container).width(), jQuery(container).width() );
    container.appendChild( renderer.domElement );

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

