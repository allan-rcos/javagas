import { MessageResponse } from '../../app/types/http/response/MessageResponse';

const companyRegisterSuccess: MessageResponse = {
  message: 'Company registered successfully',
};

const candidateRegisterSuccess: MessageResponse = {
  message: 'Candidate registered successfully',
};

const success: MessageResponse = {
  message: 'Success',
};

export default {
  success,
  companyRegisterSuccess,
  candidateRegisterSuccess,
};
