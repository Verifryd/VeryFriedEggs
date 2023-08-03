import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from "gsap";
import { FilmPass } from '../static/utils/FilmPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from '../static/utils/GlitchPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

import Stats from 'stats.js'


const darkMaterial = new THREE.MeshBasicMaterial( { color: 'black' } );
const materials = {}
const isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);


const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

			const bloomLayer = new THREE.Layers();
			bloomLayer.set( BLOOM_SCENE );

			const params = {
				exposure: 1,
				bloomStrength: 5,
				bloomThreshold: 0,
				bloomRadius: 0,
				scene: 'Scene with Glow'
			};

/**
 * Loaders
 */

const easterEggsFound = [false, false, false, false, false]

const manager = new THREE.LoadingManager()
const gltfLoader = new GLTFLoader(manager)
const textureLoader = new THREE.TextureLoader()

// const stats = new Stats()
// stats.showPanel(0)
// document.body.appendChild(stats.dom)
let fullyLoaded = false, entered = false

const splashScreen = document.getElementById('splash-screen')
manager.onLoad = () => {
    fullyLoaded = true
    enterButton.textContent = 'ENTER'
}

const enterButton = document.getElementById('enter-button')
enterButton.addEventListener('click', () => {
    if (fullyLoaded) {
        music.play()
        entered = true
        splashScreen.style.display = 'none'
        drop.children[0].play()
        drop.children[0].addEventListener('ended', videoEnded)
        // gsap.to(splashScreen, {
        //     duration: 2,
        //     top: '-200%',
        //     ease: 'power3.inOut',
        //     onComplete: () => {
        //         splashScreen.remove()
        //     }
        // })
        renderer.domElement.addEventListener('click', () => {
            if (!isMobile) {
                onClick() 
            }
            })
        
        window.addEventListener('mousewheel', onScroll, false);
        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('touchmove', onTouchMove, false);
        window.addEventListener('touchstart', onTouchStart, false);
    }

})

const music = document.getElementById('music')
const keypress = document.getElementById('keypress')


document.addEventListener("visibilitychange", event => {
    if (document.visibilityState === "visible") {
        music.play()
    } else {

        music && music.pause();
    }
})
const invisible = document.getElementById('invisible')
const bird = document.getElementById('bird')

const eggHeadElement = document.getElementById('egghead')
bird.children[0].pause()
const ross = document.getElementById('ross')
const scroll = document.getElementById('scroll')
const drop = document.getElementById('drop')

// if (isMobile) {
//     bird.children[0].src = './cutscenes/BirdSceneMobile.mp4'
//     ross.children[0].src = './cutscenes/EggRossMobile.mp4'
//     invisible.children[0].src = './cutscenes/MonkSceneMobile.mp4'
// }


/**
 * Mouse
 */
const mouse = new THREE.Vector2()
const raycasterMouse = new THREE.Vector2();
const lastMouse = new THREE.Vector2()

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
gui.hide()
const debugObject = {
    eggMetalness: 0.3,
    eggRoughness: 0.4,
    xNegative: false,
    yNegative: false,
    zNegative: false,
}


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */
const updateAllMaterials = () => {
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}
gui.add(debugObject, 'xNegative').onChange(updateAllMaterials)
gui.add(debugObject, 'yNegative').onChange(updateAllMaterials)
gui.add(debugObject, 'zNegative').onChange(updateAllMaterials)



/**
 * Environment map
 */


debugObject.envMapIntensity = 0.3
gui.add(debugObject, 'envMapIntensity').min(0).max(4).step(0.001).onChange(updateAllMaterials)


let mixer = null, birdMixer = null
let flyingClip

let object = null
let pan, eggRoss, wallTop

let octaneCamera


var worldPositionPan = new THREE.Vector3()


var eggGroup = new THREE.Group()
let sparrow, invisibleButton

let birdAnimating = true
let egg, human, eggHead

let wallsToDisable = []

let logos = []

let wallNoMaterial

let piecesToExpand = []
let piecesConditions = [
    'EggSideDetail1',
// 'Tube',
// 'Cube1', 'Cube004', 'Cube005', 'Cube002',
'Polygon006', 'Polygon005', 'Polygon007','Polygon008',
'EggWrap', 'EggWrap001', 'EggWrap002', 'EggWrap003',
'Polygon1', 'Polygon002', 'Polygon003', 'Polygon004',
'Egg', 'Egg003', 'Egg001', 'Egg002',
]

let keypadNumbersConditions = [
    'Cube4_0',
    'Cube4_1',
    'Cube4_2',
    'Cube4_3',
    'Cube4_4',
    'Cube4_5',
    'Cube4_6',
    'Cube4_7',
    'Cube4_8',
    'Cube4_9',
]

let keypadNumbers = []

let screenCanvas, screen
let screenText = '999999999'

let deleteButton 
let sendButton

const drawCanvas = () => {
    const ctx = screenCanvas.getContext('2d')
    ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, screenCanvas.width, screenCanvas.height)
    ctx.font = 'bold 100px Arial'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(screenText, screenCanvas.width / 2, screenCanvas.height / 2 + 100 / 2 - 15)
    screen.material.needsUpdate = true
    screen.material.map.needsUpdate = true
}

