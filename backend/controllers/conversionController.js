// No TensorFlow here. Stubs return deterministic mappings.
// You can later connect to a separate ML service via HTTP.

const sampleDictionary = {
  hello: { avatarAnimationId: 'anim_hello', gloss: 'HELLO' },
  thanks: { avatarAnimationId: 'anim_thanks', gloss: 'THANK-YOU' }
};

export const textToSign = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const tokens = text.toLowerCase().split(/\s+/).filter(Boolean);
    const frames = tokens.map((t) => sampleDictionary[t] || { avatarAnimationId: 'anim_spell', gloss: t });

    res.json({
      input: text,
      frames,
      metadata: { engine: 'rule-based', fallback: 'finger-spelling' }
    });
  } catch (err) {
    next(err);
  }
};

export const signToText = async (req, res, next) => {
  try {
    // Expect a simple payload describing the sign (e.g., { key: 'A', sequence: [...] })
    const { key } = req.body;
    if (!key) return res.status(400).json({ error: 'Sign key is required' });

    // Mock mapping: map a sign key to a label
    const label = key.toString().toUpperCase();
    res.json({ text: label, confidence: 0.6, method: 'heuristic' });
  } catch (err) {
    next(err);
  }
};
