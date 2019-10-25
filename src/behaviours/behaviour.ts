export interface Behaviour {
  init?(): void;
  dispose?(): void;
  update(): Behaviour | null;
}
