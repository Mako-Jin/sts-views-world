import {useEffect, useRef} from "react";
import MapboxGL from "mapbox-gl";

import 'mapbox-gl/dist/mapbox-gl.css';
import "/@/styles/maps.scss";

const MapsView = () => {
    
    const mapContainerRef = useRef(null);

    useEffect(() => {
        
        MapboxGL.accessToken = 'pk.eyJ1Ijoic2FubWFrbyIsImEiOiJjbTIycGlqdDEwYW96MmpwbnhpdjZvMmlqIn0.xr1kkkcZLk2Zowu0pAq0KQ';

        const map = new MapboxGL.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            // style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [110, 30],
            zoom: 11.53,
            projection: 'globe', // 默认平面图，这个是配置球形
            // scrollZoom: false,
            pitch: 60, // 60度倾角视图
            attributionControl: false,   	// 隐藏地图所属信息
            // logoPosition: 'bottom-right',   // 修改logo位置
            // bearing: -177.2, // 地图的初始方位角（指北方向，顺时针，单位：°），若未设置，则在style里查找，若style也未设置，则默认为0°
            // interactive: false, // 交互开关
            doubleClickZoom: false,
            dragPan: false,
            dragRotate: false,
            keyboard: false,
            scrollZoom: false,
            touchPitch: false,
            touchZoomRotate: false,
        });

        map.on('style.load', () => {
            map.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 512,
                'maxzoom': 14
            });
            map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        });

    }, [])

    return (
        <>
            <div className='map-container' ref={mapContainerRef} />
        </>
    );

}

export default MapsView;