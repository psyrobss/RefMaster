/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ViewState = 'dashboard' | 'game' | 'lesson' | 'library';

export interface ProgressState {
  citations: number;
  lessons: number;
  points: number;
}
