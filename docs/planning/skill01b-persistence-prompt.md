# Skill 01B Persistence Handoff

Run Skill 01B only against the approved Skill 01A outputs in this project.

```yaml
site_id: thailand-field-notes
project_root: C:\Users\rolel\Desktop\site\site-Thailand Field Notes
local_output_path: C:\Users\rolel\Desktop\site\site-Thailand Field Notes
raw_content_source_path: C:\Users\rolel\Desktop\网站\Thailand Field Notes
archive_batch_id: thailand-field-notes-20260806-01
skill: "01"
mode: persist_authority
```

Required 01B actions:

1. Preserve every approved 01A output without rewriting its authored content.
2. Archive the raw source unchanged under `imports/raw-content/original/`.
3. Generate `imports/raw-content/raw-content-original-manifest-v1.md`.
4. Hash and validate all required outputs against `skill01-output-manifest-v1.json`.
5. Update the lifecycle registry and create a run-scoped cleanup report.
6. Emit `SKILL01B_PERSISTENCE_PASS` only after the archive, identity, SHA256, path, and downstream-read checks pass.

Do not start Skill 02/03/04/05/06/07/08, Admin, build, Git, or deployment.
