import { Router } from 'express';

const router = Router();

// --- INTEGRATION POINT FOR INTERNAL (AUTHENTICATED) FEATURES ---
// Example: router.use('/secure-feature', authMiddleware, secureFeatureRoutes);

export default router;
