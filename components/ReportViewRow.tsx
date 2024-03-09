import React, {Fragment} from 'react';
import Spacer from './common/Spacer';
import FlexRowBetween from './common/FlexRowBetween';
import Typography from './common/Typography';

type TReportViewRowProps = {
  left: string;
  right: string;
};

const ReportViewRow = (props: TReportViewRowProps) => {
  return (
    <Fragment>
      <Spacer height={20} />
      <FlexRowBetween>
        <Typography fontSize={14} fontWeight="600">
          {props.left}
        </Typography>
        <Typography fontSize={14}>{props.right}</Typography>
      </FlexRowBetween>
    </Fragment>
  );
};

export default ReportViewRow;
