# Agent Protocol Tech Tree

Live site: **https://harvard-lil.github.io/agent-protocols/**.

APTT is a visual, videogame-style tech tree of the key shared open protocols being developed by the companies and open source projects building AI agents.

## What this shows and how to use it

APTT shows the open protocols behind AI agents and the way each layer of protocols inspired or enabled the next.

This guide is opinionated: it is not a complete list of every protocol that exists, but a selection of popular protocols that show the arc of AI agent creation so far, as well as the leading fringe of less popular or less finished protocols that show potential futures.

An "open protocol" (for our purposes) means a shared language used by multiple software projects, coming from multiple sources, so they can interoperate or compete with each other. Protocols like this offer an x-ray of an emerging technology — they tell you what builders care about, what they've actually got working, what's catching on, and what's coming up next.

Much like a video game where you start with simple tools and build out, try starting at the beginning with "Inference API" and exploring to the right from there.

If you're learning about agents from a policy or non-tech perspective, the text descriptions for each tech might be most useful — think about why each layer became necessary, what it was trying to solve, how else things might have gone.

If you're learning from a tech perspective, dig into the animations and raw messages — you can see how messages flow, how the protocol lets different actors swap in and out, and then click any of the messages to see at a wire level what's actually happening. (Often, something simpler than it sounds.)

## Origin

APTT was vibe coded by Jack Cushman as a digital whiteboard sketch for the "Towards an Internet Ecosystem for Sane Autonomous Agents" convening at the Berkman Klein Center on February 9th, 2026. Like any good whiteboard sketch, it is hopefully wrong in the right direction.

## Contributing

This picture is still very incomplete and incorrect. Please file an issue if you want to offer corrections, additions, or suggestions. This will stay opinionated, so some suggestions may stay as Github discussions rather than going into the live site.

## Local development

There is no server-side code, but local html files can't load yaml files, so you need to run a local server. To update content:

Run `python3 -m http.server 8080` and navigate to `http://localhost:8080` in your browser. Edit `data.yaml`, and refresh the page.
