let renderer;
let scene;
let camera;

let angle = 0.0;
let lastTime = 0.0;

let controls;
let bicycle;
let SIZE = 200;

let currentlyPressedKeys = {};

import * as THREE from '../../lib/three/build/three.module.js';
import { TrackballControls } from '../../lib/three/examples/jsm/controls/TrackballControls.js';

export function main()
{
    let mycanvas = document.getElementById('webgl');

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({canvas:mycanvas, antialias:true});
    renderer.setClearColor(0xBFD104, 0xff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 130;
    camera.position.y = 200;
    camera.position.z = 130;
    camera.up = new THREE.Vector3(0, 1, 0);
    let target = new THREE.Vector3(0.0, 0.0, 0.0);
    camera.lookAt(target);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set( 0, 400, 0 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.camera.near = 200;
    spotLight.shadow.camera.far = 410;
    scene.add(spotLight);

    let shadowCamera = new THREE.CameraHelper( spotLight.shadow.camera )
    scene.add(shadowCamera);

    let directionalLight = new THREE.DirectionalLight(0x5055ff, 1.0);
    directionalLight.position.set(2, 1, 4);
    scene.add(directionalLight);

    addModels();

    controls = new TrackballControls(camera, renderer.domElement);
    controls.addEventListener( 'change', render);
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keyup', handleKeyUp, false);
    document.addEventListener('keydown', handleKeyDown, false);
}

function handleKeyUp(event)
{
    currentlyPressedKeys[event.keyCode] = false;
}

function handleKeyDown(event)
{
    currentlyPressedKeys[event.keyCode] = true;
}

function addModels()
{
    let gPlane = new THREE.PlaneGeometry( SIZE*2, SIZE*2 );
    let mPlane = new THREE.MeshLambertMaterial( {color: 0x13afdf, side: THREE.DoubleSide } );
    let meshPlane = new THREE.Mesh( gPlane, mPlane);
    meshPlane.rotation.x = Math.PI / 2;
    meshPlane.receiveShadow = true;	//NB!
    scene.add(meshPlane);
    addBicycleModel();
}


function addBicycleModel()
{
    bicycle = new THREE.Object3D();

    let texturesToLoad = [
        {name: 'gold', url: 'images/gold.jpg'},
    ];
    let loadedTexures={};
    const loader = new THREE.TextureLoader();
    for ( let image of texturesToLoad)
    {
        loader.load(image.url, ( texture ) =>
            {
                loadedTexures[image.name] = texture;
                texturesToLoad.splice( texturesToLoad.indexOf(image), 1);
                if ( !texturesToLoad.length )
                {
                    let mat = new THREE.MeshPhongMaterial({ map: texture });

                    //Første pipe
                    let geoPipe1 = new THREE.CylinderGeometry(0.25, 0.25, 8, 90, 90, false);
                    let meshPipe1 = new THREE.Mesh(geoPipe1, mat);
                    meshPipe1.name = "pipeObj1";
                    meshPipe1.position.x = 6;
                    meshPipe1.position.y = 10;
                    meshPipe1.position.z = 0;
                    meshPipe1.rotation.z = 1.9;
                    bicycle.add(meshPipe1);

                    //Andre pipe
                    let geoPipe2 = new THREE.CylinderGeometry(0.25, 0.25, 7, 90, 90, false);
                    let meshPipe2 = new THREE.Mesh(geoPipe2, mat);
                    meshPipe2.name = "pipeObj2";
                    meshPipe2.position.x = 2.25;
                    meshPipe2.position.y = 7.75;
                    meshPipe2.position.z = 0;
                    meshPipe2.rotation.z = 0.3;
                    bicycle.add(meshPipe2);

                    //Treddje pipe
                    let geoPipe3 = new THREE.CylinderGeometry(0.25, 0.25, 4, 90, 90, false);
                    let meshPipe3 = new THREE.Mesh(geoPipe3, mat);
                    meshPipe3.name = "pipeObj3";
                    meshPipe3.position.x = 10.125;
                    meshPipe3.position.y = 10.6;
                    meshPipe3.position.z = 0;
                    meshPipe3.rotation.z = 0.3;
                    bicycle.add(meshPipe3);

                    //Fjerde pipe
                    let geoPipe4 = new THREE.CylinderGeometry(0.25, 0.25, 9, 90, 90, false);
                    let meshPipe4 = new THREE.Mesh(geoPipe4, mat);
                    meshPipe4.name = "pipeObj4";
                    meshPipe4.position.x = 6.825;
                    meshPipe4.position.y = 7;
                    meshPipe4.position.z = 0;
                    meshPipe4.rotation.z = 2.25;
                    bicycle.add(meshPipe4);

                    //Første mindre pipe bak, nede
                    let geoMiniPipe = new THREE.CylinderGeometry(0.15, 0.15, 5.5, 90, 90, false);
                    let meshMiniPipe = new THREE.Mesh(geoMiniPipe, mat);
                    meshMiniPipe.name = "miniPipeObj";
                    meshMiniPipe.position.x = 0.5;
                    meshMiniPipe.position.y = 3.5;
                    meshMiniPipe.position.z = 0.75;
                    meshMiniPipe.rotation.z = 1.8;
                    meshMiniPipe.rotateX(0.1);
                    bicycle.add(meshMiniPipe);

                    //Andre mindre pipe bak, nede
                    let geoMiniPipe2 = new THREE.CylinderGeometry(0.15, 0.15, 5.75, 90, 90, false);
                    let meshMiniPipe2 = new THREE.Mesh(geoMiniPipe2, mat);
                    meshMiniPipe2.name = "miniPipeObj2";
                    meshMiniPipe2.position.x = 0.75;
                    meshMiniPipe2.position.y = 3.5;
                    meshMiniPipe2.position.z = -0.75;
                    meshMiniPipe2.rotation.z = 1.8;
                    meshMiniPipe2.rotateX(-0.1);
                    bicycle.add(meshMiniPipe2);

                    //Første mindre pipe bak, oppe
                    let geoMiniPipe3 = new THREE.CylinderGeometry(0.15, 0.15, 7, 90, 90, false);
                    let meshMiniPipe3 = new THREE.Mesh(geoMiniPipe3, mat);
                    meshMiniPipe3.name = "miniPipeObj3";
                    meshMiniPipe3.position.x = 0;
                    meshMiniPipe3.position.y = 5.75;
                    meshMiniPipe3.position.z = 0.75;
                    meshMiniPipe3.rotation.z = 2.5;
                    meshMiniPipe3.rotateX(0.1);
                    bicycle.add(meshMiniPipe3);

                    //Andre mindre pipe bak, oppe
                    let geoMiniPipe4 = new THREE.CylinderGeometry(0.15, 0.15, 7, 90, 90, false);
                    let meshMiniPipe4 = new THREE.Mesh(geoMiniPipe4, mat);
                    meshMiniPipe4.name = "miniPipeObj4";
                    meshMiniPipe4.position.x = 0;
                    meshMiniPipe4.position.y = 5.75;
                    meshMiniPipe4.position.z = -0.75;
                    meshMiniPipe4.rotation.z = 2.5;
                    meshMiniPipe4.rotateX(-0.1);
                    bicycle.add(meshMiniPipe4);

                    //Feste, midten nede
                    let geoAttachmentMid = new THREE.CylinderGeometry(0.25, 0.25, 5, 90, 90, false);
                    let meshAttachmentMid = new THREE.Mesh(geoAttachmentMid, mat);
                    meshAttachmentMid.name = "AttachmentObj";
                    meshAttachmentMid.position.x = 3.35;
                    meshAttachmentMid.position.y = 4.25;
                    meshAttachmentMid.position.z = 0;
                    meshAttachmentMid.rotation.x = 1.525;
                    bicycle.add(meshAttachmentMid);

                    //Feste, midten oppe
                    let geoAttachmentMid2 = new THREE.CylinderGeometry(0.25, 0.25, 1.5, 90, 90, false);
                    let meshAttachmentMid2 = new THREE.Mesh(geoAttachmentMid2, mat);
                    meshAttachmentMid2.name = "AttachmentObj2";
                    meshAttachmentMid2.position.x = 2;
                    meshAttachmentMid2.position.y = 8.5;
                    meshAttachmentMid2.position.z = 0;
                    meshAttachmentMid2.rotation.x = 1.525;
                    bicycle.add(meshAttachmentMid2);

                    //Feste, fremme oppe
                    let geoAttachmentFront = new THREE.CylinderGeometry(0.25, 0.25, 1.5, 90, 90, false);
                    let meshAttachmentFront = new THREE.Mesh(geoAttachmentFront, mat);
                    meshAttachmentFront.name = "AttachmentFrontObj";
                    meshAttachmentFront.position.x = 10.71;
                    meshAttachmentFront.position.y = 8.7;
                    meshAttachmentFront.position.z = 0;
                    meshAttachmentFront.rotation.x = 1.525;
                    bicycle.add(meshAttachmentFront);

                    //Feste, Fremme nede
                    let geoAttachmentFront2 = new THREE.CylinderGeometry(0.25, 0.25, 2.5, 90, 90, false);
                    let meshAttachmentFront2 = new THREE.Mesh(geoAttachmentFront2, mat);
                    meshAttachmentFront2.name = "AttachmentFrontObj2";
                    meshAttachmentFront2.position.x = 11.85;
                    meshAttachmentFront2.position.y = 5;
                    meshAttachmentFront2.position.z = 0;
                    meshAttachmentFront2.rotation.x = 1.525;
                    bicycle.add(meshAttachmentFront2);

                    //Feste, bak
                    let geoAttachmentBack = new THREE.CylinderGeometry(0.25, 0.25, 2.5, 90, 90, false);
                    let meshAttachmentBack = new THREE.Mesh(geoAttachmentBack, mat);
                    meshAttachmentBack.name = "AttachmentBackObj";
                    meshAttachmentBack.position.x = -2;
                    meshAttachmentBack.position.y = 2.875;
                    meshAttachmentBack.position.z = 0;
                    meshAttachmentBack.rotation.x = 1.525;
                    bicycle.add(meshAttachmentBack);

                    //Håndtak
                    let geoGrip = new THREE.CylinderGeometry(0.15, 0.15, 5, 90, 90, false);
                    let meshGrip = new THREE.Mesh(geoGrip, mat);
                    meshGrip.name = "gripObj";
                    meshGrip.position.x = 9.5;
                    meshGrip.position.y = 12.5;
                    meshGrip.position.z = 0;
                    meshGrip.rotation.x = 1.525;
                    bicycle.add(meshGrip);

                    //Håndtak grep, høyre
                    let geoGripRight = new THREE.CylinderGeometry(0.2, 0.2, 2, 90, 90, false);
                    let meshGripRight = new THREE.Mesh(geoGripRight, mat);
                    meshGripRight.name = "gripRightObj";
                    meshGripRight.position.x = 9.5;
                    meshGripRight.position.y = 12.55;
                    meshGripRight.position.z = 1.5;
                    meshGripRight.rotation.x = 1.525;
                    bicycle.add(meshGripRight);

                    //Håndtak grep, venstre
                    let geoGripLeft = new THREE.CylinderGeometry(0.2, 0.2, 2, 90, 90, false);
                    let meshGripLeft = new THREE.Mesh(geoGripLeft, mat);
                    meshGripLeft.name = "gripLeftObj";
                    meshGripLeft.position.x = 9.5;
                    meshGripLeft.position.y = 12.45;
                    meshGripLeft.position.z = -1.5;
                    meshGripLeft.rotation.x = 1.525;
                    bicycle.add(meshGripLeft);

                    //Første mindre pipe, fremme
                    let geoMiniPipeFront = new THREE.CylinderGeometry(0.15, 0.15, 4, 90, 90, false);
                    let meshMiniPipeFront = new THREE.Mesh(geoMiniPipeFront, mat);
                    meshMiniPipeFront.name = "miniPipeFrontObj";
                    meshMiniPipeFront.position.x = 11.25;
                    meshMiniPipeFront.position.y = 7;
                    meshMiniPipeFront.position.z = 0.8;
                    meshMiniPipeFront.rotation.z = 0.3;
                    meshMiniPipeFront.rotation.x = -0.1;
                    bicycle.add(meshMiniPipeFront);

                    //Andre mindre pipe, fremme
                    let geoMiniPipeFront2 = new THREE.CylinderGeometry(0.15, 0.15, 4, 90, 90, false);
                    let meshMiniPipeFront2 = new THREE.Mesh(geoMiniPipeFront2, mat);
                    meshMiniPipeFront2.name = "miniPipeFront2Obj";
                    meshMiniPipeFront2.position.x = 11.25;
                    meshMiniPipeFront2.position.y = 6.95;
                    meshMiniPipeFront2.position.z = -0.8;
                    meshMiniPipeFront2.rotation.z = 0.3;
                    meshMiniPipeFront2.rotation.x = 0.1;
                    bicycle.add(meshMiniPipeFront2);

                    //Lykt
                    let geoFrontLight = new THREE.CylinderGeometry(0.1, 0.5, 0.5, 90, 90, false);
                    let meshFrontLight = new THREE.Mesh(geoFrontLight, mat);
                    meshFrontLight.name = "frontLightObj";
                    meshFrontLight.position.x = 10;
                    meshFrontLight.position.y = 12.5;
                    meshFrontLight.position.z = 0;
                    meshFrontLight.rotation.z = 1.9;
                    bicycle.add(meshFrontLight);

                    //Hjul Fremme
                    let geoWheelFront = new THREE.TorusGeometry(3, 0.3, 50, 100)
                    let meshWheelFront = new THREE.Mesh(geoWheelFront, mat);
                    meshWheelFront.name = "frontWheelObj";
                    meshWheelFront.position.x = 12;
                    meshWheelFront.position.y = 5;
                    meshWheelFront.position.z = 0;
                    meshWheelFront.rotation.x = 0;
                    bicycle.add(meshWheelFront);

                    //Hjul felg Fremme
                    let geoWheelFrontRim = new THREE.TorusGeometry(2.7, 0.15, 50, 100)
                    let meshWheelFrontRim = new THREE.Mesh(geoWheelFrontRim, mat);
                    meshWheelFrontRim.name = "frontRimObj";
                    meshWheelFrontRim.position.x = 12;
                    meshWheelFrontRim.position.y = 5;
                    meshWheelFrontRim.position.z = 0;
                    meshWheelFrontRim.rotation.x = 0;
                    bicycle.add(meshWheelFrontRim);

                    //Nav feste, bak fremme
                    let geoHubFront = new THREE.CylinderGeometry(0.35, 0.35, 0.125, 90, 90, false);
                    let meshHubFront = new THREE.Mesh(geoHubFront, mat);
                    meshHubFront.name = "hubObj";
                    meshHubFront.position.x = -2;
                    meshHubFront.position.y = 2.9;
                    meshHubFront.position.z = 0.75;
                    meshHubFront.rotation.x = 1.525;
                    bicycle.add(meshHubFront);

                    //Nav feste, bak bak
                    let geoHubBack = new THREE.CylinderGeometry(0.35, 0.35, 0.125, 90, 90, false);
                    let meshHubBack = new THREE.Mesh(geoHubBack, mat);
                    meshHubBack.name = "hubObj2";
                    meshHubBack.position.x = -2;
                    meshHubBack.position.y = 2.9;
                    meshHubBack.position.z = -0.75;
                    meshHubBack.rotation.x = 1.525;
                    bicycle.add(meshHubBack);

                    //Første eik
                    let geoBackSpoke = new THREE.CylinderGeometry(0.01, 0.01, 3, 90, 90, false);
                    let meshBackSpoke = new THREE.Mesh(geoBackSpoke, mat);
                    meshBackSpoke.name = "WheelObj";
                    meshBackSpoke.position.x = -3;
                    meshBackSpoke.position.y = 4;
                    meshBackSpoke.position.z = 0.4;
                    meshBackSpoke.rotation.z = 0.7;
                    meshBackSpoke.rotation.x = -0.34;
                    bicycle.add(meshBackSpoke);

                    //Andre eik
                    let geoBackSpoke2 = new THREE.CylinderGeometry(0.01, 0.01, 3, 90, 90, false);
                    let meshBackSpoke2 = new THREE.Mesh(geoBackSpoke2, mat);
                    meshBackSpoke2.name = "WheelObj";
                    meshBackSpoke2.position.x = -3;
                    meshBackSpoke2.position.y = 4;
                    meshBackSpoke2.position.z = -0.4;
                    meshBackSpoke2.rotation.z = 0.7;
                    meshBackSpoke2.rotation.x = 0.34;
                    bicycle.add(meshBackSpoke2);

                    //Treddje eik
                    let geoBackSpoke20 = new THREE.CylinderGeometry(0.01, 0.01, 3, 90, 90, false);
                    let meshBackSpoke20 = new THREE.Mesh(geoBackSpoke20, mat);
                    meshBackSpoke20.name = "WheelObj";
                    meshBackSpoke20.position.x = -3.75;
                    meshBackSpoke20.position.y = 3;
                    meshBackSpoke20.position.z = 0.3;
                    meshBackSpoke20.rotateZ(1.5);
                    meshBackSpoke20.rotateX(-0.3);
                    bicycle.add(meshBackSpoke20);

                    //Fjerde eik
                    let geoBackSpoke4 = new THREE.CylinderGeometry(0.01, 0.01, 3, 90, 90, false);
                    let meshBackSpoke4 = new THREE.Mesh(geoBackSpoke4, mat);
                    meshBackSpoke4.name = "WheelObj";
                    meshBackSpoke4.position.x = -3.75;
                    meshBackSpoke4.position.y = 3;
                    meshBackSpoke4.position.z = -0.3;
                    meshBackSpoke4.rotateZ(1.5);
                    meshBackSpoke4.rotateX(0.3);
                    bicycle.add(meshBackSpoke4);

                    //Femte eik
                    let geoBackSpoke5 = new THREE.CylinderGeometry(0.01, 0.01, 2.5, 90, 90, false);
                    let meshBackSpoke5 = new THREE.Mesh(geoBackSpoke5, mat);
                    meshBackSpoke5.name = "WheelObj";
                    meshBackSpoke5.position.x = -3;
                    meshBackSpoke5.position.y = 2;
                    meshBackSpoke5.position.z = 0.4;
                    meshBackSpoke5.rotateZ(2.3);
                    meshBackSpoke5.rotateX(-0.3);
                    bicycle.add(meshBackSpoke5);

                    //Sjette eik
                    let geoBackSpoke6 = new THREE.CylinderGeometry(0.01, 0.01, 2.5, 90, 90, false);
                    let meshBackSpoke6 = new THREE.Mesh(geoBackSpoke6, mat);
                    meshBackSpoke6.name = "WheelObj";
                    meshBackSpoke6.position.x = -3;
                    meshBackSpoke6.position.y = 2;
                    meshBackSpoke6.position.z = -0.4;
                    meshBackSpoke6.rotateZ(2.3);
                    meshBackSpoke6.rotateX(0.3);
                    bicycle.add(meshBackSpoke6);

                    //Sjuende eik
                    let geoBackSpoke7 = new THREE.CylinderGeometry(0.01, 0.01, 2.5, 90, 90, false);
                    let meshBackSpoke7 = new THREE.Mesh(geoBackSpoke7, mat);
                    meshBackSpoke7.name = "WheelObj";
                    meshBackSpoke7.position.x = -2;
                    meshBackSpoke7.position.y = 1.5;
                    meshBackSpoke7.position.z = 0.4;
                    meshBackSpoke7.rotateZ(3.1);
                    meshBackSpoke7.rotateX(-0.3);
                    bicycle.add(meshBackSpoke7);

                    //Åttende eik
                    let geoBackSpoke8 = new THREE.CylinderGeometry(0.01, 0.01, 2.5, 90, 90, false);
                    let meshBackSpoke8 = new THREE.Mesh(geoBackSpoke8, mat);
                    meshBackSpoke8.name = "WheelObj";
                    meshBackSpoke8.position.x = -2;
                    meshBackSpoke8.position.y = 1.5;
                    meshBackSpoke8.position.z = -0.4;
                    meshBackSpoke8.rotateZ(3.1);
                    meshBackSpoke8.rotateX(0.3);
                    bicycle.add(meshBackSpoke8);

                    //Niende eik
                    let geoBackSpoke9 = new THREE.CylinderGeometry(0.01, 0.01, 2.5, 90, 90, false);
                    let meshBackSpoke9 = new THREE.Mesh(geoBackSpoke9, mat);
                    meshBackSpoke9.name = "WheelObj";
                    meshBackSpoke9.position.x = -1;
                    meshBackSpoke9.position.y = 2;
                    meshBackSpoke9.position.z = 0.4;
                    meshBackSpoke9.rotateZ(3.9);
                    meshBackSpoke9.rotateX(-0.3);
                    bicycle.add(meshBackSpoke9);

                    //Tiende eik
                    let geoBackSpoke10 = new THREE.CylinderGeometry(0.01, 0.01, 2.5, 90, 90, false);
                    let meshBackSpoke10 = new THREE.Mesh(geoBackSpoke10, mat);
                    meshBackSpoke10.name = "WheelObj";
                    meshBackSpoke10.position.x = -1;
                    meshBackSpoke10.position.y = 2;
                    meshBackSpoke10.position.z = -0.4;
                    meshBackSpoke10.rotateZ(3.9);
                    meshBackSpoke10.rotateX(0.3);
                    bicycle.add(meshBackSpoke10);

                    //Ellevte eik
                    let geoBackSpoke11 = new THREE.CylinderGeometry(0.01, 0.01, 2.5, 90, 90, false);
                    let meshBackSpoke11 = new THREE.Mesh(geoBackSpoke11, mat);
                    meshBackSpoke11.name = "WheelObj";
                    meshBackSpoke11.position.x = -0.5;
                    meshBackSpoke11.position.y = 3;
                    meshBackSpoke11.position.z = 0.4;
                    meshBackSpoke11.rotateZ(4.8);
                    meshBackSpoke11.rotateX(-0.3);
                    bicycle.add(meshBackSpoke11);

                    //Tålte eik
                    let geoBackSpoke12 = new THREE.CylinderGeometry(0.01, 0.01, 2.5, 90, 90, false);
                    let meshBackSpoke12 = new THREE.Mesh(geoBackSpoke12, mat);
                    meshBackSpoke12.name = "WheelObj";
                    meshBackSpoke12.position.x = -0.5;
                    meshBackSpoke12.position.y = 3;
                    meshBackSpoke12.position.z = -0.4;
                    meshBackSpoke12.rotateZ(4.8);
                    meshBackSpoke12.rotateX(0.3);
                    bicycle.add(meshBackSpoke12);

                    //Trettende eik
                    let geoBackSpoke13 = new THREE.CylinderGeometry(0.01, 0.01, 2.6, 90, 90, false);
                    let meshBackSpoke13 = new THREE.Mesh(geoBackSpoke13, mat);
                    meshBackSpoke13.name = "WheelObj";
                    meshBackSpoke13.position.x = -1;
                    meshBackSpoke13.position.y = 4;
                    meshBackSpoke13.position.z = 0.4;
                    meshBackSpoke13.rotateZ(5.6);
                    meshBackSpoke13.rotateX(-0.3);
                    bicycle.add(meshBackSpoke13);

                    //Fjortende eik
                    let geoBackSpoke14 = new THREE.CylinderGeometry(0.01, 0.01, 2.6, 90, 90, false);
                    let meshBackSpoke14 = new THREE.Mesh(geoBackSpoke14, mat);
                    meshBackSpoke14.name = "WheelObj";
                    meshBackSpoke14.position.x = -1;
                    meshBackSpoke14.position.y = 4;
                    meshBackSpoke14.position.z = -0.4;
                    meshBackSpoke14.rotateZ(5.6);
                    meshBackSpoke14.rotateX(0.3);
                    bicycle.add(meshBackSpoke14);

                    //Femtende eik
                    let geoBackSpoke15 = new THREE.CylinderGeometry(0.01, 0.01, 2.9, 90, 90, false);
                    let meshBackSpoke15 = new THREE.Mesh(geoBackSpoke15, mat);
                    meshBackSpoke15.name = "WheelObj";
                    meshBackSpoke15.position.x = -2.25;
                    meshBackSpoke15.position.y = 4.5;
                    meshBackSpoke15.position.z = 0.35;
                    meshBackSpoke15.rotateZ(6.4);
                    meshBackSpoke15.rotateX(-0.3);
                    bicycle.add(meshBackSpoke15);

                    //Seistende eik
                    let geoBackSpoke16 = new THREE.CylinderGeometry(0.01, 0.01, 2.9, 90, 90, false);
                    let meshBackSpoke16 = new THREE.Mesh(geoBackSpoke16, mat);
                    meshBackSpoke16.name = "WheelObj";
                    meshBackSpoke16.position.x = -2.25;
                    meshBackSpoke16.position.y = 4.5;
                    meshBackSpoke16.position.z = -0.35;
                    meshBackSpoke16.rotateZ(6.4);
                    meshBackSpoke16.rotateX(0.3);
                    bicycle.add(meshBackSpoke16);

                    //Nav feste, fremme fremme
                    let geoHubFront2 = new THREE.CylinderGeometry(0.35, 0.35, 0.125, 90, 90, false);
                    let meshHubFront2 = new THREE.Mesh(geoHubFront2, mat);
                    meshHubFront2.name = "hub2Obj";
                    meshHubFront2.position.x = 11.85;
                    meshHubFront2.position.y = 5.05;
                    meshHubFront2.position.z = 0.75;
                    meshHubFront2.rotation.x = 1.525;
                    bicycle.add(meshHubFront2);

                    //Nav feste, fremme bak
                    let geoHubBack2 = new THREE.CylinderGeometry(0.35, 0.35, 0.125, 90, 90, false);
                    let meshHubBack2 = new THREE.Mesh(geoHubBack2, mat);
                    meshHubBack2.name = "hubBack2Obj";
                    meshHubBack2.position.x = 11.85;
                    meshHubBack2.position.y = 4.95;
                    meshHubBack2.position.z = -0.75;
                    meshHubBack2.rotation.x = 1.525;
                    bicycle.add(meshHubBack2);

                    //Første eik fremme
                    let geoFrontSpoke = new THREE.CylinderGeometry(0.01, 0.01, 2.45, 90, 90, false);
                    let meshFrontSpoke = new THREE.Mesh(geoFrontSpoke, mat);
                    meshFrontSpoke.name = "WheelObj";
                    meshFrontSpoke.position.x = 11;
                    meshFrontSpoke.position.y = 6;
                    meshFrontSpoke.position.z = 0.425;
                    meshFrontSpoke.rotation.z = 0.7;
                    meshFrontSpoke.rotation.x = -0.38;
                    bicycle.add(meshFrontSpoke);

                    //Andre eik fremme
                    let geoFrontSpoke2 = new THREE.CylinderGeometry(0.01, 0.01, 2.45, 90, 90, false);
                    let meshFrontSpoke2 = new THREE.Mesh(geoFrontSpoke2, mat);
                    meshFrontSpoke2.name = "WheelObj";
                    meshFrontSpoke2.position.x = 11;
                    meshFrontSpoke2.position.y = 6;
                    meshFrontSpoke2.position.z = -0.425;
                    meshFrontSpoke2.rotation.z = 0.7;
                    meshFrontSpoke2.rotation.x = 0.38;
                    bicycle.add(meshFrontSpoke2);

                    //Fjerde eik fremme
                    let geoFrontSpoke4 = new THREE.CylinderGeometry(0.01, 0.01, 2.45, 90, 90, false);
                    let meshFrontSpoke4 = new THREE.Mesh(geoFrontSpoke4, mat);
                    meshFrontSpoke4.name = "WheelObj";
                    meshFrontSpoke4.position.x = 10.5;
                    meshFrontSpoke4.position.y = 5;
                    meshFrontSpoke4.position.z = 0.425;
                    meshFrontSpoke4.rotateZ(1.5);
                    meshFrontSpoke4.rotateX(-0.3);
                    bicycle.add(meshFrontSpoke4);

                    //Femte eik fremme
                    let geoFrontSpoke5 = new THREE.CylinderGeometry(0.01, 0.01, 2.45, 90, 90, false);
                    let meshFrontSpoke5 = new THREE.Mesh(geoFrontSpoke5, mat);
                    meshFrontSpoke5.name = "WheelObj";
                    meshFrontSpoke5.position.x = 10.5;
                    meshFrontSpoke5.position.y = 5;
                    meshFrontSpoke5.position.z = -0.425;
                    meshFrontSpoke5.rotateZ(1.5);
                    meshFrontSpoke5.rotateX(0.3);
                    bicycle.add(meshFrontSpoke5);

                    //Sjette eik fremme
                    let geoFrontSpoke6 = new THREE.CylinderGeometry(0.01, 0.01, 2.75, 90, 90, false);
                    let meshFrontSpoke6 = new THREE.Mesh(geoFrontSpoke6, mat);
                    meshFrontSpoke6.name = "WheelObj";
                    meshFrontSpoke6.position.x = 10.75;
                    meshFrontSpoke6.position.y = 4;
                    meshFrontSpoke6.position.z = 0.425;
                    meshFrontSpoke6.rotateZ(2.3);
                    meshFrontSpoke6.rotateX(-0.275);
                    bicycle.add(meshFrontSpoke6);

                    //Sjuende eik fremme
                    let geoFrontSpoke7 = new THREE.CylinderGeometry(0.01, 0.01, 2.75, 90, 90, false);
                    let meshFrontSpoke7 = new THREE.Mesh(geoFrontSpoke7, mat);
                    meshFrontSpoke7.name = "WheelObj";
                    meshFrontSpoke7.position.x = 10.75;
                    meshFrontSpoke7.position.y = 4;
                    meshFrontSpoke7.position.z = -0.425;
                    meshFrontSpoke7.rotateZ(2.3);
                    meshFrontSpoke7.rotateX(0.275);
                    bicycle.add(meshFrontSpoke7);

                    //Åttende eik fremme
                    let geoFrontSpoke8 = new THREE.CylinderGeometry(0.01, 0.01, 2.75, 90, 90, false);
                    let meshFrontSpoke8 = new THREE.Mesh(geoFrontSpoke8, mat);
                    meshFrontSpoke8.name = "WheelObj";
                    meshFrontSpoke8.position.x = 11.85;
                    meshFrontSpoke8.position.y = 3.5;
                    meshFrontSpoke8.position.z = 0.425;
                    meshFrontSpoke8.rotateZ(3.1);
                    meshFrontSpoke8.rotateX(-0.275);
                    bicycle.add(meshFrontSpoke8);

                    //Niende eik fremme
                    let geoFrontSpoke9 = new THREE.CylinderGeometry(0.01, 0.01, 2.75, 90, 90, false);
                    let meshFrontSpoke9 = new THREE.Mesh(geoFrontSpoke9, mat);
                    meshFrontSpoke9.name = "WheelObj";
                    meshFrontSpoke9.position.x = 11.85;
                    meshFrontSpoke9.position.y = 3.5;
                    meshFrontSpoke9.position.z = -0.425;
                    meshFrontSpoke9.rotateZ(3.1);
                    meshFrontSpoke9.rotateX(0.275);
                    bicycle.add(meshFrontSpoke9);

                    //Tiende eik fremme
                    let geoFrontSpoke10 = new THREE.CylinderGeometry(0.01, 0.01, 2.75, 90, 90, false);
                    let meshFrontSpoke10 = new THREE.Mesh(geoFrontSpoke10, mat);
                    meshFrontSpoke10.name = "WheelObj";
                    meshFrontSpoke10.position.x = 13;
                    meshFrontSpoke10.position.y = 4;
                    meshFrontSpoke10.position.z = 0.425;
                    meshFrontSpoke10.rotateZ(3.9);
                    meshFrontSpoke10.rotateX(-0.275);
                    bicycle.add(meshFrontSpoke10);

                    //Ellevte eik fremme
                    let geoFrontSpoke11 = new THREE.CylinderGeometry(0.01, 0.01, 2.75, 90, 90, false);
                    let meshFrontSpoke11 = new THREE.Mesh(geoFrontSpoke11, mat);
                    meshFrontSpoke11.name = "WheelObj";
                    meshFrontSpoke11.position.x = 13;
                    meshFrontSpoke11.position.y = 4;
                    meshFrontSpoke11.position.z = -0.425;
                    meshFrontSpoke11.rotateZ(3.9);
                    meshFrontSpoke11.rotateX(0.275);
                    bicycle.add(meshFrontSpoke11);

                    //Tålte eik fremme
                    let geoFrontSpoke12 = new THREE.CylinderGeometry(0.01, 0.01, 2.75, 90, 90, false);
                    let meshFrontSpoke12 = new THREE.Mesh(geoFrontSpoke12, mat);
                    meshFrontSpoke12.name = "WheelObj";
                    meshFrontSpoke12.position.x = 13.5;
                    meshFrontSpoke12.position.y = 5;
                    meshFrontSpoke12.position.z = 0.425;
                    meshFrontSpoke12.rotateZ(4.7);
                    meshFrontSpoke12.rotateX(-0.275);
                    bicycle.add(meshFrontSpoke12);

                    //Trettende eik fremme
                    let geoFrontSpoke13 = new THREE.CylinderGeometry(0.01, 0.01, 2.75, 90, 90, false);
                    let meshFrontSpoke13 = new THREE.Mesh(geoFrontSpoke13, mat);
                    meshFrontSpoke13.name = "WheelObj";
                    meshFrontSpoke13.position.x = 13.5;
                    meshFrontSpoke13.position.y = 5;
                    meshFrontSpoke13.position.z = -0.425;
                    meshFrontSpoke13.rotateZ(4.7);
                    meshFrontSpoke13.rotateX(0.275);
                    bicycle.add(meshFrontSpoke13);

                    //Fjortende eik fremme
                    let geoFrontSpoke14 = new THREE.CylinderGeometry(0.01, 0.01, 2.95, 90, 90, false);
                    let meshFrontSpoke14 = new THREE.Mesh(geoFrontSpoke14, mat);
                    meshFrontSpoke14.name = "WheelObj";
                    meshFrontSpoke14.position.x = 13;
                    meshFrontSpoke14.position.y = 6;
                    meshFrontSpoke14.position.z = 0.425;
                    meshFrontSpoke14.rotateZ(5.5);
                    meshFrontSpoke14.rotateX(-0.255);
                    bicycle.add(meshFrontSpoke14);

                    //Femtende eik fremme
                    let geoFrontSpoke15 = new THREE.CylinderGeometry(0.01, 0.01, 2.95, 90, 90, false);
                    let meshFrontSpoke15 = new THREE.Mesh(geoFrontSpoke15, mat);
                    meshFrontSpoke15.name = "WheelObj";
                    meshFrontSpoke15.position.x = 13;
                    meshFrontSpoke15.position.y = 6;
                    meshFrontSpoke15.position.z = -0.425;
                    meshFrontSpoke15.rotateZ(5.5);
                    meshFrontSpoke15.rotateX(0.255);
                    bicycle.add(meshFrontSpoke15);

                    //Seistende eik fremme
                    let geoFrontSpoke16 = new THREE.CylinderGeometry(0.01, 0.01, 2.95, 90, 90, false);
                    let meshFrontSpoke16 = new THREE.Mesh(geoFrontSpoke16, mat);
                    meshFrontSpoke16.name = "WheelObj";
                    meshFrontSpoke16.position.x = 12;
                    meshFrontSpoke16.position.y = 6.5;
                    meshFrontSpoke16.position.z = 0.425;
                    meshFrontSpoke16.rotateZ(6.3);
                    meshFrontSpoke16.rotateX(-0.255);
                    bicycle.add(meshFrontSpoke16);

                    //Syttende eik fremme
                    let geoFrontSpoke17 = new THREE.CylinderGeometry(0.01, 0.01, 2.95, 90, 90, false);
                    let meshFrontSpoke17 = new THREE.Mesh(geoFrontSpoke17, mat);
                    meshFrontSpoke17.name = "WheelObj";
                    meshFrontSpoke17.position.x = 12;
                    meshFrontSpoke17.position.y = 6.5;
                    meshFrontSpoke17.position.z = -0.425;
                    meshFrontSpoke17.rotateZ(6.3);
                    meshFrontSpoke17.rotateX(0.255);
                    bicycle.add(meshFrontSpoke17);

                    //Trø feste fremme
                    let geoMiniPipeMiddle = new THREE.CylinderGeometry(0.15, 0.15, 2, 90, 90, false);
                    let meshMiniPipeMiddle = new THREE.Mesh(geoMiniPipeMiddle, mat);
                    meshMiniPipeMiddle.name = "miniPipeMiddleObj";
                    meshMiniPipeMiddle.position.x = 4.25;
                    meshMiniPipeMiddle.position.y = 4.5;
                    meshMiniPipeMiddle.position.z = 2.25;
                    meshMiniPipeMiddle.rotateZ(1.65);
                    bicycle.add(meshMiniPipeMiddle);

                    //Andre trø feste fremme
                    let geoMiniPipeMiddle2 = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 90, 90, false);
                    let meshMiniPipeMiddle2 = new THREE.Mesh(geoMiniPipeMiddle2, mat);
                    meshMiniPipeMiddle2.name = "miniPipeMiddle2Obj";
                    meshMiniPipeMiddle2.position.x = 5;
                    meshMiniPipeMiddle2.position.y = 4.575;
                    meshMiniPipeMiddle2.position.z = 2.9;
                    meshMiniPipeMiddle2.rotateZ(1.65);
                    meshMiniPipeMiddle2.rotateX(1.65);
                    bicycle.add(meshMiniPipeMiddle2);

                    //Trøe fremme
                    let geoFrontJersey = new THREE.BoxGeometry(0.8, 0.25, 1.25, 10, 10)
                    let meshFrontJersey = new THREE.Mesh(geoFrontJersey, mat);
                    meshFrontJersey.name = "jerseyFrontObj";
                    meshFrontJersey.position.x = 5;
                    meshFrontJersey.position.y = 4.575;
                    meshFrontJersey.position.z = 3.5;
                    bicycle.add(meshFrontJersey);

                    //Trø feste bak
                    let geoMiniPipeMiddleBehind = new THREE.CylinderGeometry(0.15, 0.15, 2, 90, 90, false);
                    let meshMiniPipeMiddleBehind = new THREE.Mesh(geoMiniPipeMiddleBehind, mat);
                    meshMiniPipeMiddleBehind.name = "miniPipeMiddle3Obj";
                    meshMiniPipeMiddleBehind.position.x = 2.25;
                    meshMiniPipeMiddleBehind.position.y = 4;
                    meshMiniPipeMiddleBehind.position.z = -2.25;
                    meshMiniPipeMiddleBehind.rotateZ(1.65);
                    bicycle.add(meshMiniPipeMiddleBehind);

                    //Andre trø feste bak
                    let geoMiniPipeMiddleBehind2 = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 90, 90, false);
                    let meshMiniPipeMiddleBehind2 = new THREE.Mesh(geoMiniPipeMiddleBehind2, mat);
                    meshMiniPipeMiddleBehind2.name = "miniPipeMiddle4Obj";
                    meshMiniPipeMiddleBehind2.position.x = 1.5;
                    meshMiniPipeMiddleBehind2.position.y = 3.95;
                    meshMiniPipeMiddleBehind2.position.z = -2.9;
                    meshMiniPipeMiddleBehind2.rotateZ(1.65);
                    meshMiniPipeMiddleBehind2.rotateX(1.65);
                    bicycle.add(meshMiniPipeMiddleBehind2);

                    //Trøe bak
                    let geoBackJersey = new THREE.BoxGeometry(0.8, 0.25, 1.25, 10, 10)
                    let meshBackJersey = new THREE.Mesh(geoBackJersey, mat);
                    meshBackJersey.name = "jerseyBackObj";
                    meshBackJersey.position.x = 1.5;
                    meshBackJersey.position.y = 3.95;
                    meshBackJersey.position.z = -3.5;
                    bicycle.add(meshBackJersey);

                    //Kjede feste
                    let geoCainAttachment = new THREE.CylinderGeometry(1, 1, 0.1, 90, 90, false);
                    let mesChainAttachment = new THREE.Mesh(geoCainAttachment, mat);
                    mesChainAttachment.name = "AttachmentObj";
                    mesChainAttachment.position.x = 3.35;
                    mesChainAttachment.position.y = 4.25;
                    mesChainAttachment.position.z = 0.75;
                    mesChainAttachment.rotation.x = 1.525;
                    bicycle.add(mesChainAttachment);

                    // girball
                    let geoGearBall = new THREE.SphereGeometry(0.21, 32, 32, 0, 10, 0, );
                    let mesGearBall = new THREE.Mesh(geoGearBall, mat);
                    mesGearBall.name = "AttachmentObj";
                    mesGearBall.position.x = 9.55;
                    mesGearBall.position.y = 12.7;
                    mesGearBall.position.z = 1.5;
                    mesGearBall.rotation.x = 1.525;
                    bicycle.add(mesGearBall);

                    // girspake
                    let geoGearHandle = new THREE.CylinderGeometry(0.05, 0.05, 0.75, 90, 90, false);
                    let mesGearHandle = new THREE.Mesh(geoGearHandle, mat);
                    mesGearHandle.name = "AttachmentObj";
                    mesGearHandle.position.x = 9.55;
                    mesGearHandle.position.y = 12.825;
                    mesGearHandle.position.z = 1.75;
                    mesGearHandle.rotation.x = 1.525;
                    bicycle.add(mesGearHandle);

                    // Mellomdel til brems
                    let geoGearHandle2 = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 90, 90, false);
                    let mesGearHandle2 = new THREE.Mesh(geoGearHandle2, mat);
                    mesGearHandle2.name = "AttachmentObj2";
                    mesGearHandle2.position.x = 9.75;
                    mesGearHandle2.position.y = 12.825;
                    mesGearHandle2.position.z = 1.5;
                    mesGearHandle2.rotation.z = 1.525;
                    bicycle.add(mesGearHandle2);

                    // Brems høyre
                    let geoGearHandle3 = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 90, 90, false);
                    let mesGearHandle3 = new THREE.Mesh(geoGearHandle3, mat);
                    mesGearHandle3.name = "AttachmentObj3";
                    mesGearHandle3.position.x = 10;
                    mesGearHandle3.position.y = 12.825;
                    mesGearHandle3.position.z = 1.7;
                    mesGearHandle3.rotation.x = 1.525;
                    bicycle.add(mesGearHandle3);

                    // girball2
                    let geoGearBall2 = new THREE.SphereGeometry(0.21, 32, 32, 0, 10, 0, );
                    let mesGearBall2 = new THREE.Mesh(geoGearBall2, mat);
                    mesGearBall2.name = "AttachmentObj";
                    mesGearBall2.position.x = 9.55;
                    mesGearBall2.position.y = 12.6;
                    mesGearBall2.position.z = -1.5;
                    mesGearBall2.rotation.x = 1.525;
                    bicycle.add(mesGearBall2);

                    // Mellomdel til brems 2
                    let geoGearLeftHandle2 = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 90, 90, false);
                    let mesGearLeftHandle2 = new THREE.Mesh(geoGearLeftHandle2, mat);
                    mesGearLeftHandle2.name = "AttachmentObj2";
                    mesGearLeftHandle2.position.x = 9.75;
                    mesGearLeftHandle2.position.y = 12.675;
                    mesGearLeftHandle2.position.z = -1.5;
                    mesGearLeftHandle2.rotation.z = 1.525;
                    bicycle.add(mesGearLeftHandle2);

                    // Brems høyre
                    let geoGearLeftHandle3 = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 90, 90, false);
                    let meshGearLeftHandle3 = new THREE.Mesh(geoGearLeftHandle3, mat);
                    meshGearLeftHandle3.name = "AttachmentObj3";
                    meshGearLeftHandle3.position.x = 10;
                    meshGearLeftHandle3.position.y = 12.655;
                    meshGearLeftHandle3.position.z = -1.7;
                    meshGearLeftHandle3.rotation.x = 1.525;
                    bicycle.add(meshGearLeftHandle3);

                    //Hjul bak
                    let geoWheelBack = new THREE.TorusGeometry(3, 0.3, 50, 100)
                    let meshWheelBack = new THREE.Mesh(geoWheelBack, mat);
                    meshWheelBack.name = "backWheelObj";
                    meshWheelBack.position.x = -2;
                    meshWheelBack.position.y = 2.925;
                    meshWheelBack.position.z = 0;
                    meshWheelBack.rotation.x = 0;
                    bicycle.add(meshWheelBack);

                    //bremseskive fremme, midten
                    let geoBrakeFrontMidle = new THREE.CylinderGeometry(0.05, 0.05, 0.85, 90, 90, false);
                    let meshBrakeFrontMidle = new THREE.Mesh(geoBrakeFrontMidle, mat);
                    meshBrakeFrontMidle.name = "AttachmentObj3";
                    meshBrakeFrontMidle.position.x = 11;
                    meshBrakeFrontMidle.position.y = 8.35;
                    meshBrakeFrontMidle.position.z = 0;
                    meshBrakeFrontMidle.rotation.x = 1.525;
                    bicycle.add(meshBrakeFrontMidle);

                    //Andre bremsepipe
                    let geoBrakePart2 = new THREE.CylinderGeometry(0.05, 0.05, 0.85, 90, 90, false);
                    let meshBrakePart2 = new THREE.Mesh(geoBrakePart2, mat);
                    meshBrakePart2.name = "pipeObj2";
                    meshBrakePart2.position.x = 11.125;
                    meshBrakePart2.position.y = 8;
                    meshBrakePart2.position.z = 0.385;
                    meshBrakePart2.rotation.z = 0.3;
                    bicycle.add(meshBrakePart2);

                    //Treddje bremsepipe
                    let geoBrakePart3 = new THREE.CylinderGeometry(0.05, 0.05, 0.85, 90, 90, false);
                    let meshBrakePart3 = new THREE.Mesh(geoBrakePart3, mat);
                    meshBrakePart3.name = "pipeObj2";
                    meshBrakePart3.position.x = 11.125;
                    meshBrakePart3.position.y = 7.95;
                    meshBrakePart3.position.z = -0.385;
                    meshBrakePart3.rotation.z = 0.3;
                    bicycle.add(meshBrakePart3);

                    //Fjerde bremsepipe
                    let geoBrakePart4 = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 90, 90, false);
                    let meshBrakePart4 = new THREE.Mesh(geoBrakePart4, mat);
                    meshBrakePart4.name = "pipeObj2";
                    meshBrakePart4.position.x = 10.95;
                    meshBrakePart4.position.y = 8.5;
                    meshBrakePart4.position.z = -0.185;
                    meshBrakePart4.rotation.z = 0.3;
                    bicycle.add(meshBrakePart4);

                    //Femte bremsepipe
                    let geoBrakePart5 = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 90, 90, false);
                    let meshBrakePart5 = new THREE.Mesh(geoBrakePart5, mat);
                    meshBrakePart5.name = "pipeObj2";
                    meshBrakePart5.position.x = 10.925;
                    meshBrakePart5.position.y = 8.56;
                    meshBrakePart5.position.z = 0.185;
                    meshBrakePart5.rotation.z = 0.3;
                    bicycle.add(meshBrakePart5);

                    //Bremseskive, fremme, høyre
                    let geoBrakeFrontRight = new THREE.BoxGeometry(0.4, 0.15, 0.25, 10, 10)
                    let meshBrakeFrontRight = new THREE.Mesh(geoBrakeFrontRight, mat);
                    meshBrakeFrontRight.name = "jerseyFrontObj";
                    meshBrakeFrontRight.position.x = 11.25;
                    meshBrakeFrontRight.position.y = 7.6;
                    meshBrakeFrontRight.position.z = 0.35;
                    meshBrakeFrontRight.rotation.x = -0.75;
                    bicycle.add(meshBrakeFrontRight);

                    //Bremseskive, fremme, venstre
                    let geoBrakeFrontLeft = new THREE.BoxGeometry(0.4, 0.15, 0.25, 10, 10)
                    let meshBrakeFrontLeft = new THREE.Mesh(geoBrakeFrontLeft, mat);
                    meshBrakeFrontLeft.name = "jerseyFrontObj";
                    meshBrakeFrontLeft.position.x = 11.25;
                    meshBrakeFrontLeft.position.y = 7.6;
                    meshBrakeFrontLeft.position.z = -0.35;
                    meshBrakeFrontLeft.rotation.x = 0.75;
                    bicycle.add(meshBrakeFrontLeft);

                    //bremseskive bak, midten
                    let geoBrakeBackMidle = new THREE.CylinderGeometry(0.05, 0.05, 1, 90, 90, false);
                    let meshBrakeBackMidle = new THREE.Mesh(geoBrakeBackMidle, mat);
                    meshBrakeBackMidle.name = "AttachmentObj3";
                    meshBrakeBackMidle.position.x = 0;
                    meshBrakeBackMidle.position.y = 6;
                    meshBrakeBackMidle.position.z = 0;
                    meshBrakeBackMidle.rotation.x = 1.525;
                    bicycle.add(meshBrakeBackMidle);

                    //bremsepipe bak, høyre
                    let geoBrakePartBackRight = new THREE.CylinderGeometry(0.05, 0.05, 0.85, 90, 90, false);
                    let meshBrakePartBackRight = new THREE.Mesh(geoBrakePartBackRight, mat);
                    meshBrakePartBackRight.name = "pipeObj2";
                    meshBrakePartBackRight.position.x = 0.125;
                    meshBrakePartBackRight.position.y = 5.6;
                    meshBrakePartBackRight.position.z = 0.415;
                    meshBrakePartBackRight.rotation.z = 0.3;
                    bicycle.add(meshBrakePartBackRight);

                    //bremsepipe bak, høyre ned
                    let geoBrakePartBackRightDown = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 90, 90, false);
                    let meshBrakePartBackRightDown = new THREE.Mesh(geoBrakePartBackRightDown, mat);
                    meshBrakePartBackRightDown.name = "pipeObj2";
                    meshBrakePartBackRightDown.position.x = 0;
                    meshBrakePartBackRightDown.position.y = 5.15;
                    meshBrakePartBackRightDown.position.z = 0.415;
                    meshBrakePartBackRightDown.rotation.z = -1;
                    bicycle.add(meshBrakePartBackRightDown);

                    //bremsepipe bak, venstre
                    let geoBrakePartBackLeft = new THREE.CylinderGeometry(0.05, 0.05, 0.85, 90, 90, false);
                    let meshBrakePartBackLeft = new THREE.Mesh(geoBrakePartBackLeft, mat);
                    meshBrakePartBackLeft.name = "pipeObj2";
                    meshBrakePartBackLeft.position.x = 0.125;
                    meshBrakePartBackLeft.position.y = 5.6;
                    meshBrakePartBackLeft.position.z = -0.385;
                    meshBrakePartBackLeft.rotation.z = 0.3;
                    bicycle.add(meshBrakePartBackLeft);

                    //bremsepipe bak, venstre ned
                    let geoBrakePartBackLeftDown = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 90, 90, false);
                    let meshBrakePartBackLeftDown = new THREE.Mesh(geoBrakePartBackLeftDown, mat);
                    meshBrakePartBackLeftDown.name = "pipeObj2";
                    meshBrakePartBackLeftDown.position.x = 0;
                    meshBrakePartBackLeftDown.position.y = 5.15;
                    meshBrakePartBackLeftDown.position.z = -0.385;
                    meshBrakePartBackLeftDown.rotation.z = -1;
                    bicycle.add(meshBrakePartBackLeftDown);

                    //bremsepipe bak, høyre 2
                    let geoBrakePartBackRight2 = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 90, 90, false);
                    let meshBrakePartBackRight2 = new THREE.Mesh(geoBrakePartBackRight2, mat);
                    meshBrakePartBackRight2.name = "pipeObj2";
                    meshBrakePartBackRight2.position.x = 0.105;
                    meshBrakePartBackRight2.position.y = 6.015;
                    meshBrakePartBackRight2.position.z = 0.5;
                    meshBrakePartBackRight2.rotation.x = 1.525;
                    meshBrakePartBackRight2.rotation.z = -0.75;
                    bicycle.add(meshBrakePartBackRight2);

                    //bremsepipe bak, venstre 2
                    let geoBrakePartBackLeft2 = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 90, 90, false);
                    let meshBrakePartBackLeft2 = new THREE.Mesh(geoBrakePartBackLeft2, mat);
                    meshBrakePartBackLeft2.name = "pipeObj2";
                    meshBrakePartBackLeft2.position.x = 0.105;
                    meshBrakePartBackLeft2.position.y = 5.97;
                    meshBrakePartBackLeft2.position.z = -0.5;
                    meshBrakePartBackLeft2.rotation.x = 1.525;
                    meshBrakePartBackLeft2.rotation.z = 0.75;
                    bicycle.add(meshBrakePartBackLeft2);

                    //Bremseskive, bak, høyre
                    let geoBrakeBackRight = new THREE.BoxGeometry(0.4, 0.15, 0.25, 10, 10)
                    let meshBrakeBackRight = new THREE.Mesh(geoBrakeBackRight, mat);
                    meshBrakeBackRight.name = "jerseyFrontObj";
                    meshBrakeBackRight.position.x = -0.25;
                    meshBrakeBackRight.position.y = 5;
                    meshBrakeBackRight.position.z = 0.4;
                    meshBrakeBackRight.rotation.x = -0.75;
                    bicycle.add(meshBrakeBackRight);

                    //Bremseskive, bak, venstre
                    let geoBrakeBackLeft = new THREE.BoxGeometry(0.4, 0.15, 0.25, 10, 10)
                    let meshBrakeBackLeft = new THREE.Mesh(geoBrakeBackLeft, mat);
                    meshBrakeBackLeft.name = "jerseyFrontObj";
                    meshBrakeBackLeft.position.x = -0.25;
                    meshBrakeBackLeft.position.y = 5;
                    meshBrakeBackLeft.position.z = -0.4;
                    meshBrakeBackLeft.rotation.x = 0.75;
                    bicycle.add(meshBrakeBackLeft);

                    //Tannhjul 1
                    let geoGear1 = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 90, 90, false);
                    let meshGear1 = new THREE.Mesh(geoGear1, mat);
                    meshGear1.name = "gear1Obj";
                    meshGear1.position.x = -2;
                    meshGear1.position.y = 3;
                    meshGear1.position.z = 1.625;
                    meshGear1.rotation.x = 1.525;
                    bicycle.add(meshGear1);

                    //Tannhjul 2
                    let geoGear2 = new THREE.CylinderGeometry(0.20, 0.20, 0.05, 90, 90, false);
                    let meshGear2 = new THREE.Mesh(geoGear2, mat);
                    meshGear2.name = "gear2Obj";
                    meshGear2.position.x = -2;
                    meshGear2.position.y = 3;
                    meshGear2.position.z = 1.575;
                    meshGear2.rotation.x = 1.525;
                    bicycle.add(meshGear2);

                    //Tannhjul 3
                    let geoGear3 = new THREE.CylinderGeometry(0.25, 0.25, 0.05, 90, 90, false);
                    let meshGear3 = new THREE.Mesh(geoGear3, mat);
                    meshGear3.name = "gear3Obj";
                    meshGear3.position.x = -2;
                    meshGear3.position.y = 3;
                    meshGear3.position.z = 1.525;
                    meshGear3.rotation.x = 1.525;
                    bicycle.add(meshGear3);

                    //Tannhjul 4
                    let geoGear4 = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 90, 90, false);
                    let meshGear4 = new THREE.Mesh(geoGear4, mat);
                    meshGear4.name = "gear4Obj";
                    meshGear4.position.x = -2;
                    meshGear4.position.y = 3;
                    meshGear4.position.z = 1.475;
                    meshGear4.rotation.x = 1.525;
                    bicycle.add(meshGear4);

                    //Tannhjul 5
                    let geoGear5 = new THREE.CylinderGeometry(0.35, 0.35, 0.05, 90, 90, false);
                    let meshGear5 = new THREE.Mesh(geoGear5, mat);
                    meshGear5.name = "gear5Obj";
                    meshGear5.position.x = -2;
                    meshGear5.position.y = 3;
                    meshGear5.position.z = 1.425;
                    meshGear5.rotation.x = 1.525;
                    bicycle.add(meshGear5);

                    //Tannhjul 6
                    let geoGear6 = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 90, 90, false);
                    let meshGear6 = new THREE.Mesh(geoGear6, mat);
                    meshGear6.name = "gear6Obj";
                    meshGear6.position.x = -2;
                    meshGear6.position.y = 3;
                    meshGear6.position.z = 1.375;
                    meshGear6.rotation.x = 1.525;
                    bicycle.add(meshGear6);

                    //Tannhjul 7
                    let geoGear7 = new THREE.CylinderGeometry(0.45, 0.45, 0.05, 90, 90, false);
                    let meshGear7 = new THREE.Mesh(geoGear7, mat);
                    meshGear7.name = "gear7Obj";
                    meshGear7.position.x = -2;
                    meshGear7.position.y = 3;
                    meshGear7.position.z = 1.325;
                    meshGear7.rotation.x = 1.525;
                    bicycle.add(meshGear7);

                    //Tannhjul 8
                    let geoGear8 = new THREE.CylinderGeometry(0.50, 0.50, 0.05, 90, 90, false);
                    let meshGear8 = new THREE.Mesh(geoGear8, mat);
                    meshGear8.name = "gear8Obj";
                    meshGear8.position.x = -2;
                    meshGear8.position.y = 3;
                    meshGear8.position.z = 1.275;
                    meshGear8.rotation.x = 1.525;
                    bicycle.add(meshGear8);

                    //Sykkelsete
                    let geoBicycleSeat = new THREE.BoxGeometry(1.75, 0.25, 1, 25, 25)
                    let meshBicycleSeat = new THREE.Mesh(geoBicycleSeat, mat);
                    meshBicycleSeat.name = "bicycleSeatObj";
                    meshBicycleSeat.position.x = 1.3;
                    meshBicycleSeat.position.y = 11.1;
                    meshBicycleSeat.position.z = 0;
                    bicycle.add(meshBicycleSeat);

                    //kjetting del 1
                    let geoChainPart1 = new THREE.TorusGeometry(1, 0.1, 100, 100, 3.25)
                    let meshChainPart1 = new THREE.Mesh(geoChainPart1, mat);
                    meshChainPart1.name = "chainPart1Obj";
                    meshChainPart1.position.x = 3.25;
                    meshChainPart1.position.y = 4.25;
                    meshChainPart1.position.z = 0.75;
                    meshChainPart1.rotation.z = -1.25;
                    bicycle.add(meshChainPart1);

                    //kjetting del 2
                    let geoChainPart2 = new THREE.TorusGeometry(0.6, 0.14, 100, 100, 3.25)
                    let meshChainPart2 = new THREE.Mesh(geoChainPart2, mat);
                    meshChainPart2.name = "chainPart2Obj";
                    meshChainPart2.position.x = -2;
                    meshChainPart2.position.y = 3;
                    meshChainPart2.position.z = 1.25;
                    meshChainPart2.rotation.z = 1.75;
                    bicycle.add(meshChainPart2);

                    //Kjetting del 3
                    let geoChainPart3 = new THREE.CylinderGeometry(0.1, 0.1, 5.45, 90, 90, false);
                    let meshChainPart3 = new THREE.Mesh(geoChainPart3, mat);
                    meshChainPart3.name = "chainPart3Obj";
                    meshChainPart3.position.x = 0.25;
                    meshChainPart3.position.y = 4.35;
                    meshChainPart3.position.z = 1;
                    meshChainPart3.rotation.z = 1.885;
                    meshChainPart3.rotation.x = -0.3;
                    bicycle.add(meshChainPart3);

                    //Kjetting del 4
                    let geoChainPart4 = new THREE.CylinderGeometry(0.1, 0.1, 5.75, 90, 90, false);
                    let meshChainPart4 = new THREE.Mesh(geoChainPart4, mat);
                    meshChainPart4.name = "chainPart4Obj";
                    meshChainPart4.position.x = 0.9;
                    meshChainPart4.position.y = 2.9;
                    meshChainPart4.position.z = 1;
                    meshChainPart4.rotation.z = 1.75;
                    meshChainPart4.rotation.x = -0.5;
                    bicycle.add(meshChainPart4);

                    // brems framme, kabel 1
                    let geoFrontBrakeCable1 = new THREE.CylinderGeometry(0.03, 0.03, 0.9, 90, 90, false);
                    let meshFrontBrakeCable1 = new THREE.Mesh(geoFrontBrakeCable1, mat);
                    meshFrontBrakeCable1.name = "frontBrakecable1Obj";
                    meshFrontBrakeCable1.position.x = 9.7;
                    meshFrontBrakeCable1.position.y = 12.55;
                    meshFrontBrakeCable1.position.z = -1.1;
                    meshFrontBrakeCable1.rotation.x = 1.525;
                    bicycle.add(meshFrontBrakeCable1);

                    // brems framme, kabel 2
                    let geoFrontBrakeCable2 = new THREE.TorusGeometry(0.3, 0.03, 100, 100, 1.75)
                    let meshFrontBrakeCable2 = new THREE.Mesh(geoFrontBrakeCable2, mat);
                    meshFrontBrakeCable2.name = "frontBrakecable2Obj";
                    meshFrontBrakeCable2.position.x = 9.69;
                    meshFrontBrakeCable2.position.y = 12.274;
                    meshFrontBrakeCable2.position.z = -0.7;
                    meshFrontBrakeCable2.rotateZ(1.525);
                    meshFrontBrakeCable2.rotateX(1.525);
                    bicycle.add(meshFrontBrakeCable2);

                    // brems framme, kabel 3
                    let geoFrontBrakeCable3 = new THREE.CylinderGeometry(0.03, 0.03, 3.5, 90, 90, false);
                    let meshFrontBrakeCable3 = new THREE.Mesh(geoFrontBrakeCable3, mat);
                    meshFrontBrakeCable3.name = "frontBrakecable1Obj";
                    meshFrontBrakeCable3.position.x = 10.2;
                    meshFrontBrakeCable3.position.y = 10.6;
                    meshFrontBrakeCable3.position.z = -0.405;
                    meshFrontBrakeCable3.rotateZ(0.3);
                    bicycle.add(meshFrontBrakeCable3);

                    // brems bak, kabel 1
                    let geoBackBrakeCable1 = new THREE.CylinderGeometry(0.03, 0.03, 0.9, 90, 90, false);
                    let meshBackBrakeCable1 = new THREE.Mesh(geoBackBrakeCable1, mat);
                    meshBackBrakeCable1.name = "backBrakecable1Obj";
                    meshBackBrakeCable1.position.x = 9.71;
                    meshBackBrakeCable1.position.y = 12.7;
                    meshBackBrakeCable1.position.z = 1.1;
                    meshBackBrakeCable1.rotation.x = 1.525;
                    bicycle.add(meshBackBrakeCable1);

                    // brems bak, kabel 2
                    let geoBackBrakeCable2 = new THREE.TorusGeometry(0.3, 0.03, 100, 100, 1.75)
                    let meshBackBrakeCable2 = new THREE.Mesh(geoBackBrakeCable2, mat);
                    meshBackBrakeCable2.name = "backBrakecable2Obj";
                    meshBackBrakeCable2.position.x = 9.69;
                    meshBackBrakeCable2.position.y = 12.3825;
                    meshBackBrakeCable2.position.z = 0.7;
                    meshBackBrakeCable2.rotateZ(1.525);
                    meshBackBrakeCable2.rotateX(-1.525);
                    bicycle.add(meshBackBrakeCable2);

                    // brems bak, kabel 3
                    let geoBackBrakeCable3 = new THREE.CylinderGeometry(0.03, 0.03, 1, 90, 90, false);
                    let meshBackBrakeCable3 = new THREE.Mesh(geoBackBrakeCable3, mat);
                    meshBackBrakeCable3.name = "frontBrakecable1Obj";
                    meshBackBrakeCable3.position.x = 9.8;
                    meshBackBrakeCable3.position.y = 12;
                    meshBackBrakeCable3.position.z = 0.405;
                    meshBackBrakeCable3.rotateZ(0.3);
                    bicycle.add(meshBackBrakeCable3);

                    // brems bak, kabel 4
                    let geoBackBrakeCable4 = new THREE.TorusGeometry(0.3, 0.03, 100, 100, 1.75)
                    let meshBackBrakeCable4 = new THREE.Mesh(geoBackBrakeCable4, mat);
                    meshBackBrakeCable4.name = "backBrakecable2Obj";
                    meshBackBrakeCable4.position.x = 9.64;
                    meshBackBrakeCable4.position.y = 11.5;
                    meshBackBrakeCable4.position.z = 0.4;
                    meshBackBrakeCable4.rotateZ(-1.525);
                    bicycle.add(meshBackBrakeCable4);

                    // brems bak, kabel 5
                    let geoBackBrakeCable5 = new THREE.CylinderGeometry(0.03, 0.03, 8, 90, 90, false);
                    let meshBackBrakeCable5 = new THREE.Mesh(geoBackBrakeCable5, mat);
                    meshBackBrakeCable5.name = "frontBrakecable5Obj";
                    meshBackBrakeCable5.position.x = 5.9;
                    meshBackBrakeCable5.position.y = 9.9175;
                    meshBackBrakeCable5.position.z = 0.405;
                    meshBackBrakeCable5.rotateZ(1.9);
                    bicycle.add(meshBackBrakeCable5);

                    // brems bak, kabel 6
                    let geoBackBrakeCable6 = new THREE.CylinderGeometry(0.03, 0.03, 3.6, 90, 90, false);
                    let meshBackBrakeCable6 = new THREE.Mesh(geoBackBrakeCable6, mat);
                    meshBackBrakeCable6.name = "frontBrakecable6Obj";
                    meshBackBrakeCable6.position.x = 1.06;
                    meshBackBrakeCable6.position.y = 7.4;
                    meshBackBrakeCable6.position.z = 0;
                    meshBackBrakeCable6.rotateZ(2.5);
                    bicycle.add(meshBackBrakeCable6);

                    //Hjul felg bak
                    let geoWheelBackRim = new THREE.TorusGeometry(2.7, 0.15, 50, 100)
                    let meshWheelBackRim = new THREE.Mesh(geoWheelBackRim, mat);
                    meshWheelBackRim.name = "backRimObj";
                    meshWheelBackRim.position.x = -2;
                    meshWheelBackRim.position.y = 3;
                    meshWheelBackRim.position.z = 0;
                    bicycle.add(meshWheelBackRim);

                    scene.add(bicycle);
                    animate();
                }
                console.log('[TextureLoader] Loaded %o', image.name);
            },
            undefined,
            function ( err )
            {
                console.error( 'Feil ved lasting av teksturfil...' );
            });
    }
}

