import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getWorkoutInsights,
  getWorkoutHistory,
  getActiveWorkout,
  startWorkout,
  addWorkoutExercise,
  addWorkoutSet,
  deleteWorkoutSet,
  completeWorkout,
  cancelWorkout,
  getExerciseHistory,
  getMyExercises,
} from '../controllers/workoutController';

const router = Router();

router.get('/insights', authenticate, getWorkoutInsights);
router.get('/history', authenticate, getWorkoutHistory);
router.get('/active', authenticate, getActiveWorkout);
router.get('/exercises', authenticate, getMyExercises);
router.get('/exercise-history', authenticate, getExerciseHistory);
router.post('/start', authenticate, startWorkout);
router.post('/:sessionId/exercises', authenticate, addWorkoutExercise);
router.post('/:sessionId/exercises/:exerciseId/sets', authenticate, addWorkoutSet);
router.delete('/:sessionId/exercises/:exerciseId/sets/:setId', authenticate, deleteWorkoutSet);
router.patch('/:sessionId/complete', authenticate, completeWorkout);
router.delete('/:sessionId', authenticate, cancelWorkout);

export default router;
