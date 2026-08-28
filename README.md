# Kestrel Integrator Docs

This folder contains a static documentation app that can be hosted independently, including on GitHub Pages.

## Structure

- `index.html` - entry page
- `assets/css/styles.css` - responsive documentation layout and page styling
- `assets/js/app.js` - hash routing, page loading, and responsive menu behavior
- `assets/pages/overview.html` - Introduction content
- `assets/pages/project.html` - Project concepts and resource boundaries
- `assets/pages/workflow.html` - Workflow editor, triggers, utilities, mapping, and execution
- `assets/pages/services.html` - Reusable service editor, contracts, flow steps, and invocation
- `assets/pages/map-pipeline.html` - MAP Pipeline operations, list mapping, and real examples
- `assets/pages/if-else.html` - Reusable service IF, ELSE IF, ELSE, and condition expressions
- `assets/pages/switch-case.html` - Reusable service SWITCH, CASE, regex, and DEFAULT behavior
- `assets/pages/loop.html` - Reusable service list iteration, current item, loopIndex, and EXIT
- `assets/pages/exit.html` - Reusable service normal exit, loop exit, and exception behavior
- `assets/pages/error-handling.html` - Reusable service TRY, CATCH, FINALLY, error document, and recovery behavior
- `assets/pages/utils.html` - Utility usage, mapping model, and generated built-in utility catalog
- `assets/js/utility-docs.js` - Executable utility reference data, nested menu, and detail-page rendering
- `assets/pages/kvs.html` - KVS configuration, password handling, and workflow usage
- `assets/pages/execution.html` - Execution architecture content
- `assets/pages/connectors.html` - Connector concepts and catalog
- `assets/pages/http-request.html` - Workflow HTTP Request guide covering REST, GraphQL, SOAP, authentication, retries, and pipeline variables
- `assets/pages/sftp.html` - SFTP prerequisites, Known Hosts verification, project connection setup, workflow operations, pipeline contracts, and troubleshooting
- `assets/pages/pipeline-sub.html` - Pipeline substitution syntax and copy instructions
- `assets/images/kestrel-logo.png` - local logo asset used by the header

## What it covers

- Introduction and core platform concepts
- Project organization and a code-aligned KVS guide
- Durable execution admission, worker processing, entry points, and lifecycle
- Shareable static routes include `#/utils` and one nested detail route for every utility, such as `#/utils/math-add-ints`, in addition to the main documentation pages.

## Hosting

Serve the folder with any static web server or publish its contents to GitHub Pages. No application backend or build step is required.

For a local preview:

```bash
cd Kestrel_Integrator_Docs
python3 -m http.server 8080
```

Then open `http://localhost:8080`. Hash-based routes keep direct links and browser back/forward navigation compatible with static hosting.
