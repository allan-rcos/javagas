import { TokenResponse } from '../../app/types/http/response/TokenResponse';
import { MessageResponse } from '../../app/types/http/response/MessageResponse';

const industries: string[] = ['TECHNOLOGY', 'FINANCE', 'HEALTHCARE'];
const token: TokenResponse = {
  token: 'test-token',
};
const greeting: MessageResponse = {
  message: 'Hello, World!',
};

export default {
  industries,
  token,
  greeting,
};
