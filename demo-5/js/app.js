import { GUI } from './dat.gui.module.js';


function main() {
    const canvas = document.querySelector('#demo');
    const renderer = new THREE.WebGLRenderer({ canvas });
    const gui = new GUI();

    const fov = 40; //Поле зрения в градусах
    const aspect = 2; // соотношение сторон холста
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 100, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();


    // const color = 0xFFFFFF; // цвет освещения
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(-1, 2, 4);
    // scene.add(light);

    const objects = [];

    //точечный источник света

    {
        const color = 0xFFFFE0;
        const intensity = 1;
        const light = new THREE.PointLight(color, intensity);
        scene.add(light);
    }

    // узел связи солнца и планет

    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);




    // использовать только одну сферу для всего
    const radius = 1;
    const widthSegments = 35;
    const heightSegments = 35;
    const sphereGeometry = new THREE.SphereBufferGeometry(
        radius, widthSegments, heightSegments);


    //солнце
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5); // сделать солнце большим
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    const mercuryOrbit = new THREE.Object3D();
    mercuryOrbit.position.x = 6;
    solarSystem.add(mercuryOrbit);
    objects.push(mercuryOrbit);

    const mercuryMaterial = new THREE.MeshPhongMaterial({ color: 0x999999, emissive: 0x626262 });
    const mercuryMesh = new THREE.Mesh(sphereGeometry, mercuryMaterial);
    mercuryMesh.scale.set(.5, .5, .5);
    mercuryMesh.speed = 47.87;
    mercuryOrbit.add(mercuryMesh);
    objects.push(mercuryMesh);

    const venusOrbit = new THREE.Object3D();
    venusOrbit.position.x = 8;
    solarSystem.add(venusOrbit);
    objects.push(venusOrbit);

    const venusMaterial = new THREE.MeshPhongMaterial({ color: 0xFFE2B7, emissive: 0xFFEDD1 });
    const venusMesh = new THREE.Mesh(sphereGeometry, venusMaterial);
    venusMesh.speed = 35.02;
    venusOrbit.add(venusMesh);
    objects.push(venusMesh);

    //узел связи планеты и спутника

    const earthOrbit = new THREE.Object3D();
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);


    //Землюшка родная
    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233FF, emissive: 0x112244 });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthMesh.speed = 7.89;
    earthOrbit.add(earthMesh);
    objects.push(earthMesh);

    //это луна
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 1.5;
    earthOrbit.add(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(.25, .25, .25);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);


    const marsOrbit = new THREE.Object3D();
    marsOrbit.position.x = 14;
    solarSystem.add(marsOrbit);
    objects.push(marsOrbit);

    const marsMaterial = new THREE.MeshPhongMaterial({ color: 0xD63333, emissive: 0xAB2929 });
    const marsMesh = new THREE.Mesh(sphereGeometry, marsMaterial);
    marsMesh.scale.set(.5, .5, .5);
    marsMesh.speed = 24.13;
    marsOrbit.add(marsMesh);
    objects.push(marsMesh);

    const jupiterOrbit = new THREE.Object3D();
    jupiterOrbit.position.x = 18;
    solarSystem.add(jupiterOrbit);
    objects.push(jupiterOrbit);

    const jupiterMaterial = new THREE.MeshPhongMaterial({ color: 0x906233, emissive: 0xC6AE97 });
    const jupiterMesh = new THREE.Mesh(sphereGeometry, jupiterMaterial);
    jupiterMesh.scale.set(2.5, 2.5, 2.5);
    jupiterMesh.speed = 13.07;
    jupiterOrbit.add(jupiterMesh);
    objects.push(jupiterMesh);

    const saturnOrbit = new THREE.Object3D();
    saturnOrbit.position.x = 23.5;
    solarSystem.add(saturnOrbit);
    objects.push(saturnOrbit);

    const saturnMaterial = new THREE.MeshPhongMaterial({ color: 0xE7DDD5, emissive: 0xF5F1ED });
    const saturnMesh = new THREE.Mesh(sphereGeometry, saturnMaterial);
    saturnMesh.scale.set(1.75, 1.75, 1.75);
    saturnMesh.speed = 9.69;
    saturnOrbit.add(saturnMesh);
    objects.push(saturnMesh);

    const uranusOrbit = new THREE.Object3D();
    uranusOrbit.position.x = 27.5;
    solarSystem.add(uranusOrbit);
    objects.push(uranusOrbit);

    const uranusMaterial = new THREE.MeshPhongMaterial({ color: 0xCCCCCC, emissive: 0xDEDEDE });
    const uranusMesh = new THREE.Mesh(sphereGeometry, uranusMaterial);
    uranusMesh.scale.set(1.35, 1.35, 1.35);
    uranusMesh.speed = 6.81;
    uranusOrbit.add(uranusMesh);
    objects.push(uranusMesh);

    const neptuneOrbit = new THREE.Object3D();
    neptuneOrbit.position.x = 31;
    solarSystem.add(neptuneOrbit);
    objects.push(neptuneOrbit);

    const neptuneMaterial = new THREE.MeshPhongMaterial({ color: 0x2121DD, emissive: 0x4D4DE4 });
    const neptuneMesh = new THREE.Mesh(sphereGeometry, neptuneMaterial);
    neptuneMesh.scale.set(1.35, 1.35, 1.35);
    neptuneMesh.speed = 5.43;
    neptuneOrbit.add(neptuneMesh);
    objects.push(neptuneMesh);





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

    class AxisGridHelper {
        constructor(node, units = 10) {
            const axes = new THREE.AxesHelper();
            axes.material.depthTest = false;
            axes.renderOrder = 2; // после сетки
            node.add(axes);

            const grid = new THREE.GridHelper(units, units);
            grid.material.depthTest = false;
            grid.renderOrder = 1;
            node.add(grid);

            this.grid = grid;
            this.axes = axes;
            this.visible = false;
        }
        get visible() {
            return this._visible;
        }
        set visible(v) {
            this._visible = v;
            this.grid.visible = v;
            this.axes.visible = v;
        }
    }

    function makeAxisGrid(node, label, units) {
        const helper = new AxisGridHelper(node, units);
        gui.add(helper, 'visible').name(label);
    }

    makeAxisGrid(solarSystem, 'solarSystem', 25);
    makeAxisGrid(sunMesh, 'sunMesh');
    makeAxisGrid(earthOrbit, 'earthOrbit');
    makeAxisGrid(earthMesh, 'earthMesh');
    makeAxisGrid(mercuryMesh, 'mercuryMesh');
    makeAxisGrid(venusMesh, 'venusMesh');
    makeAxisGrid(marsMesh, 'marsMesh');
    makeAxisGrid(jupiterMesh, 'jupiterMesh');
    makeAxisGrid(saturnMesh, 'saturnMesh');
    makeAxisGrid(uranusMesh, 'uranusMesh');
    makeAxisGrid(neptuneMesh, 'neptuneMesh');
    console.log(objects)

    let t = 0;

    function render(time) {
        time *= 0.001; // конвертировать время в секунды

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        mercuryMesh.position.z = Math.sin(t * (mercuryMesh.speed / 20)) * mercuryOrbit.position.x;
        mercuryMesh.position.x = Math.cos(t * (mercuryMesh.speed / 20)) * mercuryOrbit.position.x - mercuryOrbit.position.x;
        mercuryMesh.rotation.y = time * mercuryMesh.speed;

        venusMesh.position.z = Math.sin(t * (venusMesh.speed / 20)) * venusOrbit.position.x;
        venusMesh.position.x = Math.cos(t * (venusMesh.speed / 20)) * venusOrbit.position.x - venusOrbit.position.x;
        venusMesh.rotation.y = time * venusMesh.speed;

        earthOrbit.position.z = Math.sin(t * (earthMesh.speed / 20)) * 11.5;
        earthOrbit.position.x = Math.cos(t * (earthMesh.speed / 20)) * 11.5;
        earthOrbit.rotation.y = 8 * time;

        marsMesh.position.z = Math.sin(t * (marsMesh.speed / 20)) * marsOrbit.position.x;
        marsMesh.position.x = Math.cos(t * (marsMesh.speed / 20)) * marsOrbit.position.x - marsOrbit.position.x;
        marsMesh.rotation.y = time * marsMesh.speed;

        jupiterMesh.position.z = Math.sin(t * (jupiterMesh.speed / 20)) * jupiterOrbit.position.x;
        jupiterMesh.position.x = Math.cos(t * (jupiterMesh.speed / 20)) * jupiterOrbit.position.x - jupiterOrbit.position.x;
        jupiterMesh.rotation.y = time * jupiterMesh.speed;

        saturnMesh.position.z = Math.sin(t * (saturnMesh.speed / 20)) * saturnOrbit.position.x;
        saturnMesh.position.x = Math.cos(t * (saturnMesh.speed / 20)) * saturnOrbit.position.x - saturnOrbit.position.x;
        saturnMesh.rotation.y = time * saturnMesh.speed;


        uranusMesh.position.z = Math.sin(t * (uranusMesh.speed / 20)) * uranusOrbit.position.x;
        uranusMesh.position.x = Math.cos(t * (uranusMesh.speed / 20)) * uranusOrbit.position.x - uranusOrbit.position.x;
        uranusMesh.rotation.y = time * uranusMesh.speed;

        neptuneMesh.position.z = Math.sin(t * (neptuneMesh.speed / 20)) * neptuneOrbit.position.x;
        neptuneMesh.position.x = Math.cos(t * (neptuneMesh.speed / 20)) * neptuneOrbit.position.x - neptuneOrbit.position.x;
        neptuneMesh.rotation.y = time * neptuneMesh.speed;

        t += Math.PI / 180 * 2;





        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();