function animate(currentTime)
{
    requestAnimationFrame(animate);
    if (currentTime == undefined)
        currentTime = 0;

    let elapsed = 0.0;
    if (lastTime != 0.0)
        elapsed = (currentTime - lastTime)/1000;

    lastTime = currentTime;

    let rotationSpeed = (Math.PI);
    angle = angle + (rotationSpeed * elapsed);
    angle %= (Math.PI * 2);

    if (currentlyPressedKeys[87])
    {
        let frontWheel = bicycle.getObjectByName("frontWheelObj", true);
        if (frontWheel !== undefined)
            frontWheel.rotation.z = -angle;
        let frontRim = bicycle.getObjectByName("frontRimObj", true);
        if (frontRim !== undefined)
            frontRim.rotation.z = -angle;
        let backWheel = bicycle.getObjectByName("backWheelObj", true);
        if (backWheel !== undefined)
            backWheel.rotation.z = -angle;
        let backRim = bicycle.getObjectByName("backRimObj", true);
        if (backRim !== undefined)
            backRim.rotation.z = -angle;
    }
    else if (currentlyPressedKeys[83])
    {
        let frontWheel = bicycle.getObjectByName("frontWheelObj", true);
        if (frontWheel !== undefined)
            frontWheel.rotation.z = angle;
        let frontRim = bicycle.getObjectByName("frontRimObj", true);
        if (frontRim !== undefined)
            frontRim.rotation.z = angle;
        let backWheel = bicycle.getObjectByName("backWheelObj", true);
        if (backWheel !== undefined)
            backWheel.rotation.z = angle;
        let backRim = bicycle.getObjectByName("backRimObj", true);
        if (backRim !== undefined)
            backRim.rotation.z = angle;
    }

    controls.update();
    render();
}

function render()
{
    renderer.render(scene, camera);
}

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.handleResize();
    render();
}
