import { Schema } from 'rsuite';

const { StringType } = Schema.Types;

export const authenticationModel = Schema.Model({
  secret: StringType()
    .isRequired('Required field.')
    .addRule((value) => value === process.env.REACT_APP_GRAPHQL_SECRET, 'Incorrect admin secret.'),
});

export const deviceAddModel = Schema.Model({
  deviceName: StringType().isRequired('Required field.'),
});

export const dancerAddModel = Schema.Model({
  name: StringType().isRequired('Required field.'),
  gender: StringType().isRequired('Required field.'),
});

export const dancerExpectedValuesModel = Schema.Model({
  expected_values: StringType(),
  expected_positions: StringType(),
});
