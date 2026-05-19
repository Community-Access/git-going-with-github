const MODEL_PRICING_USD_PER_1K = {
  // Prices below match OpenRouter list prices (USD per 1K tokens).
  'openai/gpt-5.4': { input: 0.0025, output: 0.015 },
  'openai/gpt-5.4-mini': { input: 0.0005, output: 0.002 },
  'openai/gpt-5.5': { input: 0.005, output: 0.030 },
  'openai/gpt-5.5-pro': { input: 0.030, output: 0.180 },
  'gpt-5.4': { input: 0.0025, output: 0.015 },
  'gpt-5.4-mini': { input: 0.0005, output: 0.002 },
  'gpt-5.5': { input: 0.005, output: 0.030 },
  'gpt-5.5-pro': { input: 0.030, output: 0.180 }
};

function estimateTokensFromText(text) {
  const chars = String(text || '').length;
  return Math.max(1, Math.ceil(chars / 4));
}

function estimateJobCost({ model, inputTokens, outputTokens }) {
  const pricing = MODEL_PRICING_USD_PER_1K[model];
  if (!pricing) return null;
  const inputCost = (Math.max(0, inputTokens || 0) / 1000) * pricing.input;
  const outputCost = (Math.max(0, outputTokens || 0) / 1000) * pricing.output;
  return Number((inputCost + outputCost).toFixed(6));
}

function summarizeCosts(rows) {
  const totals = rows.reduce((acc, row) => {
    acc.estimated += Number(row.cost_estimated || 0);
    acc.actual += Number(row.cost_actual || 0);
    return acc;
  }, { estimated: 0, actual: 0 });
  return {
    estimated: Number(totals.estimated.toFixed(6)),
    actual: Number(totals.actual.toFixed(6))
  };
}

module.exports = {
  estimateTokensFromText,
  estimateJobCost,
  summarizeCosts,
  MODEL_PRICING_USD_PER_1K
};
