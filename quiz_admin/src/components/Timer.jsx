import React from 'react';
import padNumberWithZero from 'utils/padNumberWithZero';

const Timer = (props) => {
  const { countdown: seconds } = props;

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10
        }}
      >
        <div
          style={{
            padding: 5,
            background: 'white',
            borderRadius: 4,
            width: 28,
            height: 28,
            border: '1px solid #2e89ff'
          }}
        >
          {padNumberWithZero(hours)}
        </div>
        <div
          style={{
            padding: 5,
            background: 'white',
            borderRadius: 4,
            width: 28,
            height: 28,
            border: '1px solid #2e89ff'
          }}
        >
          {padNumberWithZero(minutes)}
        </div>
        <div
          style={{
            padding: 5,
            background: 'white',
            borderRadius: 4,
            width: 28,
            height: 28,
            border: '1px solid #2e89ff'
          }}
        >
          {padNumberWithZero(seconds)}
        </div>
      </div>
    );
  };

  return <>{formatTime(seconds)}</>;
};

export default Timer;
