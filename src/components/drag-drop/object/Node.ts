import { List, Map } from 'immutable'

class Node {
  private nodeData: Map<string, any>

  constructor(type: string, x: number, y: number, w: number, h: number) {
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

}
