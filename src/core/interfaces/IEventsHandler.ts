import {KeyBinding} from "../KeyBinding";


export interface IEventsHandler {
    
    actions: { [action: string]: KeyBinding };
    
    // 按键事件处理
    handleKeyboardEvent(event: KeyboardEvent, code: string, pressed: boolean): void;
    
    // 鼠标按键事件处理
    handleMouseButton(event: MouseEvent, code: string, pressed: boolean): void;
    
    // 鼠标移动事件处理
    handleMouseMove(event: MouseEvent, deltaX: number, deltaY: number): void;
    
    // 鼠标滚轮事件处理
    handleMouseWheel(event: WheelEvent, value: number): void;
    
    // 事件处理初始化
    eventsHandlerInit(): void;
    
    // 事件处理更新状态
    eventsHandlerUpdate(timeStep: number): void;
}
