import { aui} from './helper/jest.setup';

describe('jest with askui', () => {
  it('annotates interactively', async () => {
    await aui.annotateInteractively();
  });
});
