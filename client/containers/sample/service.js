import { post } from 'common/dist/client/utils/fetchUtil';

export const test = data => post('/api/sample/test', { data });
