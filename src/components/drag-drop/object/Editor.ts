import { Actions, States } from '../types/editor.types'
import StateMachine from "./StateMachine";


export default class Editor extends StateMachine<States, Actions> {
  constructor() {
    super();
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
}