const addObject = () => {
    gltfLoader.load(
        './models/2/untitled.gltf',
        (gltf) => {
            object = gltf.scene

            octaneCamera = gltf.cameras[0]
            // octaneCamera.parent.add(camera)
            // Model
            gltf.scene.scale.set(0.01, 0.01, 0.01)
            gltf.scene.rotateY(Math.PI)
            gltf.scene.traverse((child) => {
           
                if (child.name.toLowerCase().includes('vliq')) {
                    wallTop = child
                    if (child.name == 'Aset_building_combined_L_vliqdindw_01_LOD0') {
                        child.material.map = textureLoader.load('./models/2/Image_29.jpg')
                        child.material.map.flipY = false
                        child.material.map.encoding = THREE.sRGBEncoding
                    }
                }
                if (child.name.toLowerCase().includes('de010')) {
                    eggRoss = child
                    child.castShadow = true
                    child.receiveShadow = true
                }
                if (child.name.includes('Falling')) {
                    egg = child
                    triggerGsap()
                }

                if (child.name == 'EggGold002') {
                    eggHead = child

                }
           
                
                child.frustumCulled = false
                if (child.name.includes('Bird(')) {
                    sparrow = child

                    sparrow.traverse((kid) => {
                        if (kid.isMesh) {
                            kid.updateMatrixWorld()
                        }
                    })
                    sparrow.traverse(o => {
                        if (o.isSkinnedMesh) {
                            o.geometry.computeBoundingBox();
                            o.geometry.computeBoundingSphere();
                            o.geometry.boundingSphere.radius *= 400;
                            o.geometry.boundingBox.min *= 400;
                            o.geometry.boundingBox.max *= 400;
                        }
                    });
                    sparrow.updateMatrixWorld()
                }
                if (child.name.includes('Shorts')) {
                    human = child.parent.parent

                    human.traverse((kid) => {
                        if (kid.isMesh) {
                            kid.updateMatrixWorld()
                        }
                    })
                    human.traverse(o => {
                        if (o.isSkinnedMesh) {
                            // o.geometry.computeBoundingBox();

                            o.geometry.computeBoundingSphere();
                            o.geometry.boundingSphere.radius *= 400;
                            o.geometry.boundingBox.min *= 400;
                            o.geometry.boundingBox.max *= 400;
                        }
                    });
                    human.updateMatrixWorld()
                }
                if (child.isMesh) {

                    if (child.name == 'Cylinder') {
                        deleteButton = child
                        child.material = new THREE.MeshStandardMaterial({ color: 'red', metalness: 0.2, roughness: 0.1 })
                    }
                    if (child.name.includes('Cylinder') && child.name.includes('003')) {
                        sendButton = child
                        child.material = new THREE.MeshStandardMaterial({ color: 'green', metalness: 0.2, roughness: 0.1 })
                    }
                    if (keypadNumbersConditions.some(condition => condition == child.name)) {
                        keypadNumbers.push(child)
                    }
                     if (child.name == 'Cube') {



                         screen = child
                        var box = new THREE.Box3().setFromObject(screen);
                        var aspect = box.getSize(new THREE.Vector3()).x / box.getSize(new THREE.Vector3()).y;

                        screenCanvas =  document.createElement('canvas')
                        screenCanvas.width = 512
                        screenCanvas.height = 512 / aspect
                        const texture = new THREE.CanvasTexture(screenCanvas)
                        texture.flipY = false
                        texture.encoding = THREE.sRGBEncoding
                        screen.material = new THREE.MeshStandardMaterial({ map: texture })
                        gui.add(screen.material, 'metalness').min(0).max(1).step(0.01)
                        gui.add(screen.material, 'roughness').min(0).max(1).step(0.01)
                        screen.material.needsUpdate = true
                        drawCanvas()
             


                        // child.material.color = new THREE.Color('green')

                     }
                    

                    if (piecesConditions.some(el => child.name == el)) {
                        piecesToExpand.push(child)
                    }

                    if (child.name.includes('Extrude')) {
                         if (child.name.includes('001') || 
                         child.name.includes('002') || 
                         child.name.includes('003') ||
                         child.name.includes('004')
                         )
                          {
                            child.layers.enable(BLOOM_SCENE)
                            logos.push(child)
                          }
                    }

                    if (child.name.includes('utton')) {
                        invisibleButton = child
                    }
                    if (child.name.includes('BottomWall')) {
                        child.material.transparent = true
                        wallsToDisable.push(child)
                    }
                    if (child.name.includes('Factory')) {
                        if (child.name.includes('Mat13')) {
                            child.visible = false
                        }
                        if (child.material.map) {
                            child.material.map.wrapS = THREE.RepeatWrapping
                            child.material.map.wrapT = THREE.RepeatWrapping
                            child.material.map.repeat.set(1, 1)
                        }
                        child.material.side = THREE.DoubleSide
  

                    }
                    if (child.name.includes('LOD0') && child.name.includes('LOD0001') == false) {
                        // wallsToDisable.push(child)

                    }
                    if (child.name.includes('Pan')) {
                      
                        pan = child
             
                    } else if (child.name.includes('Aset')) {
                        if (child.name.includes('vli') == false) {
                     
                        } else {
               
                            child.material = new THREE.MeshStandardMaterial().copy(child.material)
                            

                        }

                    } else if (child.name.includes('scape')) {
                        child.material = new THREE.MeshStandardMaterial().copy(child.material)
                        child.material.color = new THREE.Color('#202020')
                        child.material.bumpMap = floorColorTexture
                        child.material.metalness = 0.
                        child.material.roughness = 1
                    }


                    else {
                        // child.material.color = new THREE.Color('white')
                    }

                    if (child.material) {
                        child.material.side = THREE.DoubleSide

                    }
                    child.castShadow = true
                    child.receiveShadow = true

                }
            })
    
            gltf.animations[0].tracks[5].values = []
            // gltf.animations[0].tracks[64].values = []
            eggGroup.add(gltf.scene)
            scene.add(eggGroup)

            // Animation
            mixer = new THREE.AnimationMixer(gltf.scene)
            birdMixer = new THREE.AnimationMixer(sparrow)

            birdMixer.addEventListener('loop', (e) => {
                birdAnimating = false
                birdMixer._actions[0].reset().play()

                setTimeout(() => {
                    birdAnimating = true
                }, Math.random() * 5000 + 5000)
            })


            const birdTracks = gltf.animations[0].tracks.filter(track => {
                return (track.name.includes('Bird') || track.name.includes('Bip')) &&
                    !((track.name.includes('position') || track.name.includes('scale')) && (track.name.includes('Bip01_')))
            })
            const otherTracks = gltf.animations[0].tracks.filter(track => {
                return !((track.name.includes('Bird') || track.name.includes('Bip')) &&

                    !((track.name.includes('position') || track.name.includes('scale')) && (track.name.includes('Bip01_'))))
            })
            const uniqueBirdTracks = birdTracks.filter((track, index) => {
                return birdTracks.findIndex(t => t.name === track.name) === index
            })

            const humanPositionTracks = otherTracks.filter(track => {
                return track.name.includes('position') && track.name.includes('Null_2')
            })


            const fallingAction = mixer.clipAction(
                new THREE.AnimationClip('falling', -1, otherTracks)
            )
            const flyingAction = birdMixer.clipAction(
                new THREE.AnimationClip('flying', -1, birdTracks)
            )

            const humanPositionAction = mixer.clipAction(
                new THREE.AnimationClip('humanPosition', -1, humanPositionTracks)
            )
            humanPositionAction.time = 0.3
            // const fallingAction = mixer.clipAction(gltf.animations[0])
            // const flyingAction = birdMixer.clipAction(gltf.animations[0])
            flyingAction.play()
            // fallingAction.time = 8
            fallingAction.play()
            pan.getWorldPosition(worldPositionPan)
            // Update materials
            updateAllMaterials()

        }
    )

}

