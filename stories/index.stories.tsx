import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, text } from '@storybook/addon-knobs';

import Spinner from '../src/Spinner';
import LoggingWrapper from '../src/LoggingWrapper';

storiesOf('Spinner', module)
  .addDecorator(withKnobs)
  .add('Single Spinner', () => {
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
  })
  .add('Multiple Spinners', () => {
    const startNumber = number('Start value', 0);
    const increment = number('Increment', 1.5);
    const precision = number('Precision', 1);
    const speed = number('Speed', 0);
    const key = text('Key', 'x');

    const endNumbers = [
      number('End value 1', 90.3),
      number('End value 2', 80.2),
      number('End value 3', 50.9),
      number('End value 4', 4.8),
      number('End value 5', 23.7),
      number('End value 6', 40.8),
    ]

    const props = {
      startNumber,
      increment,
      precision,
      speed,
    };

    return <LoggingWrapper key={key}>
      {
        endNumbers.map((endNumber, ix) => <Spinner key={ix} {...props} endNumber={endNumber}/>)
      }
    </LoggingWrapper>;
  })
;
