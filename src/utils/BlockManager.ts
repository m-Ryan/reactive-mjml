import { blocks } from '@src/blocks';
import { BodyComponent } from '@src/components/BodyComponent';

export class BlockManager {
  static blocks: Record<string, BodyComponent<any>> = {
    ...blocks,
  };

  static getBlock(name: string) {
    return this.blocks[name];
  }
}
