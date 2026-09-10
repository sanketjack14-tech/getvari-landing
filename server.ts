import 'dotenv/config'; // Run dotenv config first before any module hoisting
import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { register, trace } from '@arizeai/phoenix-otel';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

// Enable OpenTelemetry diagnostic logging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// Register the Phoenix tracer provider pointing to the hosted Arize platform
register({
  projectName: "getvari-hydration-co-pilot",
  url: "https://otlp.arize.com/v1/traces",
  batch: false, // Send spans immediately for instant tracing visibility
  headers: {
    "space_id": process.env.ARIZE_SPACE_ID || "",
    "api_key": process.env.ARIZE_API_KEY || "",
    "arize-space-id": process.env.ARIZE_SPACE_ID || "",
    "arize-api-key": process.env.ARIZE_API_KEY || "",
    "model_id": "getvari-hydration-co-pilot",
    "arize-model-id": "getvari-hydration-co-pilot",
  }
});

const app = express();
const PORT_LANDING = 3000;
const PORT_APP = 3001;
const PORT_VERSION_A = 3002;
const PORT_VERSION_B = 3003;

app.use(express.json());
app.use(cors());

// Log incoming API requests to insights
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini AI SDK initialized successfully with key');
  } catch (error) {
    console.error('Failed to initialize Gemini AI SDK:', error);
  }
} else {
  console.log('No GEMINI_API_KEY detected. Server running in Rule-Based Smart Diagnostic mode.');
}

const WAITLIST_FILE = path.join(process.cwd(), 'waitlist.json');

// Waitlist Email Collection API Endpoint
app.post('/api/waitlist', (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }

  try {
    let list: any[] = [];
    if (fs.existsSync(WAITLIST_FILE)) {
      const content = fs.readFileSync(WAITLIST_FILE, 'utf-8');
      list = JSON.parse(content || '[]');
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = list.find((item: any) => item.email.toLowerCase() === normalizedEmail);

    if (!existing) {
      list.push({
        email: normalizedEmail,
        timestamp: new Date().toISOString(),
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
      });
      fs.writeFileSync(WAITLIST_FILE, JSON.stringify(list, null, 2), 'utf-8');
      console.log(`✉️ New Waitlist Signup: ${normalizedEmail} (Total: ${list.length})`);
    }

    return res.json({ success: true, count: list.length });
  } catch (err) {
    console.error('Failed to save waitlist email:', err);
    return res.status(500).json({ error: 'Failed to save waitlist email.' });
  }
});

