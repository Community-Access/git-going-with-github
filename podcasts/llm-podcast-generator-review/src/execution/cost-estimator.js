const MODEL_PRICING_USD_PER_1K = {
  'openai/gpt-5.4': { input: 0.01, output: 0.03 },
  'openai/gpt-5.4-mini': { input: 0.002, output: 0.006 },
  'gpt-5.4': { input: 0.01, output: 0.03 },
  'gpt-5.4-mini': { input: 0.002, output: 0.006 }
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
