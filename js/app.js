const scene = new THREE.Scene();
const camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 5;

let onRenderFcts= [];

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 40, -40, 10 );
scene.add(spotLight );


// const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
// const cubeMaterial = new THREE.MeshLambertMaterial(
//     {color: 0xFF0080});
// const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
// cube.position.x = 10;
// cube.position.y = 4;
// cube.position.z = 2;
//
// scene.add( cube );
//
//
//
//
// const sphereGeometry = new THREE.BoxGeometry(10,10,10);
// const sphereMaterial = new THREE.MeshLambertMaterial(
//     {color: 0x7777ff});
// const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
// sphere.position.x = 20;
// sphere.position.y = 4;
// sphere.position.z = 2;
// scene.add(sphere);
//
// camera.position.x = -7;
// camera.position.y = -4;
// camera.position.z = -4;
// camera.lookAt(scene.position);
//
// function animate() {
//         requestAnimationFrame( animate );
//
//         cube.rotation.x += 0.02;
//         cube.rotation.y += 0.02;
//         cube.rotation.z += 0.02;
//
//         sphere.rotation.x += 0.02;
//         sphere.rotation.y += 0.02;
//
//         renderer.render( scene, camera );
// }
// animate();

// const material = new THREE.MeshPhongMaterial({
//         color: 0xFF0080
// });
// const textGeom = new THREE.TextGeometry( 'From 0 To 1', {
//         font: 'pioneer10' // Must be lowercase!
// });
// const textMesh = new THREE.Mesh( textGeom, material );
//
// scene.add( textMesh );
//
// // Do some optional calculations. This is only if you need to get the
// // width of the generated text
// textGeom.computeBoundingBox();
// textGeom.textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

const loader = new THREE.FontLoader();

loader.load( 'js/Pioneer_10_Regular.json', function ( font ) {

        const textGeo = new THREE.TextGeometry( "Первая Демка", {

                font: font,

                size        : 1,
                height      : 0.4,


        } );

        textGeo.computeBoundingBox();
        const center	= new THREE.Vector3();
        center.x	= (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x) / 2
        // center.y	= (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 2
        center.z	= (textGeo.boundingBox.max.z - textGeo.boundingBox.min.z) / 2
        textGeo.vertices.forEach(function(vertex){
                vertex.sub(center)
        })

        const textMaterial = new THREE.MeshPhongMaterial( { color: 0xFF0080 } );

        const mesh = new THREE.Mesh( textGeo, textMaterial );
        mesh.position.set( 0, -0.5, -9);

        scene.add( mesh );

} );

const mouse	= {x : 0, y : 0}
document.addEventListener('mousemove', function(event){
        mouse.x	= (event.clientX / window.innerWidth ) - 0.5
        mouse.y	= (event.clientY / window.innerHeight) - 0.3
}, false)
onRenderFcts.push(function(delta, now){
        camera.position.x += (mouse.x*5 - camera.position.x) * (delta*3)
        camera.position.y += (mouse.y*5 - camera.position.y) * (delta*3)
        camera.lookAt( scene.position )
})

onRenderFcts.push(function(){
        renderer.render( scene, camera );
})

var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
        // keep looping
        requestAnimationFrame( animate );
        // measure time
        lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
        var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec	= nowMsec
        // call each update function
        onRenderFcts.forEach(function(onRenderFct){
                onRenderFct(deltaMsec/1000, nowMsec/1000)
        })
})

// function animate() {
//         requestAnimationFrame( animate );
//
//
//
//         renderer.render( scene, camera );
// }
// animate();