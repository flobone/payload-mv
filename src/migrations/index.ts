import * as migration_20260409_155721_initial from './20260409_155721_initial';
import * as migration_20260415_000538 from './20260415_000538';
import * as migration_20260415_002854 from './20260415_002854';
import * as migration_20260415_003320 from './20260415_003320';

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
    name: '20260415_003320'
  },
];
