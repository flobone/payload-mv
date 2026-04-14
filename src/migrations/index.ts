import * as migration_20260409_155721_initial from './20260409_155721_initial';
import * as migration_20260415_000538 from './20260415_000538';

export const migrations = [
  {
    up: migration_20260409_155721_initial.up,
    down: migration_20260409_155721_initial.down,
    name: '20260409_155721_initial',
  },
  {
    up: migration_20260415_000538.up,
    down: migration_20260415_000538.down,
    name: '20260415_000538'
  },
];
