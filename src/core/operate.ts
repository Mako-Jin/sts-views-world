import {IUpdatable} from "./interfaces/IUpdatable";
import {ParallelWorld} from "./world";


export class OperateManager implements IUpdatable {

    constructor(world: ParallelWorld, domElement: HTMLElement) {
        this.world = world;
        this.pointerLock = world.params.Pointer_Lock;
        this.domElement = domElement || document.body;
        this.isLocked = false;

        // Bindings for later event use
        // Mouse
        this.boundOnMouseDown = (evt) => this.onMouseDown(evt);
        this.boundOnMouseMove = (evt) => this.onMouseMove(evt);
        this.boundOnMouseUp = (evt) => this.onMouseUp(evt);
        this.boundOnMouseWheelMove = (evt) => this.onMouseWheelMove(evt);

        // Pointer lock
        this.boundOnPointerlockChange = (evt) => this.onPointerlockChange(evt);
        this.boundOnPointerlockError = (evt) => this.onPointerlockError(evt);

        // Keys
        this.boundOnKeyDown = (evt) => this.onKeyDown(evt);
        this.boundOnKeyUp = (evt) => this.onKeyUp(evt);

        // Init event listeners
        // Mouse
        this.domElement.addEventListener('mousedown', this.boundOnMouseDown, false);
        document.addEventListener('wheel', this.boundOnMouseWheelMove, false);
        document.addEventListener('pointerlockchange', this.boundOnPointerlockChange, false);
        document.addEventListener('pointerlockerror', this.boundOnPointerlockError, false);

        // Keys
        document.addEventListener('keydown', this.boundOnKeyDown, false);
        document.addEventListener('keyup', this.boundOnKeyUp, false);

        world.registerUpdatable(this);
    }
    
    getOrder(): number {
        return 3;
    }

    update(timeStep: number, unscaledTimeStep: number): void {
    }
    
}

