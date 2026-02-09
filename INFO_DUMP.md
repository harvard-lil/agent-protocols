Interop protocols for agents talking to tools, agents, and businesses

Model Context Protocol (MCP)
	•	Problem it solves: Standardizes the “N×M” integration problem between LLM apps and external tools/data sources (files, DBs, SaaS, workflows) so a client can connect to many servers without bespoke glue each time.  ￼
	•	Technical nutshell: An application-layer protocol using JSON-RPC 2.0 with a client/server architecture (LLM app = MCP client; tool/data exposure = MCP server). The spec defines primitives for exposing tools and contextual resources, plus request/response and streaming patterns.  ￼
	•	Originator: Introduced by Anthropic (public announcement Nov 25, 2024).  ￼
	•	Adoption / ownership: Broad uptake across the “tooling + agent” ecosystem (e.g., vendors shipping MCP servers/clients; increasing attention to security hardening as MCP servers become a production surface).  ￼

Agent2Agent Protocol (A2A)
	•	Problem it solves: Cross-vendor agent-to-agent interoperability: discovery, negotiation of modalities (messages, artifacts, streams), and task coordination when each agent is opaque and built on different frameworks.  ￼
	•	Technical nutshell: Defines objects like AgentCard (agent metadata/capabilities), Task, Message, Artifact, and a task lifecycle plus discovery mechanisms; focuses on agents collaborating “as agents,” not just calling tools.  ￼
	•	Originator: Announced by Google (Apr 9, 2025).  ￼
	•	Adoption / ownership: Formalized under open governance (Linux Foundation project) and implemented by multiple platforms/frameworks; enterprise-facing ecosystems (including Microsoft documentation/support) position it as a standard integration surface.  ￼

Agent Communication Protocol (ACP) — IBM / BeeAI
	•	Problem it solves: A standardized wire format + interaction model for independent agents to coordinate across systems/organizations (similar goal to A2A; different lineage/implementation choices).  ￼
	•	Technical nutshell: A formal communication standard intended to let heterogeneous agents exchange structured messages reliably; published with documentation and reference implementation via BeeAI.  ￼
	•	Originator: Introduced by IBM Research / BeeAI; positioned as an open standard with Linux Foundation involvement/governance.  ￼
	•	Adoption / ownership: Adopted primarily in/around IBM’s BeeAI ecosystem, plus broader community interest as an interop alternative alongside A2A and MCP.  ￼

Commerce and payments protocols for “agents that buy things”

Agentic Commerce Protocol (ACP) — OpenAI + Stripe
	•	Problem it solves: A standard interaction model for agentic checkout: structured state, tool calls, and secure exchange of commerce/payment credentials so merchants can transact with many agents without custom integrations per agent.  ￼
	•	Technical nutshell: A spec (beta) defining roles (buyer/agent/merchant), structured steps/state through discovery → checkout → post-purchase, and integration points to transact programmatically while keeping merchants as merchant-of-record.  ￼
	•	Originator: OpenAI and Stripe (maintain the spec; Apache 2.0; “Instant Checkout” cited as an early product experience).  ￼
	•	Adoption / ownership: Uptake tracks ChatGPT commerce integrations and Stripe’s merchant ecosystem; positioned explicitly as open for any agent/payment processor to implement.  ￼

Universal Commerce Protocol (UCP) — Shopify + Google
	•	Problem it solves: A vendor-agnostic standard for connecting agents to merchant commerce flows across the full journey (not only payment): product discovery → cart → checkout → post-purchase.  ￼
	•	Technical nutshell: A published spec + reference implementations aimed at letting agents transact with any merchant while preserving merchant-specific checkout customizations and fallbacks (e.g., handoff URLs) when automation can’t complete.  ￼
	•	Originator: Shopify (developed by) and Google (co-developed).  ￼
	•	Adoption / ownership: Adopted by large retailers and payments ecosystem partners in connection with Google’s shopping surfaces and Shopify’s merchant base; described as ecosystem-supported at launch.  ￼

