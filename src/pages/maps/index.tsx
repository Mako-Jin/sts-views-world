import {useEffect, useRef} from "react";
import MapboxGL from "mapbox-gl";
import * as Three from "three";

import 'mapbox-gl/dist/mapbox-gl.css';
import "/@/styles/maps.scss";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {ParallelWorld} from "../../core/world";

const MapsView = () => {
    
    const mapContainerRef = useRef(null);

    useEffect(() => {
        new ParallelWorld(mapContainerRef.current);
        // 地形图层
        // map.on('style.load', () => {
        //     map.addSource('mapbox-dem', {
        //         'type': 'raster-dem',
        //         'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        //         'tileSize': 512,
        //         'maxzoom': 14
        //     });
        //     map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        //
        //     // 获取地图中所有的图层
        //     const layers = map.getStyle().layers;
        //
        //     // 遍历所有图层，获取名称
        //     layers.forEach(function(layer){
        //         console.log(layer); // 打印所有图层的名称
        //     });
        // });

        // configuration of the custom layer for a 3D model per the CustomLayerInterface
        // 人物图层
        // parameters to ensure the model is georeferenced correctly on the map
        // const modelOrigin = [148.9819, -35.39847];
        // const modelAltitude = 0;
        // const modelRotate = [Math.PI / 2, 0, 0];
        //
        // const modelAsMercatorCoordinate = MapboxGL.MercatorCoordinate.fromLngLat(
        //     modelOrigin,
        //     modelAltitude
        // );
        //
        // // transformation parameters to position, rotate and scale the 3D model onto the map
        // const modelTransform = {
        //     translateX: modelAsMercatorCoordinate.x,
        //     translateY: modelAsMercatorCoordinate.y,
        //     translateZ: modelAsMercatorCoordinate.z,
        //     rotateX: modelRotate[0],
        //     rotateY: modelRotate[1],
        //     rotateZ: modelRotate[2],
        //     /* Since the 3D model is in real world meters, a scale transform needs to be
        //      * applied since the CustomLayerInterface expects units in MercatorCoordinates.
        //      */
        //     scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
        // };
        //
        // const customLayer = {
        //     id: '3d-model',
        //     type: 'custom',
        //     renderingMode: '3d',
        //     onAdd: function (map, gl) {
        //         this.camera = new Three.PerspectiveCamera(
        //             80, window.innerWidth / window.innerHeight, 0.1, 1010
        //         );
        //         this.scene = new Three.Scene();
        //
        //         // create two three.js lights to illuminate the model
        //         const directionalLight = new Three.DirectionalLight(0xffffff);
        //         directionalLight.position.set(0, -70, 100).normalize();
        //         this.scene.add(directionalLight);
        //
        //         const directionalLight2 = new Three.DirectionalLight(0xffffff);
        //         directionalLight2.position.set(0, 70, 100).normalize();
        //         this.scene.add(directionalLight2);
        //
        //         // use the three.js GLTF loader to add the 3D model to the three.js scene
        //         const loader = new GLTFLoader();
        //         loader.load(
        //             '/assets/models/Xbot.glb',
        //             (gltf) => {
        //                 this.scene.add(gltf.scene);
        //             }
        //         );
        //         this.map = map;
        //
        //         // use the Mapbox GL JS map canvas for three.js
        //         this.renderer = new Three.WebGLRenderer({
        //             canvas: map.getCanvas(),
        //             context: gl,
        //             antialias: true
        //         });
        //
        //         this.renderer.autoClear = false;
        //     },
        //     render: function (gl, matrix) {
        //         const rotationX = new Three.Matrix4().makeRotationAxis(
        //             new Three.Vector3(1, 0, 0),
        //             modelTransform.rotateX
        //         );
        //         const rotationY = new Three.Matrix4().makeRotationAxis(
        //             new Three.Vector3(0, 1, 0),
        //             modelTransform.rotateY
        //         );
        //         const rotationZ = new Three.Matrix4().makeRotationAxis(
        //             new Three.Vector3(0, 0, 1),
        //             modelTransform.rotateZ
        //         );
        //
        //         const m = new Three.Matrix4().fromArray(matrix);
        //         const l = new Three.Matrix4()
        //             .makeTranslation(
        //                 modelTransform.translateX,
        //                 modelTransform.translateY,
        //                 modelTransform.translateZ
        //             )
        //             .scale(
        //                 new Three.Vector3(
        //                     modelTransform.scale,
        //                     -modelTransform.scale,
        //                     modelTransform.scale
        //                 )
        //             )
        //             .multiply(rotationX)
        //             .multiply(rotationY)
        //             .multiply(rotationZ);
        //
        //         this.camera.projectionMatrix = m.multiply(l);
        //         this.renderer.resetState();
        //         this.renderer.render(this.scene, this.camera);
        //         this.map.triggerRepaint();
        //     }
        // };
        // 
        //
        // // 控制
        // const deltaDegrees = 25;
        //
        // const easing = (t) => {
        //     return t * (2 - t);
        // }

        // map.on('load', () => {
        //     map.getCanvas().focus();
        //     map.getCanvas().parentNode.classList.remove('mapboxgl-interactive');
        //    
        //     // TODO 待优化，操作不是很稳定灵活
        //     map.getCanvas().addEventListener(
        //         "mousemove",
        //         (e) => {
        //             e.preventDefault();
        //             if (e.movementX > 0) {
        //                 // 向右旋转角度
        //                 map.easeTo({
        //                     bearing: map.getBearing() + deltaDegrees,
        //                     easing: easing
        //                 });
        //             } else if (e.movementX < 0) {
        //                 // 向左旋转角度
        //                 map.easeTo({
        //                     bearing: map.getBearing() - deltaDegrees,
        //                     easing: easing
        //                 });
        //             } else {
        //                 // === 0 保持不动， do nothing
        //             }
        //                
        //             if (e.movementY > 0 && map.getPitch() + deltaDegrees < 90) {
        //                 // 向上旋转视角，需要添加极限
        //                 map.easeTo({
        //                     pitch: map.getPitch() + deltaDegrees,
        //                     easing: easing
        //                 });
        //             } else if (e.movementY < 0 && map.getPitch() + deltaDegrees > 0) {
        //                 // 向下旋转视角，需要添加极限
        //                 map.easeTo({
        //                     pitch: map.getPitch() - deltaDegrees,
        //                     easing: easing
        //                 });
        //             } else {
        //                
        //             }
        //         },
        //         true,
        //     );
        //
        //     // 滚轮控制地图层级
        //     // map.getCanvas().addEventListener(
        //     //     "wheel",
        //     //     (e) => {
        //     //         if (e.deltaY === 100) {
        //     //             // 缩小层级
        //     //             map.easeTo({
        //     //                 zoom: map.getZoom() - 1,
        //     //                 easing: easing,
        //     //             })
        //     //         } else if (e.deltaY === -100) {
        //     //             // 放大层级
        //     //             map.easeTo({
        //     //                 zoom: map.getZoom() + 1,
        //     //                 easing: easing,
        //     //             })
        //     //         }
        //     //     },
        //     //     true,
        //     // );
        // });

    }, [])

    return (
        <>
            <div className='map-container' ref={mapContainerRef} />
        </>
    );

}

export default MapsView;
