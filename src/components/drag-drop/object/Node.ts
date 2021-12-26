import { List, Map } from 'immutable'
import { Emitter } from './Emitter'

export default class Node extends Emitter<number> {
  private nodeData: Map<string, any>

  constructor(type: string, x: number, y: number, w: number, h: number) {
    super()
    this.nodeData = Map({
      type,
      x,
      y,
      w,
      h,
      children: List<Node>()
    })
  }

  public add(child: Node) {
    this.nodeData = this.nodeData.update('children', (children: List<Node>) => {
      return children.push(child)
    })
  }

  get type() {
    return this.nodeData.get('type')
  }

  get x() {
    return this.nodeData.get('x')
  }

  get y() {
    return this.nodeData.get('y')
  }

  get w() {
    return this.nodeData.get('w')
  }

  get h() {
    return this.nodeData.get('h')
  }

  get children(): Node[] {
    return this.nodeData.get('children').toJS()
  }

  public setXYByVector(vec: [ number, number ]) {
    this.nodeData = this.nodeData.set('x', vec[0] + this.nodeData.get('x'))
      .set('y', vec[1] + this.nodeData.get('y'))
  }
}