Visa Trusted Agent Protocol (TAP)
	•	Problem it solves: Lets merchants distinguish legitimate, user-authorized agents from generic bots via cryptographic identity and authorization signals during browsing and purchase.  ￼
	•	Technical nutshell: Agents attach message signatures (via HTTP headers / request metadata). Merchants reconstruct a signature_base and verify with the agent’s public key; spec includes trust model, key retrieval, verification steps, and operational best practices.  ￼
	•	Originator: Visa (ecosystem-led framing; built on HTTP message signatures standards).  ￼
	•	Adoption / ownership: Positioned for broad merchant adoption (Visa’s scale), with partners (e.g., Cloudflare collaboration mentioned in public coverage).  ￼

Web Bot Auth (Cloudflare; IETF-draft based)
	•	Problem it solves: A general web-layer identity primitive: cryptographically prove automated traffic identity so sites can apply policy (allow/rate-limit/block) without brittle IP allowlists and user-agent guessing; used for “signed agents” and verified bots.  ￼
	•	Technical nutshell: Relies on HTTP message signatures (Signature / Signature-Input) and a directory mechanism for publishing public keys; Cloudflare ships tooling and registry concepts around it.  ￼
	•	Originator: Cloudflare proposal built on active IETF drafts (architecture + directory), with ecosystem partners integrating.  ￼
	•	Adoption / ownership: Used by Cloudflare products; cited as an auth layer leveraged by Visa TAP and Mastercard Agent Pay; also referenced by AWS Bedrock AgentCore Browser docs as a mitigation for CAPTCHA friction.  ￼

Agent Payments Protocol (AP2) — Google
	•	Problem it solves: Standardizes secure initiation/transaction of agent-led payments across platforms, positioned as interoperable with agent stacks (A2A/MCP).  ￼
	•	Technical nutshell: A payments-focused protocol described as an extension usable alongside A2A and MCP to carry payment intents/flows in a standardized way.  ￼
	•	Originator: Google, developed with “leading payments and technology companies.”  ￼
	•	Adoption / ownership: Early stage; referenced as a building block in Google’s broader agent interoperability and commerce push.  ￼

“Instruction surfaces” and discoverability conventions (agents reading files/metadata)

AGENTS.md
	•	Problem it solves: A predictable, repo-local place to put project-specific operational context for coding agents (setup, workflows, style, boundaries) without burying it in README noise.  ￼
	•	Technical nutshell: A Markdown file (AGENTS.md) with conventions for sections like setup commands, tests, code style, and project guidance; supports monorepo layering by placing files in subdirectories.  ￼
	•	Originator: Community-driven format (public spec site + GitHub org).  ￼
	•	Adoption / ownership: Claimed adoption across many open-source repos; promoted by ecosystem players like GitHub (guidance on writing effective AGENTS.md).  ￼

/llms.txt
	•	Problem it solves: A website-level “AI-readable index” so LLMs/agents can find and use the right docs pages efficiently (analogous to sitemap/robots patterns, but optimized for LLM consumption).  ￼
	•	Technical nutshell: A Markdown document at /llms.txt using headings/links to key resources and (optionally) structured conventions for directories and doc navigation.  ￼
	•	Originator: Proposed by Jeremy Howard (published Sep 3, 2024).  ￼
	•	Adoption / ownership: Picked up by documentation/SEO ecosystems and tools that auto-generate it (e.g., documentation platforms describing first-class support).  ￼

Agent Skills standard (SKILL.md / “skills” packages)
	•	Problem it solves: A portable way to package task-specific playbooks + resources + optional scripts that multiple agents can discover and use (“write once, use everywhere”).  ￼
	•	Technical nutshell: A skill is a directory with required SKILL.md plus optional scripts/, references/, assets/; “skill.md” is also used as a hosted well-known entry point by some doc platforms.  ￼
	•	Originator: Open standard with multiple ecosystem participants; OpenAI’s Codex docs explicitly state it “builds on the open agent skills standard.”  ￼
	•	Adoption / ownership: Implemented by multiple coding agents/IDEs (VS Code Copilot docs; Cursor docs; OpenAI Codex docs) and actively used as a distribution mechanism (e.g., Cloudflare publishes skills repos).  ￼

