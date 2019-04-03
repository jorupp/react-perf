import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, number, text } from '@storybook/addon-knobs';

import { Button, Welcome } from '@storybook/react/demo';
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
