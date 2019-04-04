import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default () => (
  <div
    style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20vh',
    }}
  >
    <CircularProgress size={50} />
  </div>
);