/**
 * Lights
 */

const lightsFolder = gui.addFolder('Lights')


const pointLight = new THREE.PointLight('#2d96eb', 8.2, 0)
pointLight.castShadow = true
pointLight.shadow.bias = -0.005
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.far = 15
pointLight.shadow.camera.near = 0.1
pointLight.position.set(2, 3, 4)
scene.add(pointLight)
const pointLight1Folder = lightsFolder.addFolder('Point Light 1')
// intensity and color
pointLight1Folder.add(pointLight, 'intensity').min(0).max(10).step(0.001).name('Intensity')
pointLight1Folder.addColor(pointLight, 'color').name('Color').onChange((e) => {
    pointLight.color.set(e)
    helper.material.color.set(e)
})

const pointLight4 = new THREE.PointLight('#fffff00',26, 0)
pointLight4.castShadow = true
pointLight4.shadow.bias = -0.005
// pointLight4.shadow.camera.far = 20
pointLight4.position.set(-15, -17, -10)
gui.add(pointLight4, 'visible').name('Point Light 4')
scene.add(pointLight4)


const pointLight5 = new THREE.PointLight('#fff5cf',0, 0)
pointLight5.castShadow = true
pointLight5.shadow.bias = -0.005
// pointLight5.shadow.camera.far = 20
pointLight5.position.set(35, -8,3.6)
gui.add(pointLight5, 'visible').name('Point Light 4')
scene.add(pointLight5)

gui.add(pointLight5.position, 'x').min(-100).max(100).step(0.001).name('Point Light 5 X')
gui.add(pointLight5.position, 'y').min(-100).max(100).step(0.001).name('Point Light 5 Y')
gui.add(pointLight5.position, 'z').min(-100).max(100).step(0.001).name('Point Light 5 Z')


const pointLight2 = new THREE.PointLight('#facb23', 8.2, 0)
pointLight2.shadow.bias = -0.005
pointLight2.castShadow = true
pointLight2.shadow.mapSize.width = 1024
pointLight2.shadow.mapSize.height = 1024
pointLight2.shadow.camera.far = 15
pointLight2.shadow.camera.near = 0.1

