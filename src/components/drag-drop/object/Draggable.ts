import { defineComponent, PropType, SetupContext, VNode } from 'vue'
import { useDragNode } from "../hook/useDragNode";
import { DragEvents, DraggableProps, RawDragEvents } from "../types/editor.types";
import DragNode from "./DragNode";
import { deepMerge } from "../../../helpers/deepMerge";

function assignPropsToVNode(vNode: VNode, props: any) {
  vNode.props = deepMerge(vNode.props, props)
  return vNode
}

function addPropsToVNode(vNode: VNode, handlers: RawDragEvents, props: DraggableProps, node: DragNode) {
  const vNodeProps: any = {
    ...handlers,
    draggable: true
  }

  vNodeProps.style = {
    position: 'absolute',
    top: props.initialPosition[1] + 'px',
    left: props.initialPosition[0] + 'px',
    transform: `translate(${ node.diffX }px, ${ node.diffY }px)`
  }

  vNode = assignPropsToVNode(vNode, vNodeProps)
  return vNode
}

const Draggable = defineComponent({
  props: {
    initialPosition: {
      type: Object as PropType<[ number, number ]>,
      required: true,
    },
    onDragStart: {
      type: Function as PropType<(e: DragNode) => void>,
    },
    onDragEnd: {
      type: Function as PropType<(e: DragNode) => void>,
    },
    onDrag: {
      type: Function as PropType<(e: DragNode) => void>,
    }
  },
  setup(props, ctx: SetupContext) {
    return () => {
      const [ node, handlers ] = useDragNode(props, props.initialPosition)
      let vNode: VNode = ctx.slots.default!()[0]
      vNode = addPropsToVNode(vNode, handlers, props, node.value)
      return vNode
    }
  }
})

export default Draggable
