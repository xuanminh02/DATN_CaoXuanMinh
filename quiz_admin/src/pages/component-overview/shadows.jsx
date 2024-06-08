import React, { useEffect, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import ComponentWrapper from './ComponentWrapper';
import ComponentSkeleton from './ComponentSkeleton';
import TransactionDeposit from './deposit';
import TransactionWithdraw from './withdraw';


// ============================|| COMPONENT - TRANSACTION HISTORY ||============================ //

export default function TransactionHistory() {
  const theme = useTheme();


  return (
    <ComponentSkeleton>
      <ComponentWrapper>
        <TransactionDeposit />
        <TransactionWithdraw />
      </ComponentWrapper>
    </ComponentSkeleton>
  );
}
