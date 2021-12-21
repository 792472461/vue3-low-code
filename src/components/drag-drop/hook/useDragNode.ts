import { DragEvents, RawDragEvents } from "../types/editor.types";
import { Ref, ref, watch, watchEffect } from "vue";
import DragNode from "../object/DragNode";

export function useDragNode(props: DragEvents, initialPosition: [ number, number ]): [Ref<DragNode>, RawDragEvents] {
  const node = ref<DragNode>(new DragNode())
  const ver = ref(0)

  watch(() => initialPosition, () => {
    node.value.init();
    ver.value++
  })

  const handlers = {
    onDragstart: (e: DragEvent) => {
      node.value.start(e)
      props.onDragStart && props.onDragStart(node.value as DragNode)
    },
    onDrag: (e: DragEvent) => {
      node.value.update(e)
      ver.value++
      props.onDrag && props.onDrag(node.value as DragNode)
    },
    onDragend: (e: DragEvent) => {
      node.value.update(e)
      props.onDragEnd && props.onDragEnd(node.value as DragNode)
    },
  }

  return [node as Ref<DragNode>, handlers]
}