pointLight2.position.set(-2, 3, 4)
scene.add(pointLight2)
const pointLight2Folder = lightsFolder.addFolder('Point Light 2')
// intensity and color
pointLight2Folder.add(pointLight2, 'intensity').min(0).max(10).step(0.001).name('Intensity')
pointLight2Folder.addColor(pointLight2, 'color').onChange((e) => {
    pointLight2.color.set(e)
    helper2.material.color.set(e)

})

const pointLight3 = new THREE.PointLight('#ffffff', 3.2, 0)
// pointLight3.shadow.bias = -0.005
// pointLight3.shadow.mapSize.width = 1024
// pointLight3.shadow.mapSize.height = 1024
// pointLight3.shadow.camera.far = 30
// pointLight3.shadow.camera.near = 0.1
// pointLight3.position.y = 3
// scene.add(pointLight3)

// hemisphere light 
const hemisphereLight = new THREE.HemisphereLight('#00e1ff', '#002606', 0.3)
gui.add(hemisphereLight, 'intensity').min(0).max(10).step(0.001).name('Intensity')
scene.add(hemisphereLight)

var helper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(helper)

var helper2 = new THREE.PointLightHelper(pointLight5, 1)
// scene.add(helper2)


const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.3)
const ambientLightFolder = lightsFolder.addFolder('Ambient Light')
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(5).step(0.001)
scene.add(ambientLight)

var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    composer.setSize(sizes.width, sizes.height)

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1 : 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.01, 1000000)
// camera.position.set(6, 4, 8)
camera.position.z = 17
camera.position.x = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.CineonToneMapping
renderer.toneMappingExposure = 1.75
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setClearColor('#211d20')
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1 : 2))


const raycaster = new THREE.Raycaster()
let envMap

// wallTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
// wallNormal.anisotropy = renderer.capabilities.getMaxAnisotropy();

// upperWallNormal.anisotropy = renderer.capabilities.getMaxAnisotropy();
// upperWallTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const pmrem = new THREE.PMREMGenerator(renderer);

const rgbeLoader = new RGBELoader();
rgbeLoader.load('textures/environmentMap/hdr.hdr', function (texture) {
    texture.encoding = THREE.sRGBEncoding;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    // texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
     envMap = pmrem.fromEquirectangular(texture).texture;

    envMap.encoding = THREE.sRGBEncoding;
    scene.environment = envMap;
    scene.background = envMap
    // scene.rotation.set(0, Math.PI, 0)
    texture.dispose();
    pmrem.dispose();
})

const size = renderer.getDrawingBufferSize(new THREE.Vector2());
const renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, {
    samples: 4,
});

var composer = new EffectComposer(renderer, renderTarget);
composer.addPass(new RenderPass(scene, camera));



const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.9, 1, 0.843);
gui.add(bloomPass, 'threshold').min(0).max(1).step(0.001).name('Bloom Threshold')
gui.add(bloomPass, 'strength').min(0).max(2).step(0.001).name('Bloom Strength')
gui.add(bloomPass, 'radius').min(0).max(1).step(0.001).name('Bloom Radius')

// gui.show()
composer.addPass(bloomPass);

const renderScene = new RenderPass( scene, camera );

const bloomPassLogos = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPassLogos.threshold = params.bloomThreshold;
bloomPassLogos.strength = params.bloomStrength;
bloomPassLogos.radius = params.bloomRadius;

const bloomComposer = new EffectComposer( renderer );
bloomComposer.renderToScreen = false;
bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPassLogos );

const finalPass = new ShaderPass(
    new THREE.ShaderMaterial( {
        uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture }
        },
        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        defines: {}
    } ), 'baseTexture'
);
finalPass.needsSwap = true;
composer.addPass( finalPass );

gui.add( params, 'scene', [ 'Scene with Glow', 'Glow only', 'Scene only' ] ).onChange( function ( value ) {

    switch ( value ) 	{

        case 'Scene with Glow':
            bloomComposer.renderToScreen = false;
            break;
        case 'Glow only':
            bloomComposer.renderToScreen = true;
            break;
        case 'Scene only':
            // nothing to do
            break;

    }

    tick()

} );

const folder = gui.addFolder( 'Bloom Parameters' );


folder.add( params, 'bloomThreshold', 0.0, 1.0 ).onChange( function ( value ) {

    bloomPassLogos.threshold = Number( value );

} );

folder.add( params, 'bloomStrength', 0.0, 10.0 ).onChange( function ( value ) {

    bloomPassLogos.strength = Number( value );

} );

folder.add( params, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {

    bloomPassLogos.radius = Number( value );

} );

const filmPass = new FilmPass(
    0.35,   // noise intensity
    0,  // scanline intensity
    100000,    // scanline count
    false,  // grayscale
);
filmPass.renderToScreen = true;
composer.addPass(filmPass);

const glitchPass = new GlitchPass({
    curF: 0.1
});

composer.addPass(glitchPass);





addObject()

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

