import { mean, min } from 'lodash';

/**
 * Converts expected data to appropriate emg data format
 * @param expectedDeviceData
 * @param rawData
 * @param session
 */
export const getEmgData = (expectedDeviceData: any[], rawData: any[], session?: boolean) =>
  expectedDeviceData.map(({ device_id, dancer }) => {
    const filteredData = rawData
      .filter((data) => data['device_id'] === device_id)
      .map((data) => ({ timestamp: new Date(data['created_at']).getTime(), value: data['emg_reading'] }));

    return {
      id: session ? dancer.name : device_id,
      dancerId: session && dancer.id,
      data: filteredData,
    };
  });

/**
 * Converts expected data to appropriate delay data format
 * @param expectedDeviceData
 * @param predictedData
 * @param session
 */
export const getDelayData = (expectedDeviceData: any[], predictedData: any[], session?: boolean) =>
  expectedDeviceData.map(({ device_id, dancer }) => {
    const filteredData = predictedData
      .filter((data) => data['device_id'] === device_id)
      .map((data) => ({ timestamp: new Date(data['created_at']).getTime(), value: data['delay'] }));

    return {
      id: session ? dancer.name : device_id,
      dancerId: session && dancer.id,
      data: filteredData,
    };
  });

/**
 * Calculates team's overall position and dance accuracy
 * @param expectedDeviceData
 * @param predictedData
 */
export const getTeamAccuracy = (expectedDeviceData: any[], predictedData: any[]) => {
  // Check if expected data exists for all dancers; short-circuit and return undefined if there's one dancer
  // without expected data
  for (let i = 0; i < expectedDeviceData.length; i++) {
    if (!expectedDeviceData[i]['expected_moves'] || !expectedDeviceData[i]['expected_positions']) {
      return undefined;
    }
  }

  // Hash map for faster device data access
  const expectedDataObject: any = {};

  let positionAccuracyCounter = 0;
  let moveAccuracyCounter = 0;

  // Populate device data hash map
  expectedDeviceData.forEach(({ device_id, expected_moves, expected_positions }) => {
    const predictedDataForDevice = predictedData.filter((data) => data['device_id'] === device_id);

    expectedDataObject[device_id] = {
      expected_moves,
      expected_positions,
      predictedDataForDevice,
    };
  });

  // Use the minimum data length as the max iteration
  const dataLength =
    min(expectedDeviceData.map(({ device_id }) => expectedDataObject[device_id].predictedDataForDevice.length)) || 0;

  // TODO: Optimize this calculation
  for (let i = 0; i < dataLength; i++) {
    let moveFlag = true;
    let positionFlag = true;

    expectedDeviceData.forEach(({ device_id: id, expected_moves, expected_positions }) => {
      const predictedDanceMove = expectedDataObject[id]['predictedDataForDevice'][dataLength - i - 1]['dance_move'];
      const predictedDancePosition =
        expectedDataObject[id]['predictedDataForDevice'][dataLength - i - 1]['dance_position'];

      const expectedDanceMoves =
        expected_moves.length > 0 && expected_moves.split(',').map((move: string) => move.trim());

      const expectedDancePositions =
        expected_positions.length > 0 &&
        expected_positions.split(',').map((position: string) => parseInt(position.trim()));

      if (expectedDanceMoves[i] !== predictedDanceMove) {
        moveFlag = false;
      }

      if (expectedDancePositions[i] !== predictedDancePosition) {
        positionFlag = false;
      }
    });

    if (moveFlag) {
      moveAccuracyCounter++;
    }

    if (positionFlag) {
      positionAccuracyCounter++;
    }
  }

  return { moveAccuracy: moveAccuracyCounter / dataLength, positionAccuracy: positionAccuracyCounter / dataLength };
};

/**
 * Converts expected data to appropriate accuracy data format
 * @param expectedDeviceData
 * @param predictedData
 * @param session
 */
export const getAccuracyData = (expectedDeviceData: any[], predictedData: any[], session?: boolean) =>
  expectedDeviceData.map(({ device_id, expected_moves, expected_positions, dancer }) => {
    // get predicted data for the specific device ID
    const filteredData = predictedData.filter((data) => data['device_id'] === device_id);

    // get expected dance moves
    const expectedDanceMoves =
      expected_moves.length > 0 && expected_moves.split(',').map((move: string) => move.trim());

    // get expected dance positions
    const expectedDancePositions =
      expected_positions.length > 0 &&
      expected_positions.split(',').map((position: string) => parseInt(position.trim()));
    const dataLength = Math.min(filteredData.length, expectedDanceMoves.length);

    // accuracy of dance moves so far
    let moveAccuracyRate: number[] = [];

    // accuracy of dance positions so far
    let positionAccuracyRate: number[] = [];
    let timestamp: number[] = [];

    let currentMoveAccuracy = 0;
    let currentPositionAccuracy = 0;
    for (let i = 0; i < dataLength; i++) {
      // get current predicted data (indexed from the back)
      const currentPredictedData = filteredData[filteredData.length - i - 1];

      // set accuracy += 1 if predicted = expected
      if (currentPredictedData['dance_move'] === expectedDanceMoves[i]) {
        currentMoveAccuracy++;
      }
      if (currentPredictedData['dance_position'] === expectedDancePositions[i]) {
        currentPositionAccuracy++;
      }

      // calculate the running average
      const averageMoveAccuracy = currentMoveAccuracy / (i + 1);
      const averagePositionAccuracy = currentPositionAccuracy / (i + 1);

      // push current accuracy into respective accuracy array
      moveAccuracyRate.push(averageMoveAccuracy);
      positionAccuracyRate.push(averagePositionAccuracy);
      timestamp.push(new Date(currentPredictedData['created_at']).getTime());
    }

    return {
      moveAccuracy: {
        id: session ? dancer.name : device_id,
        dancerId: session && dancer.id,
        data: moveAccuracyRate.map((value, index) => ({
          timestamp: timestamp[index],
          value,
        })),
        average: mean(moveAccuracyRate),
      },
      positionAccuracy: {
        id: session ? dancer.name : device_id,
        dancerId: session && dancer.id,
        data: positionAccuracyRate.map((value, index) => ({
          timestamp: timestamp[index],
          value,
        })),
        average: mean(positionAccuracyRate),
      },
    };
  });
