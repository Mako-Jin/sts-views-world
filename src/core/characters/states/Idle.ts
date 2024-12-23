import {Character} from "../Character";
import {BaseCharacterState} from "./BaseCharacterState";



export class Idle extends BaseCharacterState {
    
    constructor(character: Character) {
        super(character);

        // this.character.velocitySimulator.damping = 0.6;
        // this.character.velocitySimulator.mass = 10;
        //
        // this.character.setArcadeVelocityTarget(0);
        this.playAnimation('idle', 0.1);
    }

    public update(timeStep: number): void {
        super.update(timeStep);

        // this.fallInAir();
    }
    
    public onInputChange(): void {
        super.onInputChange();

        // if (this.character.actions.jump.keyDown) {
        //     this.character.setState(new JumpIdle(this.character));
        // }

        // if (this.anyDirection()) {
        //     if (this.character.velocity.length() > 0.5) {
        //         this.character.setState(new Walk(this.character));
        //     } else {
        //         this.setAppropriateStartWalkState();
        //     }
        // }
    }
}
