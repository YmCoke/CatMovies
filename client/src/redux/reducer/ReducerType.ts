export interface Reducer<S, A> {
    (state: S, action: A): S
}