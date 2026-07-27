import { createFileRoute } from '@tanstack/react-router';
import { createMCPClient } from '@tanstack/ai-mcp';

export async function handleApiChat(request: Request) {
  try {
    const body = await request.json();
    const { messages = [] } = body;

    const mcpServerUrl = process.env.MCP_SERVER_URL || 'https://my-mcp-server.example.com/mcp';

    // Initialize TanStack AI MCP client
    const mcp = await createMCPClient({
      transport: {
        type: 'http',
        url: mcpServerUrl,
        headers: process.env.MCP_TOKEN ? { Authorization: `Bearer ${process.env.MCP_TOKEN}` } : {},
      },
    });

    // Perform tool discovery
    const tools = await mcp.tools();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'TanStack AI MCP integration active',
        discoveredToolsCount: tools.length,
        messagesReceived: messages.length,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('TanStack AI MCP Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process MCP request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export const Route = createFileRoute('/api/chat')({
  loader: () => ({ status: 'API Chat Route Ready' }),
});
