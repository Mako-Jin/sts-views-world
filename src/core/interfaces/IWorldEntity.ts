import {IUpdatable} from "./IUpdatable";
import {ParallelWorld} from "../world";
import {EntityType} from "../enums/EntityType";


export interface IWorldEntity extends IUpdatable {
    
    entityType: EntityType;

    addToWorld(world: ParallelWorld): void;
    
    removeFromWorld(world: ParallelWorld): void;
}

