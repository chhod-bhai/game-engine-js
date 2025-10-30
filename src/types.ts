import type { Component } from "./components/types.js";

export interface Entity {
  id: string;
  components: Array<Component>;
}
