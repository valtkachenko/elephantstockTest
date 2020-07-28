interface DomEvent<T = any> extends Event {
  target: EventTarget & T,
}
