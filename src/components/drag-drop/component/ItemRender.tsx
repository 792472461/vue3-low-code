import { defineComponent, effect, ref } from "vue";
import Editor from "../object/Editor";
import Node from '../object/Node'
import Draggable from "../object/Draggable";
import { Actions } from "../types/editor.types";
import { EditorEvents } from '../object/EditorEvents'

type ItemRenderProps = {
  node: Node
  editor: Editor
  style?: any
}


const ItemRenderForDraggable = defineComponent({
  props: ['node', 'editor', 'style'],
  setup({ node, editor, style, ...others }: ItemRenderProps) {
    const ver = ref(0)

    effect(() => {
      node.on(EditorEvents.NodePositionUpdated)
        .subscribe(() => {
          ver.value++
        })
    })

    function render(ver: number) {
      switch (node.type) {
        case "image":
          return (
            <img
              {...others}
              src={"https://img.kaikeba.com/a/83541110301202sxpe.png"}
              style={{
                ...style,
              }}
            />
          )
        case "rect":
          return (
            <div
              {...others}
              style={{
                backgroundColor: "yellow",
                ...style,
              }}
            />
          )
        case "text":
          return (
            <h2 {...others} style={{ ...style }}>
              这里是文本
            </h2>
          )
      }
    }

    return () => {
      return (
        <Draggable
          initialPosition={[node.x, node.y]}
          onDragStart={(dragNode) => {
            editor.dispatch(Actions.EvtDragStart, node)
          }}
          onDrag={() => {
            editor.dispatch(Actions.EvtDrag)
          }}
          onDragEnd={(dragNode) => {
            editor.dispatch(Actions.EvtDragEnd, [dragNode.diffX, dragNode.diffY])
          }}
          style={{
            width : node.w + 'px',
            height : node.h + 'px'
          }}
        >
          {render(ver.value)}
        </Draggable>
      )
    }
  }
})

export const ItemRender = defineComponent({
  props: ['node', 'editor'],
  setup({ node, editor }: ItemRenderProps) {
    console.log(node, 'ItemRender')
    return () => {
      if (!node) return null
      switch (node.type) {
        case 'root':
          const children = node.children
          return children.map((node, i) => (<ItemRender node={node} key={i} editor={editor}/>))

        case 'rect':
        case 'image':
        case 'test':
          return <ItemRenderForDraggable editor={editor} node={node}/>
        default:
          throw new Error('unsupported type: ' + node.type)
      }
    }
  }
})
