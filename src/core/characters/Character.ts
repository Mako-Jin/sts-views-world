import * as Three from "three";
import {IWorldEntity} from "../interfaces/IWorldEntity";
import {EntityType} from "../enums/EntityType";
import {ParallelWorld} from "../world";
import {ICharacterState} from "../interfaces/ICharacterState";
import {Idle} from "./states/Idle";
import {KeyBinding} from "../KeyBinding";


export class Character extends Three.Object3D implements IWorldEntity {

    public entityType: EntityType = EntityType.Character;

    public world: ParallelWorld;
    public charState: ICharacterState;

    public actions: { [action: string]: KeyBinding };

    public mixer: Three.AnimationMixer;
    public animations: any[];

    public modelScale: Three.Vector3;
    public orientation: Three.Vector3 = new Three.Vector3(0, 0, 1);
    public orientationTarget: Three.Vector3 = new Three.Vector3(0, 0, 1);
    
    constructor(gltf: any) {
        super();

        this.setAnimations(gltf.animations);

        this.mixer = new Three.AnimationMixer(gltf.scene);

        // Actions
        this.actions = {
            'up': new KeyBinding('KeyW'),
            'down': new KeyBinding('KeyS'),
            'left': new KeyBinding('KeyA'),
            'right': new KeyBinding('KeyD'),
            'run': new KeyBinding('ShiftLeft'),
        };
        
        // States
        this.setState(new Idle(this));
    }
    
    addToWorld(world: ParallelWorld): void {
        if (world.characters.some(e => e === this)) {
            console.warn('Adding character to a world in which it already exists.');
        } else {
            // Set world
            this.world = world;

            // Register character
            world.characters.push(this);
        }
    }

    getOrder(): number {
        return 1;
    }

    removeFromWorld(world: ParallelWorld): void {
    }

    update(timeStep: number, unscaledTimeStep: number): void {
    }

    public setAnimations(animations: []): void {
        this.animations = animations;
    }

    public setAnimation(clipName: string, fadeIn: number): number {
        if (this.mixer !== undefined) {
            // gltf
            let clip = Three.AnimationClip.findByName( this.animations, clipName );

            let action = this.mixer.clipAction(clip);
            if (action === null) {
                console.error(`Animation ${clipName} not found!`);
                return 0;
            }

            this.mixer.stopAllAction();
            action.fadeIn(fadeIn);
            action.play();

            return action.getClip().duration;
        }
    }

    public setState(state: ICharacterState): void {
        this.charState = state;
        this.charState.onInputChange();
    }

    public setPosition(x: number, y: number, z: number): void {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    public setOrientation(vector: Three.Vector3, instantly: boolean = false): void {
        let lookVector = new Three.Vector3().copy(vector).setY(0).normalize();
        this.orientationTarget.copy(lookVector);

        if (instantly) {
            this.orientation.copy(lookVector);
        }
    }

    public takeControl(): void {
        if (this.world !== undefined) {
            // this.world.inputManager.setInputReceiver(this);
        } else {
            console.warn('Attempting to take control of a character that doesn\'t belong to a world.');
        }
    }

    public setScale(scale: Three.Vector3): void {
        this.modelScale = scale;
    }
    
}
