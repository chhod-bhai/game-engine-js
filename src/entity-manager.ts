import type { Entity } from "./types.js";

class EntityManager {
  #entities: Array<Entity> = [];
  static #entityManagerInstance = null;

  private constructor() {
    this.#entities = [];
  }

  static getInstance() {
    if (!this.#entityManagerInstance) {
      return new EntityManager();
    }
    return this.#entityManagerInstance;
  }

  register(entity: Entity) {
    this.#entities.push(entity);
  }
}