“Tool invocation” via API schema (proto-standard patterns used by agents)

ChatGPT Plugins manifest + OpenAPI (and GPT Actions)
	•	Problem it solves: A standard(ish) way to let an LLM call external APIs safely by providing API schemas + auth metadata + minimal instructions, enabling tool use without custom per-tool model training.  ￼
	•	Technical nutshell:
	•	Plugins: a JSON manifest at /.well-known/ai-plugin.json pointing to an OpenAPI spec (and describing auth and metadata).  ￼
	•	GPT Actions: similarly imports an OpenAPI schema to define callable actions.  ￼
	•	Originator: OpenAI introduced plugins (Mar 2023) and later Actions; OpenAPI is an external standard used as the schema substrate.  ￼
	•	Adoption / ownership: Widely adopted as a de facto interface pattern for tool calling across “GPT-style” products; still more a platform convention than a single cross-vendor neutral protocol (unlike MCP/A2A).  ￼

Human Context Protocol (HCP): note on name collision

“HCP” currently refers to at least two distinct proposals:
	•	Memory-manager interop HCP (Stanford Digital Economy Lab “Loyal Agents” work): connects LLM clients and “LLM memory managers.”  ￼
	•	Enterprise prompt-shortcuts HCP (Stratalis / David McKee): a lightweight user→agent prompt convention (e.g., “send ? for shortcuts”).  ￼

Only the Stanford-linked HCP reads like an actual interop protocol with a defined client/manager boundary; adoption looks early and research-driven.  ￼

Fast map: which layer each “protocol” targets
	•	Tool/data connection: MCP  ￼
	•	Agent↔agent coordination: A2A; IBM ACP  ￼
	•	Commerce flows: OpenAI/Stripe ACP; Shopify/Google UCP  ￼
	•	Agent identity on the web: Visa TAP; Web Bot Auth  ￼
	•	Packaging instructions/know-how: AGENTS.md; Agent Skills; llms.txt  ￼
	•	Schema-driven API tool calling: OpenAI plugins/actions pattern  ￼



  MCP (Model Context Protocol) — JSON-RPC 2.0 over a transport

// 1) discover tools
{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}

// 2) server advertises a tool (name + JSON Schema-ish input)
{"jsonrpc":"2.0","id":1,"result":[{"name":"search","description":"Web search","inputSchema":{"type":"object","properties":{"q":{"type":"string"}},"required":["q"]}}]}

