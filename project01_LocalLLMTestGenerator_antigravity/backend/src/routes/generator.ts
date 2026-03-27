import { Router } from 'express';
import { generateTests } from '../services/llmService';

const router = Router();

router.post('/generate', async (req, res) => {
  const { requirements, provider, model, apiUrl, apiKey } = req.body;

  if (!requirements || !provider) {
    return res.status(400).json({ error: 'Missing requirements or provider.' });
  }

  try {
    const testCases = await generateTests({
      requirements,
      provider,
      model,
      apiUrl,
      apiKey,
    });
    
    res.json({ success: true, testCases });
  } catch (error: any) {
    console.error('Error generating tests:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
