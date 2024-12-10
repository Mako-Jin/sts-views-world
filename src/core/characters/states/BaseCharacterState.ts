import {ICharacterState} from "../../interfaces/ICharacterState";
import {Character} from "../Character";


export abstract class BaseCharacterState implements ICharacterState {

    public character: Character;

    public animationLength: any;
    
    canEnterVehicles: boolean;
    canFindVehiclesToEnter: boolean;
    canLeaveVehicles: boolean;

    protected constructor(character: Character) {
        this.character = character;

        this.canFindVehiclesToEnter = true;
        this.canEnterVehicles = false;
        this.canLeaveVehicles = true;
    }

    protected playAnimation(animName: string, fadeIn: number): void {
        this.animationLength = this.character.setAnimation(animName, fadeIn);
    }

    onInputChange(): void {
    }

    update(timeStep: number): void {
    }
    
}
