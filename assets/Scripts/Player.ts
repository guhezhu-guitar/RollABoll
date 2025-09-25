import { _decorator, Collider, Component, EventKeyboard, ICollisionEvent, Input, input, ITriggerEvent, KeyCode, Node, RigidBody, Vec2, Vec3 } from 'cc';
import { Food } from './Food';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property
    public speed = 5;

    //设置的作用力及其大小
    @property
    public moveForce = 5;

    //定义碰撞器组件并得到碰撞器
    private collider : Collider = null;

    //定义移动的方向,x代表左右,y代表上下
     private moveDir:Vec2 = Vec2.ZERO;
     //获取rgd(定义的节点)上的RigBody组件
     private rgd:RigidBody =null;

     protected start(): void {
         this.rgd = this.getComponent(RigidBody);

        this.collider =this.node.getComponent(Collider);
        //将碰撞事件换成触发事件
        this.collider.on('onTriggerEnter',this.onTriggerEnter,this)

        // this.collider.on('onCollisionEnter',this.onCollisionEnter,this);
        // this.collider.on('onCollisionExit',this.onCollisionExit,this);
        // this.collider.on('onCollisionStay',this.onCollisionStay,this);

     }

    protected onLoad(): void {
        //取得碰撞器组件
        //不在onlord里面触发,换到start方法里面
        // this.collider =this.node.getComponent(Collider);

        // this.collider.on('onCollisionEnter',this.onCollisionEnter,this);
        // this.collider.on('onCollisionExit',this.onCollisionExit,this);
        // this.collider.on('onCollisionStay',this.onCollisionStay,this);

        input.on(Input.EventType.KEY_DOWN,this.onkeyDown,this);
        input.on(Input.EventType.KEY_PRESSING,this.onkeyPressing,this);
        input.on(Input.EventType.KEY_UP,this.onkeyUp,this);
    }
    // //监听碰撞事件
    // onCollisionEnter(event:ICollisionEvent){
    //     //设置一个food,上面获取的碰撞器是挂载着Food组件的,如果碰撞的时候没有Food节点就会返回空值
    //     const food = event.otherCollider.getComponent(Food);
    //     //检测小球是否和food发生碰撞,如果发生碰撞,则销毁food节点
    //     if(food!=null){
    //         food.node.destroy();
    //     }
    //     // console.log('onCollisionEnter');
    // }

    // onCollisionExit(){
    //     // console.log('onCollisionExit');
    // }

    // onCollisionStay(){
    //     // console.log('onCollisionStay');
    // }
    
         //监听触发事件
        onTriggerEnter(event:ITriggerEvent){
            //设置一个food,上面获取的碰撞器是挂载着Food组件的,如果碰撞的时候没有Food节点就会返回空值
        const food = event.otherCollider.getComponent(Food);
        //检测小球是否和food发生碰撞,如果发生碰撞,则销毁food节点
        if(food!=null){
            food.node.destroy();
         }
        }



    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN,this.onkeyDown,this);
        input.off(Input.EventType.KEY_PRESSING,this.onkeyPressing,this);
        input.off(Input.EventType.KEY_UP,this.onkeyUp,this);

        // this.collider.off('onCollisionEnter',this.onCollisionEnter,this);
        // this.collider.off('onCollisionExit',this.onCollisionExit,this);
        // this.collider.off('onCollisionStay',this.onCollisionStay,this);
    }
    
    //AD控制的是z轴的分量,WS控制的是x轴的分量
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
            this.moveDir =new Vec2(0,this.moveDir.y);
            break;
            case KeyCode.KEY_D:
            this.moveDir = new Vec2(0,this.moveDir.y);
            break;
            case KeyCode.KEY_W:
            this.moveDir =new Vec2(this.moveDir.x,0);
            break;
            case KeyCode.KEY_S:
            this.moveDir =new Vec2(this.moveDir.x,0);
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
        // const pos =this.node.position;
        // this.node.setPosition(pos.x+this.moveDir.y*this.speed*dt,pos.y,pos.z+this.moveDir.x*this.speed*dt); //因为这个相机拜访角度的问题,在cocos
        // //中这个相机的朝向是z轴向右,x轴向前(电脑内部方向),所以pos.x加上的是moveDir.y的分量(本质的是x轴上的分量)
        //增加作用力的生成以及方向
        this.rgd.applyForce(new Vec3(this.moveDir.y,0,this.moveDir.x).multiplyScalar(this.moveForce));
    }
 
//     start() {

//     }

//     update(deltaTime: number): {

        
//     }
}
