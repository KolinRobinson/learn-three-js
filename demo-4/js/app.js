// import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'

function main() {
    const canvas = document.querySelector('#demo');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 40; //Поле зрения в градусах
    const aspect = 2; // соотношение сторон холста
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;

    const scene = new THREE.Scene();


    const color = 0xFFFFFF; // цвет освещения
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const objects = [];
    const spread = 15;

    function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;

        scene.add(obj);
        objects.push(obj);
    }

    function createMaterial() {
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide, // нужно чтобы отрисовывались обе грани фигуры
        });

        const hue = Math.random();
        const saturation = 1;
        const luminance = .5;
        material.color.setHSL(hue, saturation, luminance);

        return material;
    }

    function addSolidGeometry(x, y, geometry) {
        const mesh = new THREE.Mesh(geometry, createMaterial());
        addObject(x, y, mesh);
    }

    {
        const width = 8;
        const height = 8;
        const depth = 8;
        addSolidGeometry(-2, -2, new THREE.BoxBufferGeometry(width, height, depth));
    } {
        const radius = 4.5;
        const tube = 2.5;
        const radialSegments = 7;
        const tubularSegments = 68;
        const p = 6;
        const q = 3;
        addSolidGeometry(-1, -2, new THREE.TorusKnotBufferGeometry(radius, tube, tubularSegments, radialSegments, p, q));
    } {
        const loader = new THREE.FontLoader();
        loader.load('../../demo-1/js/Pioneer_10_Regular.json', (font) => {
            const geometry = new THREE.TextBufferGeometry('Taras Senko', {
                font: font,
                size: 3.0,
                height: .2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.15,
                bevelSize: .3,
                bevelSegments: 5,
            });
            const mesh = new THREE.Mesh(geometry, createMaterial());
            geometry.computeBoundingBox();
            geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);

            const parent = new THREE.Object3D();
            parent.add(mesh);

            addObject(0, 0, parent);
        });
    } {
        const radius = 5;
        const widthSegments = 6;
        const heightSegments = 4;
        addSolidGeometry(1, 0, new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments));
    } {
        const radius = 7;
        const widthSegments = 12;
        const heightSegments = 8;
        addSolidGeometry(2, 0, new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments));
    } {
        const radius = 7;
        const widthSegments = 200;
        const heightSegments = 200;
        addSolidGeometry(3, 0, new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments));
    } {
        const radius = 7;
        const widthSegments = 500;
        const heightSegments = 500;
        addSolidGeometry(4, 0, new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments));
    }


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

        objects.forEach((obj, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            obj.rotation.x = rot;
            obj.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();