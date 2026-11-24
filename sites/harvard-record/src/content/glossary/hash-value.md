---
term: "Hash value"
short: "A short string of characters computed from a file's exact contents, used like a fingerprint to show whether two copies are identical or whether a file has changed."
category: "Records and sourcing"
aliases: ["Hash", "Checksum", "SHA-256", "MD5", "Digital fingerprint", "Hashing"]
related: ["provenance", "sample-custody", "duplicate-and-thread", "document-forensics", "metadata", "document-release"]
---

A hash function takes any file and produces a fixed-length value, the hash, written as a string of
letters and numbers. The same file always produces the same hash. Changing even one character in
the file produces a completely different hash. Common functions include SHA-256 and the older MD5
and SHA-1, which are still used to detect duplicates but are no longer considered secure against
deliberate tampering.

Hashes have several uses in records work. Archivists and forensic examiners record a file's hash
when they collect it, so they can later show that it has not changed, which is part of a chain of
custody. Lawyers use hashes to remove exact duplicates from large document collections. Researchers
publishing a dataset or a document release can list hashes so that others can check that their copy
matches.

A matching hash shows that two files are identical in content. It says nothing about whether the
file is authentic, who made it or whether its contents are true. Two copies of the same document can
have different hashes if one was re-saved, printed and scanned, or had its metadata changed, so a
mismatch is not by itself evidence of alteration of the substance.
