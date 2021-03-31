import React, { useState } from 'react';
import {
  ButtonToolbar,
  Checkbox,
  Col,
  Divider,
  Icon,
  IconButton,
  InputGroup,
  InputNumber,
  Panel,
  Row,
  Timeline,
} from 'rsuite';
import Timer from 'react-compound-timer';
import { set } from 'lodash';
import { CSVLink } from 'react-csv';
import { danceMoves as defaultMoves, threeMoves } from '../../constant/DanceMove';

const DataCollectionContainer: React.FunctionComponent<any> = () => {
  const calibrationTime = 10000;

  const [isInitialized, setIsInitialized] = useState(true);
  const [displayText, setDisplayText] = useState('Calibration');
  const [timerTime, setTimerTime] = useState(calibrationTime);
  const [counter, setCounter] = useState(0);
  const [useThreeDanceMoves, setUseThreeDanceMoves] = useState(false);
  const [rounds, setRounds] = useState(3);
  const [danceTime, setDanceTime] = useState(20000);
  const [restTime, setRestTime] = useState(10000);
  const [timeData, setTimeData] = useState<any>({});

  const danceMoves = useThreeDanceMoves ? threeMoves : defaultMoves;
  const numberOfDanceMoves = useThreeDanceMoves ? 3 : 9;

  const updateTimeData = (positionNumber: number, type: string) => {
    const temp = timeData;
    const danceMove = danceMoves[positionNumber % numberOfDanceMoves].move;
    const danceRound = Math.floor(counter / numberOfDanceMoves + 1);

    if (type === 'start') {
      set(temp, `${danceMove}_${danceRound}.start`, new Date().getTime());
    }

    if (type === 'end') {
      set(temp, `${danceMove}_${danceRound}.end`, new Date().getTime());
    }

    setTimeData(temp);
  };

  const convertToCsv = () => {
    const keys = Object.keys(timeData);

    return keys.map((key) => ({
      name: key,
      start: timeData[key].start,
      end: timeData[key].end,
    }));
  };

  const renderTimeline = () => {
    return (
      <Timeline>
        {danceMoves.map((item, index) => (
          <Timeline.Item
            key={item.move}
            dot={
              counter % numberOfDanceMoves > index ? (
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
    <Panel
      header={
        <div>
          <h3>Data Collection</h3>
          <Checkbox checked={useThreeDanceMoves} onChange={(_, checked) => setUseThreeDanceMoves(checked)}>
            Three Dance Moves
          </Checkbox>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <InputGroup style={{ width: '20%' }}>
              <InputGroup.Addon>Rounds</InputGroup.Addon>
              <InputNumber
                min={1}
                value={rounds}
                onChange={(value: any) => setRounds(parseInt(value.length > 0 ? value : '0'))}
              />
            </InputGroup>
            <InputGroup style={{ width: '20%' }}>
              <InputGroup.Addon>Dance Time (ms)</InputGroup.Addon>
              <InputNumber
                min={1000}
                step={1000}
                value={danceTime}
                onChange={(value: any) => setDanceTime(parseInt(value.length > 0 ? value : '0'))}
              />
            </InputGroup>
            <InputGroup style={{ width: '20%' }}>
              <InputGroup.Addon>Rest Time (ms)</InputGroup.Addon>
              <InputNumber
                min={1000}
                step={1000}
                value={restTime}
                onChange={(value: any) => setRestTime(parseInt(value.length > 0 ? value : '0'))}
              />
            </InputGroup>
          </div>
        </div>
      }
      bordered
    >
      <Row>
        <Col sm={12}>
          <div key={`${timerTime} ${isInitialized} ${counter} ${restTime} ${danceTime} ${rounds}`}>
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
                setTimeData({});
              }}
              checkpoints={
                isInitialized
                  ? [
                      { time: calibrationTime / 2, callback: () => setDisplayText('Get Ready') },
                      {
                        time: 0,
                        callback: () => {
                          setIsInitialized(false);
                          setDisplayText(danceMoves[counter].move);
                          setTimerTime(danceTime + restTime);
                          updateTimeData(counter, 'start');
                        },
                      },
                    ]
                  : [
                      {
                        time: restTime,
                        callback: () => {
                          setDisplayText('Rest');
                          updateTimeData(counter, 'end');
                        },
                      },
                      {
                        time: 0,
                        callback: () => {
                          if (counter === numberOfDanceMoves * rounds - 1) {
                            setDisplayText('Completed');
                          } else {
                            setDisplayText(danceMoves[(counter + 1) % numberOfDanceMoves].move);
                            updateTimeData(counter + 1, 'start');
                            setCounter((state) => state + 1);
                            setTimerTime(danceTime + restTime);
                          }
                        },
                      },
                    ]
              }
            >
              {({ start, pause, reset }: any) => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h1 style={{ textAlign: 'center' }}>
                    <Timer.Seconds />:
                    <Timer.Milliseconds formatValue={(value) => (value / 10).toFixed(0)} />
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
          <h3 style={{ textAlign: 'center', marginTop: 20 }}>Set {Math.floor(counter / numberOfDanceMoves + 1)}</h3>
        </Col>
        <Col
          sm={12}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <h4>Next Dance Move:</h4>
          <h3>{isInitialized ? danceMoves[0].move : danceMoves[(counter + 1) % numberOfDanceMoves].move}</h3>
          <Divider style={{ width: '80%' }} />
          {renderTimeline()}
        </Col>
      </Row>
      <CSVLink data={convertToCsv()}>Download CSV</CSVLink>
    </Panel>
  );
};

export default DataCollectionContainer;
