if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}
var container, stats;
var camera, scene, renderer, light, bbox;
var rotating = true;
var model;
const canvas = document.getElementById('model');
let animateInterval
let counter = 0
let title = document.getElementsByClassName('title')[0]
init();
animate();
window.onload = function () {
    title.classList.add('title_transform')
    if (window.scrollY ==0)
        animateInterval = setInterval(animateOnload, 10);
};

function animateOnload() {
    // requestAnimationFrame(animate); // 请求浏览器下一次绘制动画之前执行的函数
    model.scale.set(model.scale.x + 0.1, model.scale.y + 0.1, model.scale.z + 0.1)
    model.position.y = model.position.y -0.01*0.38
    counter++
    if (counter == 90) {
        clearInterval(animateInterval);
    }

}
function init() {
    // 如果没有模型的URL，则返回false
    if (!modelUrl) {
        return false;
    }
    // 创建一个div元素容器，并将其添加到页面body中
    container = document.createElement('div');
    document.body.appendChild(container);
    // 创建一个THREE.Scene对象和一个THREE.Box3对象
    scene = new THREE.Scene();
    bbox = new THREE.Box3();
    scene.background = new THREE.Color(0xB0C4DE);
    scene.rotation.y += 135;
    // 创建一个THREE.HemisphereLight对象，设置光照参数
    light = new THREE.AmbientLight("0x000000", 1);
    light.position.set(0, 1, 0);
    // 将光照对象添加到场景中
    scene.add(light);
    // 创建一个THREE.GLTFLoader对象
    var loader = new THREE.GLTFLoader();
    // 加载模型文件
    loader.load(modelUrl, function (gltf) {
        // 将加载的模型场景命名为'3dmodel'
        // gltf.scene.scale.set(10, 10, 10)
        gltf.scene.scale.set(1, 1, 1)
        model = gltf.scene;
        // console.log(model.position);
        gltf.scene.name = '3dmodel';
        // 将加载的模型场景设置为内容
        this.setContent(gltf.scene);
        // 将模型场景添加到场景中
        scene.add(gltf.scene);
        // animateModelScale();
    }, undefined, function (e) {
        console.error(e);
    });

    // 创建一个THREE.WebGLRenderer对象，设置抗锯齿为true
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    // 根据设备像素比调整渲染器的像素大小
    renderer.setPixelRatio(window.devicePixelRatio);
    // 设置渲染器的大小为窗口的大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 打开gamma输出
    renderer.gammaOutput = true;
    // 将渲染器的DOM元素添加到容器中
    container.appendChild(renderer.domElement);
    // 监听窗口的调整事件
    window.addEventListener('resize', onWindowResize, false);
    // 创建一个THREE.OrthographicCamera对象，设置相机的参数
    // camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1000);
    var aspect = window.innerWidth / window.innerHeight;
    var depth = 5
    var size_y = depth;
    var size_x = depth * aspect;
    camera = new THREE.OrthographicCamera(-size_x / 2, size_x / 2, size_y / 2, -size_y / 2, -100, 5000);
}

function onWindowResize() {
    // 更新相机的投影矩阵
    camera.updateProjectionMatrix();
    // 重新设置渲染器的宽高
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    requestAnimationFrame(animate); // 请求浏览器下一次绘制动画之前执行的函数
    window.addEventListener('scroll', () => {
        scrollAnimate()
    })
    renderer.render(scene, camera); // 渲染场景使用指定的相机
}

function scrollAnimate() {
    let { scrollY } = window
    let canvas = document.getElementById('model')
    let lineCanvas = document.getElementById('line')
    let cards = document.getElementById('cards')
    scrollY = window.scrollY
    if (scrollY <= 7000) {
        lineCanvas.style.opacity = '0'
    }
    if (scrollY < 2000) {
        model.scale.set(10 + scrollY * 0.005, 10 + scrollY * 0.005, 10 + scrollY * 0.005)
        model.position.y = -0.38 - scrollY * 0.0002
    }
    else if (scrollY < 3000) {
        scene.rotation.x = -(scrollY - 2000) * 0.001;
        model.position.y = -0.77998 + (scrollY - 2000) * 0.0001
    }
    else if (scrollY < 5000) {
        model.scale.set(10 + (scrollY - 1000) * 0.005, 10 + (scrollY - 1000) * 0.005, 10 + (scrollY - 1000) * 0.005)
        camera.position.x = 0.0166645 + (scrollY - 3000) * 0.0012
        model.position.y = -0.6799 - (scrollY - 3000) * 0.0001
        scene.rotation.x = -0.999877 + (scrollY - 3000) * 0.0005;
        scene.rotation.y = 135 - (scrollY - 3000) * (-(scrollY - 4000) * (scrollY - 4000) * 0.000000002 + 0.00268) * 1.06;
    }
    else if (scrollY < 7500) {
        scene.rotation.y = 133.557623407
        lineCanvas.style.opacity = (scrollY - 6000) * 0.002
        canvas.style.opacity = 1 - (scrollY - 7000) * 0.002
        cards.style.opacity = 0
    }
    else {
        canvas.style.opacity = 0
        lineCanvas.style.opacity = 0
        cards.style.opacity = (scrollY - 7500) * 0.002
    }
    // console.log(scrollY)
}

function setContent(object) {
    // 更新对象的矩阵世界
    object.updateMatrixWorld();
    // 根据对象生成一个包围盒
    const box = new THREE.Box3().setFromObject(object);
    // 计算包围盒的大小
    const size = box.getSize(new THREE.Vector3()).length();
    const boxSize = box.getSize();
    // 计算包围盒的中心点
    const center = box.getCenter(new THREE.Vector3());
    // 将对象的位置中心化
    object.position.x += object.position.x - center.x;
    object.position.y += object.position.y - center.y;
    object.position.z += object.position.z - center.z;
    // 将相机的位置设置为包围盒的中心点
    this.camera.position.copy(center);
    // 根据包围盒的长宽高，设置相机的位置
    if (boxSize.x > boxSize.y) {
        this.camera.position.z = boxSize.x * -2.85
    } else {
        this.camera.position.z = boxSize.y * -2.85
    }
    // 将相机的朝向设置为原点
    this.camera.lookAt(0, 0, 0);
}