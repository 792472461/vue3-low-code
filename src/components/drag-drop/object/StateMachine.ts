type StateTransferFunction = (...args: any[]) => void
/**
 * S: 状态
 * A: Action
 */
export default class StateMachine<S extends number, A extends number> {
  s: S = 0 as S
  table: Map<S, Map<A, [Function, S]>> = new Map()

  constructor(initialState : S){
    this.s = initialState
    this.table = new Map()
  }

  register(form: S, to: S, action: A, fn: StateTransferFunction) {
    // 如果还没缓存过
    if (!this.table.has(form)) {
      this.table.set(form, new Map())
    }

    const adjTable = this.table.get(form)
    if (adjTable) adjTable.set(action, [fn, to])
  }

  dispatch(action: A, ...data : Array<any>): boolean {
    const adjTable = this.table.get(this.s)
    if (!adjTable) return false
    if (!adjTable.has(action)) return false
    const a = adjTable.get(action)
    if (a) {
      const [fn, nextS] = a
      fn(...data)
      this.s = nextS
      while (this.dispatch(0 as A)) {
      }
      return true
    } else {
      return false
    }

  }
}
