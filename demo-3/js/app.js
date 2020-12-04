// import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'

function main() {
    const canvas = document.querySelector('#demo');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75; //Поле зрения в градусах
    const aspect = 2; // соотношение сторон холста
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 4;

    const scene = new THREE.Scene();

    let allColors = [0xFF00FF, 0xFF8000, 0x00FF00, 0x00FFFF, 0x0080FF, 0xFF0000, 0x0000FF];

    const color = allColors[Math.floor(Math.random() * allColors.length)]; // цвет освещения
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);



    const boxWidth = 1; //ширина
    const boxHeight = 1; //высота
    const boxDepth = 1; // глубина

    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, allColors[Math.floor(Math.random() * allColors.length)], 0),
        makeInstance(geometry, allColors[Math.floor(Math.random() * allColors.length)], -3),
        makeInstance(geometry, allColors[Math.floor(Math.random() * allColors.length)], 3),
    ];

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement; // получаем отрендеренный элемент
        const pixelRatio = window.devicePixelRatio; //получаем количество точек на 1 пс
        const width = canvas.clientWidth * pixelRatio | 0; // его ширину
        const height = canvas.clientHeight * pixelRatio | 0; // высоту
        const needResize = canvas.width !== width || canvas.height !== height; //проверяем или они совпадают
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }



    function render(time) {
        time *= 0.001; // конвертировать время в секунды

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();