controls.enabled = false
gui.add(controls, 'enabled').name('Controls Enabled')
gui.add(debugObject, 'eggMetalness').min(0).max(1).step(0.001).name('Egg Metalness').onChange(function (e) {
    object.traverse((child) => {
        if (child.isMesh) {
            child.material.metalness = e
        }
    })
})
gui.add(debugObject, 'eggRoughness').min(0).max(1).step(0.001).name('Egg Roughness').onChange(function (e) {
    object.traverse((child) => {
        if (child.isMesh) {
            child.material.roughness = e
        }
    })
})

var speed = 0.0;
let scrollTriggered = false

const triggerScrollCutscene = () => {
    easterEggsFound[5] = true
    scroll.children[0].play()

    scroll.children[0].addEventListener('ended', videoEnded)

    gsap.to(scroll, {
        duration: 1,
        ease: 'power2.out',
        top: '0%',
        onComplete: () => {
            scrollTriggered = false

        }
    })
    updateEasterEggsFound();

}

const easterEggCounterElem = document.getElementById('easterEggCounter')

const updateEasterEggsFound = () => {
    easterEggCounterElem.textContent = 'Easter eggs found: ' + easterEggsFound.filter(Boolean).length + ' / ' + easterEggsFound.length
}

var currentScroll = 0

const onScroll = (e) => {
    // if mixer is not on last frame
    var delta = e.wheelDelta || -e.detail;
    speed += delta * 0.0001;


    // check if scrolling very fast
    if (speed < -0.14 && !scrollTriggered && entered) {
        scrollTriggered = true
        if (firstStage) {
            triggerScrollCutscene()

        }
    }

}

var lightSpeed = {
    x: 0,
    y: 0,
}

let mouseDelta
const onMouseMove = (e) => {

    var x = e.clientX
    var y = e.clientY

    mouse.x = -(x / window.innerWidth) * 2 + 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;

    raycasterMouse.x = (x / window.innerWidth) * 2 - 1;
    raycasterMouse.y = -(y / window.innerHeight) * 2 + 1;


    mouseDelta = lastMouse.x - mouse.x;

    lastMouse.x = mouse.x
    lastMouse.y = mouse.y

}