// 3) call a tool
{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search","arguments":{"q":"site:example.com refund policy"}}}

(Discovery + tools/list/tools/call pattern is central.)  ￼

⸻

A2A (Agent2Agent) — AgentCard + task/message/artifact model

AgentCard at /.well-known/agent-card.json:

{
  "name":"InvoiceAgent",
  "description":"Extracts invoice fields from PDFs",
  "url":"https://agent.example/a2a",
  "provider":{"organization":"ExampleCo","url":"https://example.com"},
  "version":"1.0.0",
  "capabilities":{"streaming":true,"pushNotifications":false,"stateTransitionHistory":true},
  "authentication":{"schemes":["Bearer"]},
  "defaultInputModes":["application/pdf","text/plain"],
  "defaultOutputModes":["application/json"],
  "skills":[{"id":"extract","name":"Extract invoice","description":"Parse invoices","tags":["ap"],"examples":["Extract totals from this PDF"]}]
}

(AgentCard location + core fields.)  ￼

Minimal “start a task” request (illustrative shape):

{
  "task":{"id":"t-123","state":"submitted"},
  "messages":[{"role":"user","parts":[{"content_type":"text/plain","content":"Extract invoice fields from https://.../inv.pdf"}]}]
}

(Uses “task/messages/parts” abstractions.)  ￼

⸻

ACP (Agent Communication Protocol) — REST runs + modes (sync/async/stream)

Start a run (sync default):

curl -X POST http://localhost:8000/runs \
  -H "Content-Type: application/json" \
  -d '{"agent_name":"echo","input":[{"role":"user","parts":[{"content":"Howdy!","content_type":"text/plain"}]}]}'

Start a run (async):

curl -X POST http://localhost:8000/runs \
  -H "Content-Type: application/json" \
  -d '{"agent_name":"echo","input":[{"role":"user","parts":[{"content":"Hello"}]}],"mode":"async"}'

Start a run (SSE streaming):

curl -N -H "Accept: text/event-stream" -X POST http://localhost:8000/runs \
  -H "Content-Type: application/json" \
  -d '{"agent_name":"echo","input":[{"role":"user","parts":[{"content":"Hello"}]}],"mode":"stream"}'

(Endpoints and modes.)  ￼

⸻

UCP (Universal Commerce Protocol) — checkout session with UCP headers + body

Create checkout session (from Google’s “under the hood” post; long fields trimmed):

curl -s -X POST "$SERVER_URL/checkout-sessions" \
  -H 'Content-Type: application/json' \
  -H 'UCP-Agent: profile="https://agent.example/profile"' \
  -H 'request-signature: test' \
  -H 'idempotency-key: 0b50cc6b-19b2-42cd-afee-6a98e71eea87' \
  -H 'request-id: 6d08ae4b-e7ea-44f4-846f-d7381919d4f2' \
  -d '{
    "line_items":[{"item":{"id":"bouquet_roses","title":"Red Rose"},"quantity":1}],
    "buyer":{"full_name":"John Doe","email":"john.doe@example.com"},
    "currency":"USD",
    "payment":{"instruments":[],"handlers":[{"id":"shop_pay","name":"com.shopify.shop_pay","version":"2026-01-11","config":{"shop_id":"..."} }]}
  }'

Representative response fields:

{"ucp":{"version":"2026-01-11","capabilities":[{"name":"dev.ucp.shopping.checkout","version":"2026-01-11"}]},
 "id":"cb9c0fc5-3e81-427c-ae54-83578294daf3",
 "status":"ready_for_complete"}

(Headers, endpoint, schema shape, capability versioning.)  ￼

⸻

AP2 (Agent Payments Protocol) — “mandates” as signed credentials

Intent Mandate (minimal illustrative JSON credential skeleton):

{
  "type":"IntentMandate",
  "ttl":"2026-02-08T22:00:00Z",
  "prompt_playback":"Buy a refundable bouquet under $50 from Flower Shop.",
  "payer":{"id":"did:key:..."},
  "payee":{"merchant_id":"flower-shop"},
  "chargeable_payment_methods":["card/*"],
  "shopping_intent":{"sku":"bouquet_roses","max_amount":{"amount":5000,"currency":"USD"}},
  "risk_payload":{"device_attestation":"..."},
  "proof":{"type":"Ed25519Signature2020","created":"...","verificationMethod":"did:key:...#k1","signature":"..."}
}

(Intent Mandate contents: payer/payee, payment methods, risk payload, shopping intent, prompt playback, TTL; cryptographic signing.)  ￼

⸻

Visa TAP (Trusted Agent Protocol) — HTTP Message Signatures + canonical signature base

Request headers (compressed):

GET /example-product HTTP/1.1
Host: example.com
Signature-Input: sig2=("@authority" "@path");created=1735689600;expires=1735693200;keyid="...";alg="Ed25519";nonce="...";tag="agent-browser-auth"
Signature: sig2=:BASE64_SIGNATURE:

(HTTP signature inputs + tag/nonce/time bounds.)  ￼

Canonical signature base string (exact structure matters):

