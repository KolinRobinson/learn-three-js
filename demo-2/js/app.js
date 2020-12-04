// import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'

function main() {
    const canvas = document.querySelector('#demo');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const fov = 75; //Поле зрения в градусах
    const aspect = window.innerWidth / window.innerHeight; // соотношение сторон холста
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 4;

    const scene = new THREE.Scene();

    let allColors = [0xFF00FF, 0xFF8000, 0x00FF00, 0x00FFFF];

    const color = allColors[Math.floor(Math.random() * allColors.length)]; // цвет освещения
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);



    const boxWidth = 1; //ширина
    const boxHeight = 1; //высота
    const boxDepth = 1; // глубина

    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);


    function render(time) {
        time *= 0.001; // конвертировать время в секунды

        cube.rotation.x = time; // в круге 2 пи радиана, поворот при параметре 0.001 происходит за 6.28с
        cube.rotation.y = time;

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();