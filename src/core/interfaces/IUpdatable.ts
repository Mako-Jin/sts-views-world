

export interface IUpdatable {
    
    getOrder(): number;
    
    update(timeStep: number, unscaledTimeStep: number): void;
}