@authority: example.com
@path: /example-product
"@signature-params": sig2=("@authority" "@path");created=1735689600;keyid="...";expires=1735693200;nonce="...";tag="agent-browser-auth"

(Example signature-base construction.)  ￼

⸻

Web Bot Auth (Cloudflare / IETF-style HTTP message signatures)

(Structurally the same “Signature-Input / Signature” pattern; tag differs by scheme.)

GET /path/to/resource HTTP/1.1
Host: www.example.com
Signature-Input: sig2=("@authority" "@path");created=...;expires=...;keyid="...";alg="Ed25519";nonce="...";tag="web-bot-auth"
Signature: sig2=:...:

(Example shown in Cloudflare writeup; Visa/Mastercard layer additional tags/dirs on top.)  ￼

⸻

“Instruction surfaces” (repo/site conventions)

AGENTS.md

# AGENTS.md

## Setup
- `uv sync`
- `uv run pytest`

## How to work
- Prefer small PRs.
- Run `ruff format` before commit.

## Boundaries
- Never change prod credentials handling without a reviewer.

/llms.txt

# llms.txt

## Docs
- /docs/getting-started
- /docs/api

## Canonical specs
- /docs/protocol
- /docs/security

## Examples
- /docs/examples/basic

Agent Skills standard (skill package)

Filesystem:

skills/weather/
  SKILL.md
  scripts/get_weather.py
  references/open-meteo.md

SKILL.md (minimal):

# Weather lookup

## Inputs
- location (string)

## Output
- JSON: { "temp_c": number, "summary": string }

## Usage
Call `scripts/get_weather.py --location "Boston, MA"`.


⸻

Schema-driven API tool calling (ChatGPT Plugins / GPT Actions-style)

/.well-known/ai-plugin.json

{
  "schema_version":"v1",
  "name_for_human":"Example Tools",
  "name_for_model":"example_tools",
  "description_for_model":"Call the API to search and fetch items.",
  "auth":{"type":"none"},
  "api":{"type":"openapi","url":"https://example.com/openapi.yaml"},
  "logo_url":"https://example.com/logo.png",
  "contact_email":"support@example.com",
  "legal_info_url":"https://example.com/legal"
}

OpenAPI fragment (one callable operation)

openapi: 3.0.1
paths:
  /search:
    get:
      operationId: search
      parameters:
        - in: query
          name: q
          schema: { type: string }
          required: true
      responses:
        "200":
          description: ok
          content:
            application/json:
              schema:
                type: object
                properties:
                  results:
                    type: array
                    items: { type: string }


⸻

HCP (Human Context Protocol) — client ↔ memory manager via “schema/search/update”

(Stanford describes three high-level tools: schema definition, preference search, preference update.)  ￼

Schema definition (minimal JSON):

{"tool":"hcp.schema.define","params":{"namespace":"prefs","schema":{"type":"object","properties":{"tone":{"enum":["terse","normal"]},"units":{"enum":["metric","imperial"]}}}}}

Preference search:

{"tool":"hcp.pref.search","params":{"query":"units","top_k":3}}

Preference update:

{"tool":"hcp.pref.update","params":{"patch":[{"op":"replace","path":"/units","value":"metric"}]}}

(Names vary across implementations; the invariant is the 3-operation split and the client↔memory-manager boundary.)  ￼




