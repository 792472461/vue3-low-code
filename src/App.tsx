import {defineComponent} from 'vue'
import UIEditor from "./components/drag-drop/component/UIEditor";

export default defineComponent({
  setup() {
    return () => {
      return <UIEditor/>
    }
  }
})
