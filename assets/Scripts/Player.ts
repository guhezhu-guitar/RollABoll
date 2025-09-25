import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property
    public speed = 5;

     private moveDir:Vec2 = Vec2.ZERO

    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN,this.onkeyDown,this);
        input.on(Input.EventType.KEY_PRESSING,this.onkeyPressing,this);
        input.on(Input.EventType.KEY_UP,this.onkeyUp,this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN,this.onkeyDown,this);
        input.off(Input.EventType.KEY_PRESSING,this.onkeyPressing,this);
        input.off(Input.EventType.KEY_UP,this.onkeyUp,this);
    }
    

    onkeyDown(event:EventKeyboard){   //在方法中声明event事件,类型是键盘事件
        //console.log('onkeyDown'+event.keyCode);  //键盘对于的码,输出的是哪个按键被触发了,触发的是什么按键的码
        switch(event.keyCode){
            case KeyCode.KEY_A:
            this.moveDir =new Vec2(-1,this.moveDir.y);
            break;
            case KeyCode.KEY_D:
            this.moveDir = new Vec2(1,this.moveDir.y);
            break;
            case KeyCode.KEY_W:
            this.moveDir =new Vec2(this.moveDir.x,1);
            break;
            case KeyCode.KEY_S:
            this.moveDir =new Vec2(this.moveDir.x,-1);
            break;
        }
    }


    onkeyUp(event:EventKeyboard){
        // console.log('onkeyUp'+event.keyCode);
        switch(event.keyCode){
            case KeyCode.KEY_A:
            this.moveDir.x =0;
            break;
            case KeyCode.KEY_D:
            this.moveDir.x =0;
            break;
            case KeyCode.KEY_W:
            this.moveDir.y =0;
            break;
            case KeyCode.KEY_S:
            this.moveDir.y =0;
            break;
        }

    }

    //修改持续修改时候的运动逻辑
    onkeyPressing(event:EventKeyboard){
        // console.log('onkeyPressing'+event.keyCode);
        // const pos = this.node.position;
        // switch(event.keyCode){
        //     case KeyCode.KEY_A:
        //         this.node.setPosition(pos.x,pos.y,pos.z-0.2);
        //         break;
        //     case KeyCode.KEY_D:
        //         this.node.setPosition(pos.x,pos.y,pos.z+0.2);
        //         break;
        //     case KeyCode.KEY_W:
        //     this.node.setPosition(pos.x+0.2,pos.y,pos.z);
        //     break;
        //     case KeyCode.KEY_S:
        //     this.node.setPosition(pos.x-0.2,pos.y,pos.z);
        //     break;

        // }
    }

    //根据每一帧的速度更新小球的位置
    protected update(dt:number):void{
        const pos =this.node.position;
        this.node.setPosition(pos.x+this.moveDir.y*this.speed*dt,pos.y,pos.z+this.moveDir.x*this.speed*dt);

    }

//     start() {

//     }

//     update(deltaTime: number): {

        
//     }
}
