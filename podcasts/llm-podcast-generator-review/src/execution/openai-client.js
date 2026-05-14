function makeHeaders(apiKey) {
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };
}

async function throwIfNotOk(response) {
  if (response.ok) return;
  const detail = await response.text();
  const error = new Error(`OpenAI request failed: ${response.status} ${response.statusText}\n${detail}`);
  error.status = response.status;
  error.responseBody = detail;
  error.headers = response.headers;
  throw error;
}

function detectProvider(baseUrl) {
  const normalized = String(baseUrl || '').toLowerCase();
  if (normalized.includes('openrouter.ai')) return 'openrouter';
  return 'openai';
}

class OpenAIClient {
  constructor({ apiKey, baseUrl }) {
    if (!apiKey) throw new Error('Missing OPENAI_API_KEY/OPENROUTER_API_KEY');
    this.apiKey = apiKey;
    this.baseUrl = String(baseUrl || 'https://api.openai.com/v1').replace(/\/$/, '');
    this.provider = detectProvider(this.baseUrl);
  }

  supportsNativeBatch() {
    return this.provider === 'openai';
  }

  async chatCompletions(body) {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: makeHeaders(this.apiKey),
      body: JSON.stringify(body)
    });
    await throwIfNotOk(response);
    return response.json();
  }

  async uploadBatchInput(fileName, content) {
    const form = new FormData();
    const blob = new Blob([content], { type: 'application/jsonl' });
    form.append('purpose', 'batch');
    form.append('file', blob, fileName);
    const response = await fetch(`${this.baseUrl}/files`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      },
      body: form
    });
    await throwIfNotOk(response);
    return response.json();
  }

  async createBatch({ inputFileId, endpoint, completionWindow = '24h', metadata = {} }) {
    const response = await fetch(`${this.baseUrl}/batches`, {
      method: 'POST',
      headers: makeHeaders(this.apiKey),
      body: JSON.stringify({
        input_file_id: inputFileId,
        endpoint,
        completion_window: completionWindow,
        metadata
      })
    });
    await throwIfNotOk(response);
    return response.json();
  }

  async getBatch(batchId) {
    const response = await fetch(`${this.baseUrl}/batches/${batchId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    });
    await throwIfNotOk(response);
    return response.json();
  }

  async getFileContent(fileId) {
    const response = await fetch(`${this.baseUrl}/files/${fileId}/content`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    });
    await throwIfNotOk(response);
    return response.text();
  }
}

module.exports = {
  OpenAIClient,
  detectProvider
};
