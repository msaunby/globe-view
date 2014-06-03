// video.js
// A hack of globe.js
var container, stats;
var image,imageContext;
var camera, scene, renderer;
var group;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var clip_w = 1920;
var clip_h = 1080;

init();
animate();

function init() {
    
    container = document.getElementById( 'globediv' );
    
    camera = new THREE.PerspectiveCamera( 60, 1, 1, 10000 );
    camera.position.z = 3000;

    scene = new THREE.Scene();
    
    
    // Video earth             
    image = document.createElement( 'canvas' );
    image.width = clip_w;
    image.height = clip_h;
    imageContext = image.getContext('2d');
    video = document.getElementById( 'video' );
    group = new THREE.Object3D();
    scene.add( group );
    
       
    var geometry = new THREE.SphereGeometry( 1000, 30, 30 );
    texture = new THREE.Texture( image );
    var material = new THREE.MeshBasicMaterial( {  map: texture, overdraw: 0.5 } );
    var mesh = new THREE.Mesh( geometry, material );
    group.add( mesh );
    
    


    renderer = new THREE.CanvasRenderer();
    //renderer.setSize( width, height );
    // height() will be zero, so use container width() and make it square - which works nicely.
    renderer.setSize( jQuery(container).width(), jQuery(container).width() );
    container.appendChild( renderer.domElement );
    
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    

    
    window.addEventListener( 'resize', onWindowResize, false );

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
    
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    
}

function onDocumentMouseMove( event ) {
    
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );
    
}

//

function animate() {
    
    requestAnimationFrame( animate );
    
    render();

}

function render() {

    group.rotation.x = mouseY * 0.01;
    group.rotation.y = mouseX * 0.01;

    if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

	imageContext.drawImage( video, 0, 0 );

	if ( texture ) texture.needsUpdate = true;
    }


    renderer.render( scene, camera );
    
}

