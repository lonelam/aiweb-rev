import { request } from '@umijs/max';
import { Button } from 'antd';
import * as React from 'react';

export function DevPage() {
  const [debugValue, setDebugValue] = React.useState('');
  const handleDebug = React.useCallback(async () => {
    const automaticMaskResp = await request(
      'http://asdkfj.oss-cn-hangzhou.aliyuncs.com/3_1685010403144_automatic_masks',
    );
    const maskCountsString = automaticMaskResp.data[0].segmentation.counts;
    const output = '';
    console.log(output, maskCountsString);
    setDebugValue(output);
  }, []);
  return (
    <div>
      <Button onClick={handleDebug}>debug</Button>
      <div>
        <div>{debugValue}</div>
      </div>
    </div>
  );
}
