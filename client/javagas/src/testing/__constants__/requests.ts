import { RegisterRequest } from '../../app/types/http/body/RegisterRequest';
import { RegisterCandidateRequest } from '../../app/types/http/body/RegisterCandidateRequest';
import { RegisterCompanyRequest } from '../../app/types/http/body/RegisterCompanyRequest';
import responses from './responses';
import { LoginRequest } from '../../app/types/http/body/LoginRequest';

const login: LoginRequest = {
  username: 'test',
  password: 'Strong1!',
};

const register: RegisterRequest = {
  ...login,
  email: 'test@test.dev',
};

const registerCandidateOnly = {
  firstName: 'Test',
  lastName: 'Candidate',
  linkedinUrl: 'https://test.dev',
  bio: '',
};

const registerCandidate: RegisterCandidateRequest = {
  ...register,
  ...registerCandidateOnly,
};

const registerCompanyOnly = {
  name: 'Test Company',
  websiteUrl: 'https://test.dev',
  industry: responses.industries[0],
  description: '',
};

const registerCompany: RegisterCompanyRequest = {
  ...register,
  ...registerCompanyOnly,
};

const invalidRegister: RegisterRequest = {
  ...register,
  email: 'invalid-email', // Invalid email format
  password: 'weak', // Needs to be strong
};

const invalidRegisterCandidate: RegisterCandidateRequest = {
  ...registerCandidate,
  ...invalidRegister,
  firstName: '', // First Name is required
  lastName: '', // Last name is required
};

const invalidRegisterCompany: RegisterCompanyRequest = {
  ...registerCompany,
  ...invalidRegister,
  name: '', // Name is required
  industry: 'invalid', // Invalid industry
};

export default {
  login,
  register,
  registerCandidate,
  registerCandidateOnly,
  registerCompany,
  registerCompanyOnly,
  invalidRegister,
  invalidRegisterCandidate,
  invalidRegisterCompany,
};
