import * as migration_20260409_155721_initial from './20260409_155721_initial';
import * as migration_20260415_000538 from './20260415_000538';
import * as migration_20260415_002854 from './20260415_002854';
import * as migration_20260415_003320 from './20260415_003320';
import * as migration_20260415_141055 from './20260415_141055';
import * as migration_20260415_142602 from './20260415_142602';
import * as migration_20260415_143246 from './20260415_143246';
import * as migration_20260415_144508 from './20260415_144508';
import * as migration_20260415_150547 from './20260415_150547';

export const migrations = [
  {
    up: migration_20260409_155721_initial.up,
    down: migration_20260409_155721_initial.down,
    name: '20260409_155721_initial',
  },
  {
    up: migration_20260415_000538.up,
    down: migration_20260415_000538.down,
    name: '20260415_000538',
  },
  {
    up: migration_20260415_002854.up,
    down: migration_20260415_002854.down,
    name: '20260415_002854',
  },
  {
    up: migration_20260415_003320.up,
    down: migration_20260415_003320.down,
    name: '20260415_003320',
  },
  {
    up: migration_20260415_141055.up,
    down: migration_20260415_141055.down,
    name: '20260415_141055',
  },
  {
    up: migration_20260415_142602.up,
    down: migration_20260415_142602.down,
    name: '20260415_142602',
  },
  {
    up: migration_20260415_143246.up,
    down: migration_20260415_143246.down,
    name: '20260415_143246',
  },
  {
    up: migration_20260415_144508.up,
    down: migration_20260415_144508.down,
    name: '20260415_144508',
  },
  {
    up: migration_20260415_150547.up,
    down: migration_20260415_150547.down,
    name: '20260415_150547'
  },
];
