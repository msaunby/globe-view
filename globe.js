// globe.js
// Should try and simplify this further.
var container, stats;
var camera, scene, renderer;
var group;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    
    container = document.getElementById( 'globediv' );
    
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();
    
    
    // earth
    group = new THREE.Object3D();
    scene.add( group );
    
    var loader = new THREE.TextureLoader();
    loader.load( 'textures/world2d.png', function ( texture ) {
	    
	    var geometry = new THREE.SphereGeometry( 200, 20, 20 );
	    
	    var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
	    var mesh = new THREE.Mesh( geometry, material );
	    mesh.position.y = 190;
	    group.add( mesh );
	    
	} );
    
    
    renderer = new THREE.CanvasRenderer();
    //renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setSize( $(container).width(), $(container).height() );
    container.appendChild( renderer.domElement );
    
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    
    //
    
    window.addEventListener( 'resize', onWindowResize, false );

}

function newGlobe(image) {

    scene.remove(group);
    
    group = new THREE.Object3D();
    scene.add( group );

    var loader = new THREE.TextureLoader();
    loader.load( image, function ( texture ) {

            var geometry = new THREE.SphereGeometry( 200, 20, 20 );

            var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
            var mesh = new THREE.Mesh( geometry, material );
            //mesh.position.y = 190;
            group.add( mesh );

        } );
}

function onWindowResize() {
    
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    
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

    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    camera.lookAt( scene.position );
    
    group.rotation.y -= 0.005;

    renderer.render( scene, camera );
    
}

