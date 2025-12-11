'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Key } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DocsPage() {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/status',
      description: 'System status and version information',
      response: {
        status: 'operational',
        last_updated: '2025-12-12T02:10:03Z',
        version: '1.0.0'
      }
    },
    {
      method: 'GET',
      path: '/api/regime',
      description: 'Current macro regime probabilities',
      response: {
        current: {
          primary: 'Disinflationary',
          probability: 74,
          horizon: '90d'
        },
        timeseries: [...]
      }
    },
    {
      method: 'GET',
      path: '/api/shock',
      description: 'Narrative shock analysis across domains',
      response: [
        {
          domain: 'Fed',
          score: 23,
          intensity: 'low',
          top_headlines: [...]
        }
      ]
    },
    {
      method: 'GET',
      path: '/api/mispriced',
      description: 'Top mispriced prediction markets',
      response: [
        {
          id: 'fed-cuts-q1-2026',
          name: 'Fed cuts rates by March 2026',
          market_price: 0.34,
          model_price: 0.52,
          edge: 0.18
        }
      ]
    },
    {
      method: 'GET',
      path: '/api/recommendations',
      description: 'Current AI-generated trade recommendations',
      response: [
        {
          id: 'rec-001',
          market_name: 'Fed cuts rates by March 2026',
          position: 'YES',
          kelly_fraction: 0.08,
          confidence_band: '65-78%'
        }
      ]
    },
    {
      method: 'POST',
      path: '/api/chat',
      description: 'AI chat interface for macro analysis',
      request: {
        message: 'Probability Fed cuts by 2026-03-31'
      },
      response: {
        answer: 'There is a 52% chance the Fed cuts rates by 2026-03-31.',
        rationale: 'Cycle: liquidity remains tight...',
        confidence: 'medium',
        horizon: '90 days'
      }
    }
  ];

  const dataSources = [
    {
      category: 'Economic Data',
      sources: ['FRED (Federal Reserve Economic Data)', 'OECD Economic Indicators', 'World Bank Open Data'],
      description: 'Core macroeconomic indicators including inflation, employment, GDP, and monetary policy data.'
    },
    {
      category: 'Central Banks',
      sources: ['Federal Reserve APIs', 'ECB Statistical Data Warehouse', 'Bank of England API', 'Bank of Japan'],
      description: 'Real-time policy communications, meeting minutes, and official statements from major central banks.'
    },
    {
      category: 'News & Media',
      sources: ['Financial Times API', 'Bloomberg Terminal', 'Reuters News API', 'Federal Reserve Speeches'],
      description: 'Real-time news feeds, central bank speeches, and narrative-shifting events with sentiment analysis.'
    },
    {
      category: 'Prediction Markets',
      sources: ['PredictIt API', ' Kalshi API', 'PolyMarket GraphQL', 'Manifold Markets'],
      description: 'Market-derived probabilities from leading prediction market platforms for event outcome pricing.'
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-[#10B981] text-[#000000]';
      case 'POST':
        return 'bg-[#FFA500] text-[#000000]';
      default:
        return 'bg-[#A1A1AA] text-[#000000]';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-[#FFFFFF] mb-6">
            API Documentation
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto leading-relaxed">
            Comprehensive API documentation for MacroCycle AI data endpoints, 
            data sources, and integration examples.
          </p>
        </motion.div>

        {/* API Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-orbitron font-bold text-[#FFFFFF] mb-8 flex items-center">
            <Code className="h-8 w-8 mr-3 text-[#FFA500]" />
            API Endpoints
          </h2>
          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded text-sm font-mono font-medium ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono text-[#FFFFFF]">{endpoint.path}</code>
                  </div>
                  <p className="text-[#A1A1AA]">{endpoint.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {endpoint.request && (
                      <div>
                        <h4 className="text-sm font-medium text-[#A1A1AA] mb-2">Request Body:</h4>
                        <pre className="bg-[#18181B] p-4 rounded-lg text-sm text-[#FFFFFF] overflow-x-auto">
                          {JSON.stringify(endpoint.request, null, 2)}
                        </pre>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium text-[#A1A1AA] mb-2">Response:</h4>
                      <pre className="bg-[#18181B] p-4 rounded-lg text-sm text-[#FFFFFF] overflow-x-auto">
                        {JSON.stringify(endpoint.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-orbitron font-bold text-[#FFFFFF] mb-8">
            Usage Examples
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>cURL Example</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-[#18181B] p-4 rounded-lg text-sm text-[#FFFFFF] overflow-x-auto">
{`# Get current regime data
curl -X GET https://api.macrocycle.ai/api/regime \\
  -H "Accept: application/json"

# Expected Response:
{
  "data": {
    "current": {
      "primary": "Disinflationary",
      "probability": 74,
      "horizon": "90d"
    }
  }
}`}
                </pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>JavaScript Example</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-[#18181B] p-4 rounded-lg text-sm text-[#FFFFFF] overflow-x-auto">
{`// Fetch mispriced markets
const response = await fetch('/api/mispriced');
const data = await response.json();

console.log('Top opportunities:', data.data);

// Chat with AI
const chatResponse = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Probability Fed cuts by 2026'
  })
});

const result = await chatResponse.json();
console.log('AI Response:', result.answer);`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Data Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-orbitron font-bold text-[#FFFFFF] mb-8 flex items-center">
            <Database className="h-8 w-8 mr-3 text-[#FFA500]" />
            Data Sources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dataSources.map((source, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{source.category}</CardTitle>
                  <p className="text-[#A1A1AA] text-sm">{source.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {source.sources.map((sourceName, sourceIndex) => (
                      <li key={sourceIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-[#FFA500] rounded-full" />
                        <span className="text-[#FFFFFF]">{sourceName}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Authentication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-orbitron font-bold text-[#FFFFFF] mb-8 flex items-center">
            <Key className="h-8 w-8 mr-3 text-[#FFA500]" />
            Authentication
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-[#A1A1AA]">
                  Currently, all endpoints are publicly accessible for demonstration purposes. 
                  In production, API access will require authentication.
                </p>
                <div className="p-4 bg-[#18181B] rounded-lg">
                  <h4 className="font-medium text-[#FFFFFF] mb-2">Planned Authentication:</h4>
                  <pre className="text-sm text-[#A1A1AA]">
{`# Future: API Key Authentication
curl -X GET https://api.macrocycle.ai/api/regime \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rate Limits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h2 className="text-3xl font-orbitron font-bold text-[#FFFFFF] mb-8 flex items-center">
            <Globe className="h-8 w-8 mr-3 text-[#FFA500]" />
            Rate Limits & Support
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rate Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-[#A1A1AA]">
                  <li className="flex justify-between">
                    <span>General API calls:</span>
                    <span className="font-mono text-[#FFFFFF]">1000/hour</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Chat endpoint:</span>
                    <span className="font-mono text-[#FFFFFF]">100/hour</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Burst limit:</span>
                    <span className="font-mono text-[#FFFFFF]">10/minute</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Support & Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-[#A1A1AA]">
                  <p>For API support and integration assistance:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#FFA500] rounded-full" />
                      <span>Email: api@macrocycle.ai</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#FFA500] rounded-full" />
                      <span>Documentation: docs.macrocycle.ai</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#FFA500] rounded-full" />
                      <span>Status Page: status.macrocycle.ai</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-orbitron font-bold text-[#FFFFFF] mb-4">
            Ready to integrate?
          </h2>
          <p className="text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
            Start building with our comprehensive API suite and bring 
            AI-powered macro analysis to your applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="px-8">
              Get API Key
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              View Examples
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}