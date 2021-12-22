import { Actions, States, Meta } from '../types/editor.types'
import StateMachine from "./StateMachine";
import metas from "./Metas";
import Node from "./Node";


export default class Editor extends StateMachine<States, Actions> {
  private root: Node

  private sel: Set<Node> = new Set()
  private addingMeta?: Meta
  private addingVector!: [number, number]

  constructor() {
    super(States.Start)
    this.root = new Node('root', 0, 0, 800, 800)
    const rectMeta = metas.find(x => x.type === 'rect')
    this.root.add(new Node('rect', 0, 0, rectMeta!.w, rectMeta!.h))

    this.register(States.Start, States.Start, Actions.EvtDragStart, () => {

    })
    this.register(States.DragStart, States.Moving, Actions.EvtDrag, () => {

    })
    this.register(States.Moving, States.Stopped, Actions.EvtDragEnd, () => {

    })
    this.register(States.Stopped, States.Start, Actions.Auto, () => {

    })
    this.register(States.Start, States.PlacingComponent, Actions.StartAddComponent, () => {

    })
    this.register(States.PlacingComponent, States.AddingComponent, Actions.EvtDrop, () => {

    })
    this.register(States.AddingComponent, States.Start, Actions.Auto, () => {

    })
  }

  getRoot() {
    console.log('getRoot:', this.root)
    return this.root
  }
}
