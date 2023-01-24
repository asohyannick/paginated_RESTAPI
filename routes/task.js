import express from 'express';
import { 
 createGeneralTask, 
 createSingleTask,
 createTask,
 UpdateSingleTask,
 DeleteSingleTask,
 getCreateAllGeneralTask,
 getCreateStaticTask,
} from '../controllers/task.js';
const router = express.Router();
router.route('/').get(createGeneralTask);
router.route('/products').get(createSingleTask);
router.route('/save').get(getCreateAllGeneralTask);
router.route('/static').get(getCreateStaticTask);
router.route('/').post(createTask);
router.route('/').patch(UpdateSingleTask);
router.route('/').delete(DeleteSingleTask);
export default router;