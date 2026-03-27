import { Request, Response, Router } from 'express';
import { TestCaseGeneratorService } from '../services/testCaseGeneratorService';

const router = Router();
const generatorService = new TestCaseGeneratorService();

// Generate test cases endpoint
router.post('/generate-testcases', async (req: Request, res: Response) => {
  try {
    const { requirement, provider } = req.body;

    if (!requirement || !requirement.trim()) {
      return res.status(400).json({ error: 'Requirement is required' });
    }

    if (!provider || !provider.trim()) {
      return res.status(400).json({ error: 'Provider is required' });
    }

    console.log(`Generating test cases for provider: ${provider}`);
    const testCases = await generatorService.generate(requirement, provider);

    res.json({
      success: true,
      testCases,
      count: testCases.length,
      provider,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error generating test cases:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate test cases',
      timestamp: new Date().toISOString()
    });
  }
});

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'API healthy', timestamp: new Date().toISOString() });
});

export default router;
