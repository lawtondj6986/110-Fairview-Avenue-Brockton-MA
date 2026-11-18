---
term: "Entity resolution"
category: intel
short: "Determining whether records under different names, spellings, or addresses refer to the same person or company."
related: ["false-positive", "beneficial-ownership", "corporate-registry", "assessor-database"]
faqs:
  - q: "How does ICS avoid matching the wrong person?"
    a: "By requiring more than a name. A match needs at least two independent attributes from public records: a shared address, a registered agent, a manager listed on filings, a signature on a deed, a matching date of formation. Common names with a single matching attribute are reported as unresolved, not as findings."
  - q: "Why do companies end up with so many similar names?"
    a: "Usually for ordinary reasons: one LLC per property for liability, a trust for estate planning, a management company separate from the owner. Sometimes to make the footprint harder to follow. Entity resolution does not assume either. It shows the structure from public filings and lets the client draw conclusions."
---

## What it means

Entity resolution is the work of deciding that "Fairview Holdings LLC," "Fairview Holding, LLC," and "FVH Realty Trust" at the same Brockton mailing address are one operation, and that two John Sullivans in Quincy are not. It uses matching attributes across public records: addresses, registered agents, managers, filing dates, signatures. Done poorly, it produces both false matches and missed ones.

## Why it matters in a dossier

Almost every finding in a dossier depends on getting the identity right first. Attaching a Taunton judgment to the wrong Sullivan is the most damaging error a researcher can make. ICS resolves business entities and public-role principals through registries, deeds, and filings only, states the matching evidence, never uses private data to do it, and never guesses on a common name.

## In practice

A buyer wants every parcel controlled by a Weymouth seller. The Secretary of the Commonwealth shows 9 entities sharing the seller's manager or registered agent. The Registry grantee index ties 7 of them to 14 parcels. Two entities match on name only and are set aside as unresolved. The brief maps 14 parcels, roughly $21 million assessed, with the 2 open questions marked.
