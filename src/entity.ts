import type { Component } from "./components/types.js";

export default class Entity {
  entityId;
  components: Array<Component>;
  constructor() {
    this.entityId = crypto.randomUUID();
    this.components = [];
  }
  addComponent(component: Component) {
    this.components.push(component);
  }
}