Add: MCP Apps (MCP “Apps” extension / SEP-1865)
	•	Problem it solves: Makes MCP integrations interactive by letting an MCP server ship a UI surface (embedded in the host client) rather than only returning text/json. This enables “apps-within-the-agent” workflows (permissions, previews, editors, dashboards) while keeping tool execution on the server.  ￼
	•	What it looks like (technical nutshell):
	•	A tool declares a UI resource (e.g., ui://…) describing an HTML interface.
	•	Host fetches and renders it in a sandboxed iframe.
	•	Host and UI exchange data via notifications / bidirectional messaging, and UI can trigger additional tool calls via the host.  ￼
	•	Originator / stewardship: Documented as an MCP extension; the MCP Apps blog notes authorship by MCP core maintainers and an MCP UI community working group; the extension has an official repo.  ￼
	•	Adoption (who’s shipping it): The MCP Apps docs list current client support including Claude, Claude Desktop, VS Code (Insiders), Goose, Postman, and MCPJam (and note host support varies).  ￼

Anything else to add (high-signal additions)

agents.json (web-level discovery/contract over OpenAPI)
	•	Why add: Complements MCP/A2A by standardizing a discoverable “contract file” that turns an OpenAPI-described site/API into agent-callable affordances without bespoke prompt glue.
	•	What it looks like: A file (conventionally under /.well-known/agents.json) that describes agent/API interaction contracts built on top of OpenAPI; repo/spec exists with a published schema/versioning.  ￼
	•	Traction signal: Non-trivial GitHub activity and cross-linking from adjacent “agentic web” proposals.  ￼

agent:// URI + agent.json / agents.json (IETF Internet-Draft track)
	•	Why add: Attempts to standardize addressing + discovery for network-reachable agents using a URI scheme and well-known descriptors, aligning with ecosystems that already use “AgentCard”-style metadata.
	•	What it looks like:
	•	Per-agent descriptor at .../agent.json
	•	/.well-known/agent.json for single-agent deployments
	•	/.well-known/agents.json for multi-agent directories  ￼
	•	Traction signal: Appears on the IETF datatracker as an active draft; ties into emerging discovery conventions.  ￼

ANP (Agent Network Protocol)
	•	Why add: Another “agentic web” proposal aimed at being “HTTP-like” for agent networks (agent↔agent connectivity, identity, routing, decentralized discovery).
	•	What it looks like: Public spec repo + website positioning and a technical white paper describing the protocol family and framework.  ￼
	•	Traction signal: Meaningful GitHub stars and presence in IETF draft ecosystem around agent networks (early, but more than a one-off gist).  ￼

Notes on scope
	•	“MCP Apps” is best treated as an extension layer on MCP (UI resources + sandboxed rendering + bidirectional host↔UI communication), not a separate end-to-end agent protocol.  ￼
	•	agents.json / agent:// / ANP sit closer to “agentic web” discovery + addressing + network interaction than MCP’s tool-connection focus.  ￼




  Full “agent tech tree” (layers + dependency edges)

A workable tree is a stack, with lateral branches where multiple standards compete at the same layer.

0) Base transport + identity primitives

You get these “for free” from the web ecosystem; everything above composes on them.
	•	HTTP(S), JSON, OAuth/OIDC, API keys, webhooks, SSE/WebSockets
	•	HTTP Message Signatures (foundation used by “verified agent/bot” schemes like Web Bot Auth and commerce identity overlays)

(These aren’t “agent protocols” but they are prerequisites for the rest.)

⸻

1) Model API (inference boundary)

Problem: a stable way for an app to send prompts and receive model outputs.
	•	Semi-standardization happened around chat-style request/response, streaming, roles/messages, and vendor-specific payload shapes.

This layer enables everything above it by making the model a callable component.

⸻

2) Tool calling in the model API (post-training affordance)

Problem: allow the model to emit structured “call this function/tool with args” outputs, and then continue after the app executes it.
	•	This is the “tool loop” pattern in OpenAI and Azure OpenAI docs: you provide tool specs, model returns a tool call, app executes, app returns tool output, model continues.  ￼

Key dependency: You don’t get MCP/A2A-style ecosystems without reliable tool-calling semantics (or an equivalent, like constrained structured outputs).

⸻

3) Tool schema standards (how tools are described)

Problem: define a machine-readable contract for callable capabilities.
Competing / complementary options:
	•	OpenAPI-based tool specs (plugins/actions pattern; vendor/platform convention)
	•	JSON Schema-ish function signatures (common in tool calling)

