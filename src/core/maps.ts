import MapboxGL from "mapbox-gl";
import {IEventsHandler} from "./interfaces/IEventsHandler";
import {IUpdatable} from "./interfaces/IUpdatable";
import {KeyBinding} from "./KeyBinding";
import AnyLayer$1 from "mapbox-gl";


export class WorldMap implements IEventsHandler, IUpdatable {
    
    public map: MapboxGL.Map;

    public actions: { [action: string]: KeyBinding };
    
    constructor(mapContainer: HTMLElement) {

        MapboxGL.accessToken = 'pk.eyJ1Ijoic2FubWFrbyIsImEiOiJjbTIycGlqdDEwYW96MmpwbnhpdjZvMmlqIn0.xr1kkkcZLk2Zowu0pAq0KQ';

        this.map = new MapboxGL.Map({
            container: mapContainer,
            // style: 'mapbox://styles/mapbox/satellite-v9',
            // style: 'mapbox://styles/mapbox/outdoors-v12',
            style: 'mapbox://styles/mapbox/light-v11',
            center: [148.9819, -35.3981],
            zoom: 17,
            projection: 'globe', // 默认平面图，这个是配置球形
            // scrollZoom: false,
            pitch: 60, // 60度倾角视图
            attributionControl: false,   	// 隐藏地图所属信息
            logoPosition: 'bottom-right',   // 修改logo位置
            bearing: -12, // 地图的初始方位角（指北方向，顺时针，单位：°），若未设置，则在style里查找，若style也未设置，则默认为0°
            // interactive: false, // 交互开关
            boxZoom: false,
            doubleClickZoom: false,
            dragPan: false,
            dragRotate: false,
            keyboard: false,
            // scrollZoom: false, // 滚轮控制地图层级
            touchPitch: false,
            touchZoomRotate: false,
            antialias: true // 是否需要平滑，若true，则使用MSAA(MultiSampling Anti-Aliasing)。默认false性能优化
        });
        
    }
    
    addLayerAfterStyleLoad(layer: AnyLayer$1, beforeId?: string): void {
        this.map.on('style.load', () => {
            this.map.addLayer(layer, beforeId);
        });
    }

    eventsHandlerInit(): void {
    }

    eventsHandlerUpdate(timeStep: number): void {
    }

    getOrder(): number {
        return 0;
    }

    handleKeyboardEvent(event: KeyboardEvent, code: string, pressed: boolean): void {
    }

    handleMouseButton(event: MouseEvent, code: string, pressed: boolean): void {
    }

    handleMouseMove(event: MouseEvent, deltaX: number, deltaY: number): void {
    }

    handleMouseWheel(event: WheelEvent, value: number): void {
    }

    update(timeStep: number, unscaledTimeStep: number): void {
    }
    
}
