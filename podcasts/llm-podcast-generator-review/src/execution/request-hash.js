const crypto = require('crypto');

function stableJson(value) {
  if (value === null || value === undefined) return 'null';
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return crypto.createHash('sha256').update(String(value), 'utf8').digest('hex');
}

function checksumContent(content) {
  return sha256(content || '');
}

function computeRequestHash({
  model,
  endpoint,
  systemPrompt,
  userPrompt,
  sourceChecksum,
  generationParams
}) {
  const payload = {
    model,
    endpoint,
    systemPrompt,
    userPrompt,
    sourceChecksum,
    generationParams: generationParams || {}
  };
  return sha256(stableJson(payload));
}

module.exports = {
  computeRequestHash,
  checksumContent,
  stableJson
};
