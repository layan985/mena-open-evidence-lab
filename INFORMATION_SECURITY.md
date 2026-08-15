# Information Security Standard

_Last updated: 16 August 2026_

This standard applies whenever the Lab handles restricted, confidential or client-supplied information.

## Minimum controls

- MFA on institutional accounts.
- Full-disk encryption on devices used for restricted work.
- Password-manager generated credentials; no credential reuse.
- Role-based access and least privilege.
- Separate client workspaces and explicit access lists.
- Encrypted cloud storage for restricted materials.
- No restricted client data, credentials or personally identifying information in public GitHub repositories.
- Secrets management through environment/configuration systems rather than source files.
- Access-event logging where the platform supports it.
- Backup and restore procedure for permitted data.
- Client-specific retention and deletion dates.
- Secure deletion procedure at closeout.
- Incident-response record for suspected loss, disclosure or unauthorized access.

## Data classification

1. **PUBLIC** — approved for public release.
2. **INTERNAL** — operating material not intended for publication.
3. **CONFIDENTIAL** — contractual or sensitive institutional material.
4. **RESTRICTED** — sensitive data requiring named access and explicit handling rules.

## Repository rule

Public repositories may contain disclosure-safe schemas and synthetic examples. They must not contain confidential client identity, restricted records, credentials, access tokens, invoices, contracts, private CRM notes or unapproved client conclusions.

## Incident rule

A suspected security incident is recorded with detection time, affected system/data class, containment action, access changes, notification decision, remediation and closure date. Evidence is preserved without copying restricted data into the public incident record.
