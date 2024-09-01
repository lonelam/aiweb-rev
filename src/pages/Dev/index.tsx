import RemoveBg from '@/components/tools/RemoveBg';
import { request } from '@umijs/max';
import { Button } from 'antd';
import * as React from 'react';

export default function DevPage() {
  const handleDebug = React.useCallback(async () => {
    const automaticMaskResp = await request(
      'http://asdkfj.oss-cn-hangzhou.aliyuncs.com/3_1685010403144_automatic_masks',
    );
    const maskCountsString = automaticMaskResp.data[0].segmentation.counts;
    const output = '';
    console.log(output, maskCountsString);
  }, []);
  return (
    <div>
      <Button onClick={handleDebug}>debug</Button>
      <div>
        <RemoveBg />
      </div>
    </div>
  );
}
