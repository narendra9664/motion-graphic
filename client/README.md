# client/

Client work: SaaS explainers, promos and product launch videos. One folder per client, one subfolder per video:

```
client/<client-name>/<yyyy-mm-dd>-<slug>/
```

Create one with `node backend/scripts/new-project.mjs client <client-name> <slug> [seconds]` and follow the `client-video` skill.

Everything in this folder is confidential by default and git-ignored. A client folder is only committed after the client gives written permission (un-ignore it in `.gitignore`).
