import * as Three from "three";
import MapboxGL from "mapbox-gl";
import {WorldMap} from "./maps";
import {Character} from "./characters/Character";
import {LoadingManager} from "./loading";
import {IUpdatable} from "./interfaces/IUpdatable";
import {IWorldEntity} from "./interfaces/IWorldEntity";
import {Vector3} from "three";
import {c} from "vite/dist/node/types.d-aGj9QkWt";


interface Settings {
    pointerLock: boolean,
    mouseSensitivity: number,
    timeScale: number,
    shadows: boolean,
    fXAA: boolean,
    debugPhysics: boolean,
    debugFPS: boolean,
    sunElevation: number,
    sunRotation: number,
}


export class ParallelWorld {
    
    public worldMap: WorldMap;

    public characters: Character[] = [];

    public timeScaleTarget: number = 1;

    public params: Settings;

    // public scenarios: Scenario[] = [];
    public updatableList: IUpdatable[] = [];

    constructor(worldContainer: HTMLElement) {
        this.params = {
            pointerLock: true,
            mouseSensitivity: 0.3,
            timeScale: 1,
            shadows: true,
            fXAA: true,
            debugPhysics: false,
            debugFPS: false,
            sunElevation: 50,
            sunRotation: 145,
        };
        this.worldMap = new WorldMap(worldContainer);
        let loadingManager = new LoadingManager(this);
        this.loadScene(loadingManager);
        this.update(1, 1);
        this.setTimeScale(1);
    }

    public loadScene(loadingManager: LoadingManager): void {
        loadingManager.loadGLTF('/assets/models/boxman.glb', (model) => {
            let player = new Character(model);

            const modelAsMercatorCoordinate = MapboxGL.MercatorCoordinate.fromLngLat(
                [148.9819, -35.39847],
                0
            );
            player.setPosition(modelAsMercatorCoordinate.x, modelAsMercatorCoordinate.y, modelAsMercatorCoordinate.z);
            player.setOrientation(new Vector3(Math.PI / 2, 0, 0), true);
            player.setScale(new Three.Vector3(
                modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
                -modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
                modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
            ));

            this.add(player);
            player.takeControl();

            const customLayer = {
                id: '3d-model',
                type: 'custom',
                renderingMode: '3d',
                onAdd: function (map, gl) {
                    this.camera = new Three.PerspectiveCamera(
                        80, window.innerWidth / window.innerHeight, 0.1, 1010
                    );
                    this.scene = new Three.Scene();

                    // create two three.js lights to illuminate the model
                    const directionalLight = new Three.DirectionalLight(0xffffff);
                    directionalLight.position.set(0, -70, 100).normalize();
                    this.scene.add(directionalLight);

                    const directionalLight2 = new Three.DirectionalLight(0xffffff);
                    directionalLight2.position.set(0, 70, 100).normalize();
                    this.scene.add(directionalLight2);

                    this.scene.add(model.scene);
                    // this.worldMap.map = map;

                    // use the Mapbox GL JS map canvas for three.js
                    this.renderer = new Three.WebGLRenderer({
                        canvas: map.getCanvas(),
                        context: gl,
                        antialias: true
                    });

                    this.renderer.autoClear = false;
                },
                render: function (gl, matrix) {
                    const rotationX = new Three.Matrix4().makeRotationAxis(
                        new Three.Vector3(1, 0, 0),
                        player.orientation.x
                    );
                    const rotationY = new Three.Matrix4().makeRotationAxis(
                        new Three.Vector3(0, 1, 0),
                        player.orientation.y
                    );
                    const rotationZ = new Three.Matrix4().makeRotationAxis(
                        new Three.Vector3(0, 0, 1),
                        player.orientation.z
                    );

                    const m = new Three.Matrix4().fromArray(matrix);
                    const l = new Three.Matrix4()
                        .makeTranslation(player.position.x, player.position.y, player.position.z)
                        .scale(player.modelScale)
                        .multiply(rotationX)
                        .multiply(rotationY)
                        .multiply(rotationZ);

                    this.camera.projectionMatrix = m.multiply(l);
                    this.renderer.resetState();
                    this.renderer.render(this.scene, this.camera);
                    this.worldMap.map.triggerRepaint();
                }
            };

            this.worldMap.addLayerAfterStyleLoad(customLayer, "waterway-label");
        });
    }

    public add(worldEntity: IWorldEntity): void {
        worldEntity.addToWorld(this);
        this.registerUpdatable(worldEntity);
    }

    public registerUpdatable(register: IUpdatable): void {
        this.updatableList.push(register);
        this.updatableList.sort(
            (a, b) => (a.getOrder() > b.getOrder()) ? 1 : -1
        );
    }

    public launchScenario(loadingManager?: LoadingManager): void {
        // this.clearEntities();
        //
        // // Launch default scenario
        // if (!loadingManager) loadingManager = new LoadingManager(this);
        // for (const scenario of this.scenarios) {
        //     if (scenario.id === scenarioID || scenario.spawnAlways) {
        //         scenario.launch(loadingManager, this);
        //     }
        // }
    }

    public update(timeStep: number, unscaledTimeStep: number): void {
        // this.updatePhysics(timeStep);

        // Update registred objects
        this.updatableList.forEach((entity) => {
            entity.update(timeStep, unscaledTimeStep);
        });

        // Lerp time scale
        this.params.timeScale = Three.MathUtils.lerp(this.params.timeScale, this.timeScaleTarget, 0.2);

        // Physics debug
        // if (this.params.Debug_Physics) this.cannonDebugRenderer.update();
    }

    public setTimeScale(value: number): void {
        this.params.timeScale = value;
        this.timeScaleTarget = value;
    }
    
}
