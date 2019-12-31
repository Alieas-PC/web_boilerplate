import { post, postFormData } from '../../util/fetchUtil';

const test = data => post('/api/sample/test', { data });

export default { test };
