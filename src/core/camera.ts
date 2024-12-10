import * as Three from "three";
import {IUpdatable} from "/@/core/interfaces/IUpdatable";
import {IEventsHandler} from "/@/core/interfaces/IEventsHandler";
import {KeyBinding} from "/@/core/KeyBinding";


export class CameraOperator implements IEventsHandler, IUpdatable {

    public actions: { [action: string]: KeyBinding };

    constructor(
        world: World,
        camera: Three.Camera,
        sensitivityX: number = 1,
        sensitivityY: number = sensitivityX * 0.8
    ) {
        this.world = world;
        this.camera = camera;
        this.target = new Three.Vector3();
        this.sensitivity = new Three.Vector2(sensitivityX, sensitivityY);

        this.movementSpeed = 0.06;
        this.radius = 3;
        this.theta = 0;
        this.phi = 0;

        this.onMouseDownPosition = new Three.Vector2();
        this.onMouseDownTheta = this.theta;
        this.onMouseDownPhi = this.phi;

        this.actions = {
            'forward': new KeyBinding('KeyW'),
            'back': new KeyBinding('KeyS'),
            'left': new KeyBinding('KeyA'),
            'right': new KeyBinding('KeyD'),
        };

        world.registerUpdatable(this);
    }

    eventsHandlerInit(): void {
    }

    eventsHandlerUpdate(timeStep: number): void {
    }

    getOrder(): number {
        return 4;
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
