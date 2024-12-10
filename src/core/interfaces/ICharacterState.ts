

export interface ICharacterState {
    // Find a suitable car and run towards it
    canFindVehiclesToEnter: boolean; 
    // Actually get into the vehicle
    canEnterVehicles: boolean; 
    
    canLeaveVehicles: boolean;

    update(timeStep: number): void;
    
    onInputChange(): void;
}
