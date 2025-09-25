import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FollowTarget')
export class FollowTarget extends Component {

    @property(Node)
    public target : Node;  //定义target节点,相机跟随target节点运动

    private offset : Vec3 = null; //三维向量只能重新定义之后再进行运算

    //获取最开始的时候相机和目标位置的偏移
    start() {
        const p1 = this.node.position;
        const p2 = this.target.position;
        this.offset = new Vec3(p1.x-p2.x,p1.y-p2.y,p1.z-p2.z);
    }

    //让相机和目标节点之间保持相对的位置
    lateUpdate(deltaTime: number) {
        this.node.setPosition(this.target.position.x+this.offset.x,this.target.position.y+this.offset.y,this.target.position.z+this.offset.z);
    }
}


