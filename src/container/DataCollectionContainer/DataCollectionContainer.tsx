import React, { useState } from 'react';
import { ButtonToolbar, Col, Divider, Icon, IconButton, Panel, Row, Timeline } from 'rsuite';
import Timer from 'react-compound-timer';
import danceMoves from '../../constant/DanceMove';

const DataCollectionContainer: React.FunctionComponent<any> = () => {
  const calibrationTime = 10000;
  const restTime = 5000;
  const danceTime = 10000;

  const [isInitialized, setIsInitialized] = useState(true);
  const [displayText, setDisplayText] = useState('Calibration');
  const [timerTime, setTimerTime] = useState(calibrationTime);
  const [counter, setCounter] = useState(0);

  const renderTimeline = () => {
    return (
      <Timeline>
        {danceMoves.map((item, index) => (
          <Timeline.Item
            dot={
              counter % 9 > index ? (
                <Icon icon="check" style={{ background: 'green', borderRadius: '50%' }} />
              ) : (
                <Icon icon="circle" style={{ borderRadius: '50%' }} />
              )
            }
          >
            <p>{item.move}</p>
          </Timeline.Item>
        ))}
      </Timeline>
    );
  };

  return (
    <Panel header={<h3>Data Collection</h3>} bordered>
      <Row>
        <Col sm={12}>
          <div key={`${timerTime} ${isInitialized} ${counter}`}>
            <Timer
              startImmediately={!isInitialized}
              initialTime={timerTime}
              direction="backward"
              timeToUpdate={10}
              onReset={() => {
                setIsInitialized(true);
                setCounter(0);
                setTimerTime(calibrationTime);
                setDisplayText('Calibration');
              }}
              checkpoints={
                isInitialized
                  ? [
                      { time: 5000, callback: () => setDisplayText('Get Ready') },
                      {
                        time: 0,
                        callback: () => {
                          setIsInitialized(false);
                          setDisplayText(danceMoves[counter].move);
                          setTimerTime(danceTime + restTime);
                        },
                      },
                    ]
                  : [
                      {
                        time: restTime,
                        callback: () => {
                          setDisplayText('Rest');
                        },
                      },
                      {
                        time: 0,
                        callback: () => {
                          setDisplayText(danceMoves[(counter + 1) % 9].move);
                          setCounter((state) => state + 1);

                          setTimerTime(danceTime + restTime);
                        },
                      },
                    ]
              }
            >
              {({ start, pause, reset }: any) => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h1 style={{ textAlign: 'center' }}>
                    <Timer.Seconds />:<Timer.Milliseconds />
                  </h1>
                  <ButtonToolbar style={{ margin: '20px 0' }}>
                    <IconButton icon={<Icon icon="play" />} onClick={start}>
                      Start
                    </IconButton>
                    <IconButton icon={<Icon icon="pause" />} onClick={pause}>
                      Pause
                    </IconButton>
                    <IconButton icon={<Icon icon="refresh" />} onClick={reset}>
                      Reset
                    </IconButton>
                  </ButtonToolbar>
                </div>
              )}
            </Timer>
          </div>
          <h3 style={{ textAlign: 'center' }}>{displayText}</h3>
          <h3 style={{ textAlign: 'center', marginTop: 20 }}>Set {Math.floor(counter / 9 + 1)}</h3>
        </Col>
        <Col
          sm={12}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <h4>Current Dance Move:</h4>
          <h3>{danceMoves[counter % 9].move}</h3>
          <h4>Next Dance Move:</h4>
          <h3>{danceMoves[(counter + 1) % 9].move}</h3>
          <Divider style={{ width: '80%' }} />
          {renderTimeline()}
        </Col>
      </Row>
    </Panel>
  );
};

export default DataCollectionContainer;