This layer is what makes “a tool” portable and discoverable inside an agent runtime, regardless of how the tool is hosted.

⸻

4) Tool connectivity protocols (agent ↔ tool servers)

Problem: avoid bespoke integrations between each agent runtime and each tool provider.

MCP (Model Context Protocol) sits here:
	•	MCP defines a client/server protocol (JSON-RPC data layer + transports) for exposing tools/resources/prompts uniformly.  ￼

MCP Apps is an extension layer on MCP:
	•	Adds a UI surface (sandboxed) so tool providers can ship interactive views, not only JSON/text outputs.

Dependency: requires (2) tool calling (or an equivalent orchestration loop) in the host agent runtime; MCP standardizes the other side (tool server) and discovery/call mechanics.

⸻

5) “Instruction surfaces” for context injection and capability packaging

These are not wire protocols; they are conventions for giving agents better context and structured know-how.

AGENTS.md (repo-local agent guidance)
	•	Fits directly into (1)/(2): it is prompt/context material injected early by the agent host (or discovered by the agent) to steer behavior in that repo.

Agent Skills (SKILL.md + optional scripts/references/assets)
	•	Sits between (2) and (4): it’s a portable capability pack the host can load on demand (progressive disclosure).
	•	Format is a directory with required SKILL.md plus optional support directories.  ￼

/llms.txt
	•	Sits adjacent to (3)/(5): it’s a website-level LLM-readable index to help agents choose what to fetch as context.  ￼

How these relate:
	•	AGENTS.md is “project-local steering context.”
	•	Skills are “packaged procedural knowledge + optional executables.”
	•	llms.txt is “site navigation for context acquisition.”

All three ultimately feed back into (1)/(2): they shape prompts, tool choice, and retrieval.

⸻

6) Agent ↔ agent interoperability (coordination layer)

Problem: agents need to delegate, negotiate, and exchange artifacts across vendors/frameworks.

Competing standards live here:
	•	A2A (Agent2Agent): agent discovery + task/message/artifact lifecycles.
	•	ACP (Agent Communication Protocol): similar goal with different API surface and ecosystem.

Dependency: assumes (1)/(2) to run any given agent, but is orthogonal to (4) (tool protocols). An agent can use MCP for tools and A2A/ACP to talk to other agents.

⸻

7) Domain-specific protocols built on top (commerce/payments)

Problem: specialized end-to-end flows with strong security and business constraints.

Examples:
	•	UCP / Agentic commerce protocols / AP2: product/cart/checkout/payment intent flows
	•	Visa TAP / Web Bot Auth: identity/attestation for “this traffic is an authorized agent,” typically layered onto HTTP message signature primitives

Dependencies:
	•	Often assume (6) or at least agent delegation.
	•	Often reuse (0) HTTP signatures + trust directories for verification.
	•	Often integrate with (4) tool protocols for calling merchant/payment backends.

⸻

A compact ASCII tree

(0) Web primitives: HTTP + auth + webhooks + message signatures
  |
(1) Model API (chat-style inference boundary)
  |
(2) Tool calling (structured calls + tool loop)  ← OpenAI/Azure pattern
  |
(3) Tool schemas (JSON Schema-ish, OpenAPI)
  |
  +--> (4) Tool connectivity: MCP (JSON-RPC client/server) 
  |         +--> MCP Apps (UI surfaces for MCP tools)
  |
  +--> (5) Instruction surfaces (context/capability packaging)
  |         - AGENTS.md (repo steering context)
  |         - Skills (SKILL.md + assets/scripts; progressive disclosure)
  |         - /llms.txt (site context index)
  |
  +--> (6) Agent↔agent protocols (A2A, ACP)
             |
             +--> (7) Domain stacks (commerce/payments, identity overlays)
                    - UCP / ACP-style commerce flows
                    - AP2 (payments intent/mandates)
                    - Visa TAP / Web Bot Auth (signed-agent identity)

