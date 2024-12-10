

export class KeyBinding {
    
    public eventCodes: string[];
    
    public keyDown: boolean = false;
    
    public keyPress: boolean = false;
    
    public keyUp: boolean = false;

    constructor(...code: string[]) {
        this.eventCodes = code;
    }
}
