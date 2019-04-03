import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, text } from '@storybook/addon-knobs';

import Spinner from '../src/Spinner';
import LoggingWrapper from '../src/LoggingWrapper';

storiesOf('Spinner', module)
  .addDecorator(withKnobs)
  .add('Spinner', () => {
    const startNumber = number('Start value', 0);
    const endNumber = number('End value', 90.3);
    const increment = number('Increment', 1.5);
    const precision = number('Precision', 1);
    const speed = number('Speed', 0);
    const key = text('Key', 'x');
    const props = {
      startNumber,
      endNumber,
      increment,
      precision,
      speed,
      key,
    };

    return <LoggingWrapper><Spinner {...props}/></LoggingWrapper>;
  });
