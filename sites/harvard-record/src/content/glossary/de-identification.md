---
term: "De-identification"
short: "The removal or masking of information that identifies individuals in a dataset so the data can be used or shared with lower privacy risk."
category: "Genetics and biomedical research"
aliases: ["anonymization", "coding", "pseudonymization"]
related: ["re-identification-risk", "genetic-database", "biobank", "redaction"]
links:
  - label: "45 CFR 164.514 (HIPAA de-identification standard)"
    url: "https://www.ecfr.gov/current/title-45/section-164.514"
---

De-identification is the process of removing or obscuring details that connect data to specific
people. In the United States the best-known standard comes from the HIPAA Privacy Rule, which
governs health information held by health care providers, insurers and their contractors. It
recognizes two methods: removal of a specified list of identifiers, such as names, detailed dates
and addresses (the "safe harbor" method), or a formal determination by a qualified expert that the
risk of identification is very small.

Related terms are used inconsistently. Coded or pseudonymized data have had direct identifiers
replaced by a code, with a key kept separately that allows re-linking. Anonymized data are meant to
have no such key. Whether research with coded data counts as research with human subjects can depend
on whether the researchers have access to the key.

De-identified does not mean impossible to identify. It means that defined steps were taken to reduce
the risk. Genetic data are a hard case, because a genome is unique to a person and is partly shared
with relatives, so removing the name does not remove its identifying power. This is why many genetic
datasets are shared under access controls and not posted openly.
