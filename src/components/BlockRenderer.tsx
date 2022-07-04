import { IBlock } from '@src/typings';
import { BlockManager } from '@src/utils/BlockManager';
import { isEqual } from 'lodash';
import { observer } from 'mobx-react';
import { useMemo, useRef } from 'react';

export const BlockRenderer = <T extends { data: IBlock; containerWidth: string; parent: IBlock | null; attributes?: Record<string, string>; }>(props: T) => {
  const ref = useRef<any>();

  const Com = observer(BlockManager.getBlock(props.data.tagName) as any);
  if (!Com) {
    throw new Error(`Can not find ${props.data.tagName}`);
  }

  const nonRawSiblings = props.parent?.children?.filter(child => child.tagName !== 'mj-raw').length || 0;

  if (!Com) return null;

  const memoData = useMemo(() => {
    let data = props.data;
    if (props.attributes) {
      data = {
        ...props.data,
        attributes: {
          ...data.attributes,
          ...props.attributes
        }
      };
    }
    if (!isEqual(ref.current, data)) {
      ref.current = data;
    }
    return ref.current;
  }, [props.data]);



  return useMemo(() => <Com {...props} data={memoData} nonRawSiblings={nonRawSiblings} />, [props, memoData, nonRawSiblings]);
};