// View all collected waitlist signups (Renders HTML Table UI for browser, JSON for API/fetch)
app.get('/api/waitlist', (req, res) => {
  try {
    let list: any[] = [];
    if (fs.existsSync(WAITLIST_FILE)) {
      const content = fs.readFileSync(WAITLIST_FILE, 'utf-8');
      list = JSON.parse(content || '[]');
    }

    // Return JSON if client explicitly requests JSON (e.g. fetch or curl -H "Accept: application/json")
    const acceptsJson = req.query.format === 'json' || (req.headers.accept && req.headers.accept.includes('application/json') && !req.headers.accept.includes('text/html'));
    if (acceptsJson) {
      return res.json(list);
    }

    // Render HTML Table UI for Browser Viewers
    const rowsHtml = list.length === 0
      ? `<tr><td colspan="3" style="text-align:center; padding: 40px; color: #64748b; font-family: 'JetBrains Mono', monospace;">No waitlist emails submitted yet. Submit an email on the landing page!</td></tr>`
      : list.map((item, idx) => `
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="padding: 14px 18px; color: #64748b; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${idx + 1}</td>
            <td style="padding: 14px 18px; color: #38bdf8; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${item.email}</td>
            <td style="padding: 14px 18px; color: #94a3b8; font-family: 'JetBrains Mono', monospace;">${new Date(item.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
          </tr>
        `).join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>getVāri • Founders Waitlist Database</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=JetBrains+Mono:wght@500;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      background-color: #070a11;
      color: #f1f5f9;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      max-width: 850px;
      background: rgba(13, 18, 30, 0.85);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 0 60px rgba(56, 189, 248, 0.15);
      backdrop-filter: blur(20px);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      color: #ffffff;
    }
    .badge {
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #38bdf8;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      padding: 6px 14px;
      border-radius: 20px;
      font-weight: 700;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }
    th {
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      font-size: 11px;
      color: #64748b;
      padding: 12px 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.02);
    }
    tr:hover {
      background: rgba(255, 255, 255, 0.03);
    }
    .footer-note {
      margin-top: 24px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1 class="title">get<span style="color:#38bdf8;">Vāri</span> Founders Waitlist</h1>
        <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">Realtime Waitlist Submissions Database</p>
      </div>
      <span class="badge">Total: ${list.length} Signups</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Email Address</th>
          <th>Submission Date</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div class="footer-note">
      <span>Auto-synced to <code>/waitlist.json</code></span>
      <span>© 2026 getVāri Technologies</span>
    </div>
  </div>
</body>
</html>`;

    return res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read waitlist.' });
  }
});

/**
 * Server-Side endpoint to generate customized wellness telemetry insights
 * Using actual model logic and Schema structured output representation
 */
app.post('/api/insights', async (req, res) => {
  const { sensorData, profile, recentLogs, hoursSinceDrink, previousInsights } = req.body;

  if (!sensorData || !profile) {
    return res.status(400).json({ error: 'Missing sensor data or profile parameters' });
  }

  // Fallback Rule-Based insights generator if Gemini is unavailable
  const generateRuleBasedInsights = () => {
    const rules = [];
    const hScore = 100 - (sensorData.hydrationScore || 50);

    if (sensorData.heartRate > 95 && sensorData.activityLoad > 50) {
      rules.push({
        id: `rule_hr_act_${Date.now()}`,
        category: 'activity',
        title: 'Active Cardiovascular Load',
        text: 'Your current cardiovascular stress is high due to ongoing heavy activity. Ensure you are taking consistent sips of electrolytes rather than plain water to offset immediate sweat-loss sodium depletion.',
        timestamp: new Date().toISOString(),
        source: 'rule_engine'
      });
    }

    if (sensorData.temperature > 30) {
      rules.push({
        id: `rule_temp_${Date.now()}`,
        category: 'temperature',
        title: 'High Thermal Exposure Detected',
        text: `With temperature peaking ambiently at ${sensorData.temperature}°C, your fluid evaporation rate climbs by over 250ml/hour. Upward adjustments in electrolyte intake goals are strongly recommended.`,
        timestamp: new Date().toISOString(),
        source: 'rule_engine'
      });
    }

    if (hScore > 40) {
      rules.push({
        id: `rule_hyd_${Date.now()}`,
        category: 'hydration',
        title: 'Hydration Depletion Phase',
        text: `Based on your physiological trends, your current estimated hydration reserves are depleted by around ${hScore}%. Drink 350ml of cool water within the next 15 minutes to stabilize blood viscosity and cognitive focus.`,
        timestamp: new Date().toISOString(),
        source: 'rule_engine'
      });
    }

    if (hoursSinceDrink > 2.5) {
      rules.push({
        id: `rule_time_${Date.now()}`,
        category: 'hydration',
        title: 'Extended Inactivity Alert',
        text: `It has been over ${hoursSinceDrink} hours since your last fluid intake sync. Even without overt thirst signals, your cognitive focus and metabolism are experiencing mild performance degradation.`,
        timestamp: new Date().toISOString(),
        source: 'rule_engine'
      });
    }

    // Default general wellness insight
    if (rules.length === 0) {
      rules.push({
        id: `rule_good_${Date.now()}`,
        category: 'recovery',
        title: 'Optimal Physiological Sync',
        text: 'All physiological sensors indicate perfect recovery sync. Your dynamic hydration score is safe. Maintain your existing baseline routine to stabilize cardiovascular load metrics.',
        timestamp: new Date().toISOString(),
        source: 'rule_engine'
      });
    }

    return rules;
  };

  if (!ai) {
    // Return high-quality rule-based insights immediately if no gemini key
    return res.json({ 
      insights: generateRuleBasedInsights().map(item => ({ ...item, source: 'rule_engine' })),
      fallbackReason: 'no_api_key'
    });
  }

  try {
    const systemPrompt = `You are "GetVari Core", an AI-assisted hydration intelligence engine driven by sensor fusion analysis.
You process real-time streams of physiological data, motion inputs, ambient temperature, humidity, and water intake timelines.

Your goal is to parse this telemetry and output EXACTLY two insights:
- Insight 1: Category: "hydration", Title: "Hydration Risk Insight", Text: Explain the estimated risk based on vital strain and environmental loads. E.g., "Elevated heart strain and activity levels are increasing hydration demand. Current conditions suggest proactive fluid replenishment."
- Insight 2: Category: "recovery", Title: "Recovery Recommendation", Text: Provide a prescriptive hydration amount. E.g., "Based on current hydration deficit and workload, consuming 500ml water may help reduce hydration risk over the next recovery cycle."

Strict constraints:
- NEVER use diagnostic medical language, clinical diagnostic terms, disease names, or claim medical certainty.
- Always frame outputs in terms of "Estimated Hydration Risk", "AI-Assisted Hydration Intelligence", or "Sensor Fusion Analysis".
- Keep each text brief (20-30 words max).
- Return EXACTLY a JSON array containing objects matching the schema.`;

    const userPrompt = `
CURRENT TELEMETRY DATA:
- Heart Rate: ${sensorData.heartRate} BPM
- Activity Load: ${sensorData.activityLoad}/100 active index
- Ambient Temperature: ${sensorData.temperature}°C
- Ambient Humidity: ${sensorData.humidity}%
- Sweat Rate Indicator: ${sensorData.sweatGSR}μS Electrodermal Sweat index
- Computed Hydration Score: ${sensorData.hydrationScore}/100 (100 is fully optimal, 0 is critical risk)
- Hours since last fluid fluid sync: ${hoursSinceDrink} hours

USER BASELINE:
- Profile: Age ${profile.age}, Weight ${profile.weightKg}kg, Gender ${profile.gender}
- Setup Lifestyle: Habits rated as "${profile.waterHabit}" baseline compliance, Activity Level is "${profile.activityLevel}", Fitness Goal: "${profile.fitnessGoal}"
- Location: ${profile.location || 'Not Specified'}
- Pre-existing Medical Conditions: ${(profile.medicalConditions || []).join(', ') || 'None'}

Please return 2 ultra-customized insights as direct responses.`;

    const tracer = trace.getTracer("getvari-hydration-co-pilot");
    const parsedResponse = await tracer.startActiveSpan("gemini-insights-generation", async (span) => {
      try {
        span.setAttribute("openinference.span.kind", "LLM");
        span.setAttribute("input.value", userPrompt);
        span.setAttribute("llm.model_name", "gemini-3.5-flash");

        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: {
                    type: Type.STRING,
                    description: 'Must stand out as either "hydration", "activity", "temperature", or "recovery".',
                  },
                  title: {
                    type: Type.STRING,
                    description: 'Short futuristic medical tag (3-5 words max, e.g. "Thermoregulatory Sweat Loss", "Viscous Stroke Volume Impact")',
                  },
                  text: {
                    type: Type.STRING,
                    description: 'Actionable physiological guidance. Limit to 25 words maximum.',
                  },
                },
                required: ['category', 'title', 'text'],
              },
            },
          },
        });

        const outputText = response.text || '[]';
        span.setAttribute("output.value", outputText);
        span.setStatus({ code: 1 }); // OK/Unset
        return JSON.parse(outputText);
      } catch (err: any) {
        span.setStatus({ code: 2, message: err.message }); // Error
        throw err;
      } finally {
        span.end();
      }
    });
    
    // Ensure the response is parsed robustly as an array
    let insightsArray: any[] = [];
    if (Array.isArray(parsedResponse)) {
      insightsArray = parsedResponse;
    } else if (parsedResponse && typeof parsedResponse === 'object') {
      const possibleArray = Object.values(parsedResponse).find(val => Array.isArray(val));
      if (possibleArray) {
        insightsArray = possibleArray as any[];
      } else if ((parsedResponse as any).category && (parsedResponse as any).text) {
        insightsArray = [parsedResponse];
      }
    }
    
    // Add custom ids and timestamps to the Gemini insights
    const formattedInsights = insightsArray.map((insight: any, idx: number) => ({
      id: `gemini_insight_${idx}_${Date.now()}`,
      category: insight.category || 'hydration',
      title: insight.title || 'Physiological Variance Detect',
      text: insight.text || 'Telemetry values are fluctuating slightly. Hydrate based on your current recovery status index.',
      timestamp: new Date().toISOString(),
      source: 'gemini_brain',
    }));

    return res.json({ insights: formattedInsights });
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    const isQuotaError = errorMsg.includes('429') || 
                         errorMsg.includes('quota') || 
                         errorMsg.includes('RESOURCE_EXHAUSTED') || 
                         errorMsg.includes('limit');

    if (isQuotaError) {
      console.warn('⚠️ Gemini API free-tier developer quota/rate-limit hit (429 RESOURCE_EXHAUSTED). Gracefully falling back to physiological rules.');
    } else {
      console.error('Gemini insights generation error:', error);
    }

    // Graceful fallback to rich rule-based insights
    return res.json({ 
      insights: generateRuleBasedInsights().map(item => ({ ...item, source: 'rule_engine' })),
      fallbackReason: isQuotaError ? 'quota_exceeded' : 'general_error'
    });
  }
});

// Setup Vite Dev server or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    
    // Ensure API routes take precedence and pass non-API requests to Vite
    app.use((req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      vite.middlewares(req, res, next);
    });

    // Fallback for HTML SPA requests in dev mode
    app.use('*', async (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    console.log('Vite development server middleware loaded.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static asset routing loaded.');
  }

  app.listen(PORT_LANDING, '0.0.0.0', () => {
    console.log(`🌐 GetVari Main Server running on http://localhost:${PORT_LANDING}`);
  });

  app.listen(PORT_APP, '0.0.0.0', () => {
    console.log(`📱 GetVari App Twin & Dashboard running on http://localhost:${PORT_APP}`);
  });

  app.listen(PORT_VERSION_A, '0.0.0.0', () => {
    console.log(`✨ GetVari Version A (Original Multi-Fold) running on http://localhost:${PORT_VERSION_A}`);
  });

  app.listen(PORT_VERSION_B, '0.0.0.0', () => {
    console.log(`🚀 GetVari Version B (Single-Fold Rolling Text) running on http://localhost:${PORT_VERSION_B}`);
  });
}

startServer();
