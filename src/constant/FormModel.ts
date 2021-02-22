import { Schema } from 'rsuite';

const { StringType } = Schema.Types;

export const authenticationModel = Schema.Model({
  secret: StringType()
    .isRequired('Required field.')
    .addRule((value) => value === process.env.REACT_APP_GRAPHQL_SECRET, 'Incorrect admin secret.'),
});

export const deviceAddModel = Schema.Model({
  deviceName: StringType().isRequired(),
});