const onTouchMove = (e) => {


    var x = e.clientX || e.touches[0].clientX;
    var y = e.clientY || e.touches[0].clientY;

    mouse.x = -(x / window.innerWidth) * 2 + 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;
    

    raycasterMouse.x = (x / window.innerWidth) * 2 - 1;
    raycasterMouse.y = -(y / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(raycasterMouse, camera);

    intersects = raycaster.intersectObjects([invisibleButton, wallTop, eggRoss, eggHead,sparrow, egg, ...keypadNumbers, deleteButton, sendButton ], true)

    var delta = lastMouse.y - mouse.y
    speed += delta * 0.1;


    currentScroll += delta


    if (speed < -0.14 && entered) {
        scrollTriggered = true
        if (firstStage) {
            triggerScrollCutscene()

        }
    }

    lastMouse.x = mouse.x
    lastMouse.y = mouse.y
}


const onTouchStart = (e) => {
    music.play();
    
    var x = e.clientX || e.touches[0].clientX;
    var y = e.clientY || e.touches[0].clientY;


    raycasterMouse.x = (x / window.innerWidth) * 2 - 1;
    raycasterMouse.y = -(y / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(raycasterMouse, camera);

    intersects = raycaster.intersectObjects([invisibleButton, wallTop, eggRoss, eggHead,sparrow, egg, ...keypadNumbers, deleteButton, sendButton ], true)
    // intersects = raycaster.intersectObjects([ invisibleButton, wallTop, eggRoss, eggHead], true)

    mouse.x = -(x / window.innerWidth) * 2 + 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;



    lastMouse.x = mouse.x
    lastMouse.y = mouse.y
    console.log('once');
    onClick(e)

}

const triggerGsap = () => {
    var child = egg.children[0]
    // console.log(child.rotation.y);
    var quarterRotation = Math.PI / 2;
    var desiredRotation = (child.rotation.y + quarterRotation);
    var obj = {
        y: child.rotation.y
    }
    gsap.to(obj, {
        duration: 1.5,
        // y += 90 degrees
        y: desiredRotation,
        ease: "power2.inOut",
        onUpdate: function () {
            // also allow scroll while animating
            child.rotation.y = obj.y
        }
        ,
        onComplete: () => {
            triggerGsap();

        }
    })


}

const gsapLogoBloom = (turningOn) => {
if (turningOn) {
    gsap.to(bloomPassLogos, {
        duration: 1,
        ease: 'power2.out',
        strength: 3,
    })

    var intensity = debugObject.envMapIntensity
    gsap.to(debugObject, {
        duration: 1,
        ease: 'power2.out',
        envMapIntensity: 0.1,
        onUpdate: () => {
            // console.log(intensity);
            updateAllMaterials()
        }

    }, 
    )
     
    for (const piece of piecesToExpand) {
        gsap.to(piece.scale, {
            duration: 1,
            ease: 'power2.out',
            x: 1.1,
            y: 1.1,
            z: 1.1,
        })

    }

} else {
    gsap.to(bloomPassLogos, {
        duration: 1,
        ease: 'power2.out',
        strength: 0.0,
    })

    var intensity = debugObject.envMapIntensity
    gsap.to(debugObject, {
        duration: 1,
        ease: 'power2.out',
        envMapIntensity: 0.3,
        onUpdate: () => {
            // console.log(intensity);
            updateAllMaterials()
        }

    })
    // .onChange(() => {
    //     // console.log(intensity);
    //     updateAllMaterials()
    // })



 

    for (const piece of piecesToExpand) {
        gsap.to(piece.scale, {
            duration: 1,
            ease: 'power2.out',
            x: 1,
            y: 1,
            z: 1,
        })

    }


}

}

let firstStage = true

var currentRotation = 0
var worldPosition = new THREE.Vector3()
var worldPositionHuman = new THREE.Vector3()
let intersects

var lookAt = new THREE.Vector3(0, 0, 0)

var distanceToTarget = 0


var lerpSpeed = 0.3

const transitionElement = document.querySelector('#transition')

const gsapWalls = (visible) => {
    if (visible ) {
        wallsToDisable.forEach(wall => {
          wall.traverse((child) => {
            if (child.isMesh) {
                
                gsap.to(child.material, {
                    duration: 1,
                    opacity: 1,
                    ease: 'power2.out',
           
                })
            }
          }
            )
        });
    } else {
        wallsToDisable.forEach(wall => {
            wall.traverse((child) => {
                if (child.isMesh) {
                    gsap.to(child.material, {
                        duration: 1,
                        opacity: 0,
                        ease: 'power2.out',
                    })

                }
            }
            )

        });
    }
}

const animateTransition =(delta) => {

    // get transform from css
    var transform = window.getComputedStyle(transitionElement).getPropertyValue('transform')
    // translate Y
    var translateY = transform.split(',')[5].split(')')[0]
    var futureTranslation = - window.innerHeight / 100 * 50 + parseFloat(delta * 400)
    // continue here
    transitionElement.style.transform = 'translateY(' +  futureTranslation+ 'px)'
}

let once = true
let once2 = true
var once3 = true
var flickering  = false

const flickerLights = () => {
    var randomnessFactor = 0.1
    var duration = Math.random() * randomnessFactor  * 2

    gsap.to(pointLight4, {
        duration: duration,
        intensity: 16.2,
        ease: 'power2.out',
        onComplete: () => {
            var duration2 = Math.random() * randomnessFactor 
                setTimeout( () => {
    if (flickering) {

            gsap.to(pointLight4, {
                duration: duration2,
                intensity: 2,
                ease: 'power2.out',
                onComplete: () => {
                            flickerLights()
    
       
                }, onUpdate: () => {
            // ambientLight.intensity = pointLight4.intensity / 16.2 / 3.33

                }
            })
        } else {
            ambientLight.intensity = 0.3
        }
        }, Math.random() * 25000 * randomnessFactor)
        },
        onUpdate: () => {
            // ambientLight.intensity = pointLight4.intensity / 16.2 / 3.33
            // console.log(ambientLight.intensity);
        }
    })


}

function renderBloom( mask ) {

    if ( mask === true ) {
        scene.background = new THREE.Color('black')
        // renderer.setClearColor(0x000000); // all must be black, including background
        scene.traverse(darkenNonBloomed);
        bloomComposer.render();
        if (envMap) {
        scene.background = envMap

        }
        // renderer.setClearColor(0x006432); // set the color you want
        scene.traverse(restoreMaterial);

    } else {

        camera.layers.set( BLOOM_SCENE );
        bloomComposer.render();
        camera.layers.set( ENTIRE_SCENE );

    }

}

function darkenNonBloomed( obj ) {

    if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {

        materials[ obj.uuid ] = obj.material;
        obj.material = darkMaterial;

    }

}

function restoreMaterial( obj ) {

    if ( materials[ obj.uuid ] ) {

        obj.material = materials[ obj.uuid ];
        delete materials[ obj.uuid ];

    }

}

let hoveredEgg = false


const tick = () => {
    var currentTime
    // stats.update()

    if (!isMobile) {
        switch ( params.scene ) {

            case 'Scene only':
                renderer.render( scene, camera );
                break;
            case 'Glow only':
                renderBloom( false );
                break;
            case 'Scene with Glow':
            default:
                // render scene with bloom
                renderBloom( true );
    
                // render the entire scene, then render bloom scene on top
                break;
    
        }
    
    }
  
    
    if (egg && eggRoss && !isMobile) {
    raycaster.setFromCamera(raycasterMouse, camera);

        // console.log(invisibleButton, wallTop, eggRoss, eggHead, sparrow);m
        intersects = raycaster.intersectObjects([invisibleButton, wallTop, eggRoss, eggHead,sparrow, egg, ...keypadNumbers, deleteButton, sendButton ], true)
        // intersects = raycaster.intersectObjects(scene.children, true)
        if (intersects.length > 0 && intersects[0].object.name.toLowerCase().includes('vliq') == false && intersects[0].object.name.toLowerCase().includes('behind') == false) {


            // if (intersects.length > 0) {
            document.body.style.cursor = 'pointer'

            // if egg was intersected
            var isEggChild = false
            egg.traverse((child) => {
                if (child == intersects[0].object) {
                    isEggChild = true
                }
            })


            if (isEggChild && !hoveredEgg) {
                hoveredEgg = true
                gsapLogoBloom(true)

            } else if (!isEggChild && hoveredEgg) {
                hoveredEgg = false
                gsapLogoBloom(false)

            }

        } else {

            document.body.style.cursor = 'default'
            hoveredEgg = false
            gsapLogoBloom(false)

        }


    }


    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    // Update controls
    controls.update()

    if (birdMixer && birdAnimating && deltaTime < 1)
        birdMixer.update(deltaTime)


    if (mixer) {
       currentTime = mixer._actions[0].time
        // console.log(currentTime);
        if (currentTime >= 0.2 && mixer._actions[0].time - speed > 0.1 && currentTime < 23) {
            mixer.update(-speed)
            if (currentTime <5.5) {

                firstStage = true
                if (once2) {
                    gsapWalls(true)
                once2 = false       
                once = true             
                }
            } else {
                if (currentTime > 13.5 && currentTime < 15) {
                    pointLight5.intensity = (currentTime - 13.5) * 27
                }
                if (currentTime > 13.5 && currentTime < 13.55 && once3) {
                    flickering = true
                    flickerLights();
                    once3 = false
                } else if (currentTime <= 10.5) {
                    flickering = false
                    once3 = true
                }
                firstStage = false
                // console.log('second stage');
                if (once) {
                    gsapWalls(false)
                once = false                    
                once2 = true
                }


                animateTransition(mixer._actions[0].time - 5.5)

  
            }
        } else {
            if (currentTime >= 23) {
                mixer._actions[0].time = 22.999999
            } else {
                mixer._actions[0].time = 0.2
            }
        }

    }

    var pos = pointLight.position;
    var pointLightIn2D = new THREE.Vector3(pos.x, pos.y, pos.z).project(camera);


    var diffX = mouse.x - pointLightIn2D.x;
    var diffY = mouse.y - pointLightIn2D.y;

    const parallaxX = (mouse.x + 4) * 2



    lightSpeed.x = diffX;
    lightSpeed.y = diffY;
    if (object && egg) {

        var child = egg
        child.getWorldPosition(worldPosition)
        human.updateMatrixWorld()
     
        camera.position.y = worldPosition.y + 4.5
        var worldQuaternionOctaneCamera = new THREE.Quaternion()
        var worldPositionOctaneCamera = new THREE.Vector3()
        octaneCamera.getWorldQuaternion(worldQuaternionOctaneCamera)
        octaneCamera.getWorldPosition(worldPositionOctaneCamera)
    
        worldQuaternionOctaneCamera.normalize()
    if (!isMobile) {
        worldPositionOctaneCamera.x += (parallaxX - worldPositionOctaneCamera.x) * 0.025

    }
    
        camera.position.lerp(worldPositionOctaneCamera, 1)
    
    // camera.position.copy(worldPositionOctaneCamera)
    camera.rotation.copy(octaneCamera.rotation)
    camera.up = octaneCamera.up
    
    var slerpQuaternion = new THREE.Quaternion().slerpQuaternions(camera.quaternion, worldQuaternionOctaneCamera, 1)

    var vec = new THREE.Vector3(0, 0, 1)
    vec.applyQuaternion(slerpQuaternion)

    var lookAtVector = new THREE.Vector3(0,0, -1)
    octaneCamera.getWorldDirection(lookAtVector)
        var world = octaneCamera.localToWorld(lookAtVector)
        // camera.lookAt(world)
    
    camera.quaternion.copy(slerpQuaternion)

        if (firstStage) {

            pointLight.position.x += lightSpeed.x * 0.099;
            pointLight.position.y += lightSpeed.y * 0.099;
            pointLight.position.z = worldPosition.z + 3;

            pointLight2.position.x -= lightSpeed.x * 0.1;
            pointLight2.position.y += lightSpeed.y * 0.1;
            pointLight2.position.z = worldPosition.z + 3;

        }

        // parralax camera


        if (!isMobile)
            // camera.position.x = worldPosition.x * 2 + (diffToCenterX * 2) + 6
            // console.log(parallaxX);
            //    camera.position.z -= (camera.position.z - (17)) * 0.1

        // camera.position.z = (mouse.y * 1.5 + 1.5) * 2 + 10

        if (worldPositionPan) {

            pointLight2.position.y = Math.max(pointLight2.position.y, worldPositionPan.y + 1.5)
            pointLight.position.y = Math.max(pointLight.position.y, worldPositionPan.y + 1.5)
        }

        if (firstStage) {

       
                lookAt.lerp(worldPosition, lerpSpeed)
                if (currentTime < 5.1) {
                    if (lerpSpeed < 0.5) {
                        lerpSpeed += 0.01
                    }
                } else {         
                    lerpSpeed = 0.1
                }
                




            // camera.lookAt(lookAt)
        } else {
            var body = human.children[0].children[7]

            worldPositionHuman.fromBufferAttribute(body.geometry.attributes.position, 15)
            body.boneTransform(15, worldPositionHuman)
            body.updateMatrixWorld()
            worldPositionHuman.applyMatrix4(body.matrixWorld)
            // lookAt.copy(worldPositionHuman)

            const destination = new THREE.Vector3().copy(worldPositionHuman)

            destination.x += 0
            destination.y += 5

    var vek = new THREE.Vector3(0,0,-1)
    vek.applyQuaternion(octaneCamera.quaternion)


    var localVector = octaneCamera.localToWorld(vek)

var xNegative = debugObject.xNegative
var yNegative = debugObject.yNegative
var zNegative = debugObject.zNegative

    // camera.lookAt(
    //     new THREE.Vector3(
    //         xNegative ? -localVector.x : localVector.x,
    //         yNegative ? -localVector.y : localVector.y,
    //         zNegative ? -localVector.z : localVector.z
    //     )
    // )

    // console.log(localVector);




    //         const desiredPosition = new THREE.Vector3(
    //             -octaneCamera.position.x / 100,
    //             // octaneCamera.position.y / 100,
    //             octaneCamera.position.y / 100,
    //             -octaneCamera.position.z / 100
    //         )

       
                // camera.position.set(
                //     desiredPosition.x,
                //     desiredPosition.y,
                //     desiredPosition.z
                // )

                var parent = octaneCamera.parent
  
            
        }
     
        currentRotation = child.rotation.y

    }

    if (mixer) {
        // mixer.update(deltaTime)
    }

    speed *= 0.94;
    lightSpeed.x *= 0.94;
    lightSpeed.y *= 0.94;

    // Render
    composer.render(deltaTime)
    // renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

const clickMaps = {
    'sparrow': bird,
    'InvisibleButton(EasterEgg3mp4)': invisible,
    'Extrude010': ross, 
    'EggGold002': eggHeadElement,
}

const videoEnded = (e) => {
    const element = e.target.parentElement
    gsap.to(element, {
        duration: 1,
        top: '-200%',
        ease: "power2.inOut",
    })

    element.removeEventListener('ended', videoEnded)


}

var currentButtonGsap = null

const pressButton = (button, isNumber) => {

    // set random volume
    keypress.volume = Math.random() * 0.3 + 0.7
    

    var index = keypadNumbers.indexOf(button)

    var indexesPlayback = {
        0: 0.9,
        1: 1,
        2: 0.9,
        3: 0.95,
        4: 0.92,
        5: 0.98,
        6: 1,
        7: 0.85,
        8: 0.95,
        9: 0.9,

    }

    // random pitch
    keypress.preservesPitch = false
    keypress.playbackRate =!isNumber ? 1 :   indexesPlayback[index]




    keypress.currentTime = 0.2
    keypress.play()

    if (currentButtonGsap) {
        currentButtonGsap.kill()
    }
   currentButtonGsap = gsap.to(button.scale, {
        duration: 0.1,
        y:isNumber ? 1 : 0.6,
        x: isNumber ? 0.6 : 1,
        ease: "power2.out",
    })
    gsap.to(button.scale, {
        duration: 0.3,
        delay: 0.1,
        y: 1,
        x: 1,
        ease: "power2.out",
        
    })
}

const onClick = () => {
    music.play();

    // controls.target = intersects[0].point
    const element = clickMaps[intersects[0].object.name]


    
    if (intersects[0].object.name.includes('Cube4')) {
        var name = intersects[0].object.name
        var index = name.split('Cube4_')[1]
        if (screenText.length < 9) {

            screenText += index

        drawCanvas()
            
        }
        pressButton(intersects[0].object, true)
    }

    if (intersects[0].object.name == 'Cylinder') {
        if (screenText.length > 0) {
            screenText = screenText.slice(0, -1)
            drawCanvas()
        }
        var cylinder = intersects[0].object
        pressButton(cylinder, false)

    }
    if (intersects[0].object.name == 'Cylinder003') {
        var cylinder = intersects[0].object
        pressButton(cylinder, false)
        
    }


    if (intersects[0].object.name === 'sparrow') {
        easterEggsFound[0]  = true
    } else if (intersects[0].object.name === 'InvisibleButton(EasterEgg3mp4)') {
        easterEggsFound[1]  = true
    } else if (intersects[0].object.name === 'Extrude010') {
        easterEggsFound[2]  = true
    } else if (intersects[0].object.name === 'EggGold002') {
        easterEggsFound[3]  = true
    }

    updateEasterEggsFound();



    if (element) {
        element.children[0].addEventListener('ended', videoEnded)
        gsap.to(element,
            {
                duration: 1,
                top: '0%',
                ease: "power2.inOut",
            }
        )
     
            element.children[0].play()

            // setTimeout(() => {
            //     gsap.to(element, {
            //         duration: 1,
            //         top: '-200%',
            //         ease: "power2.inOut",
            //     })

            // }, 2000)
    }
}



tick()