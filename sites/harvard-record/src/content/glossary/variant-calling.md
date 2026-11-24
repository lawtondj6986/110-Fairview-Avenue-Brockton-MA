---
term: "Variant calling"
short: "The computational step in DNA sequencing analysis that compares a sample's reads with a reference genome and decides where, and how confidently, the sample differs."
category: "Genetics and biomedical research"
aliases: ["Variant caller", "Variant call", "Genotype calling", "Call quality"]
related: ["reference-genome", "sequence-data-files", "sequencing-depth", "genetic-variant", "bioinformatics", "clinical-grade-vs-research-grade-sequencing"]
---

Sequencing machines produce millions of short reads, each a fragment of DNA sequence. Software first
aligns the reads to a reference genome. A variant caller then examines each position and decides
whether the sample differs from the reference there, whether it carries the difference on one copy
of the chromosome or both, and how confident the call is. The output is usually a VCF file listing
the variants with quality scores.

Calls depend on choices: which reference genome, which software and version, what quality thresholds
and what depth of coverage. Different pipelines run on the same raw data can produce somewhat
different lists, especially in repetitive regions, for large structural changes and for variants
present in only some cells. Clinical laboratories validate their pipelines and often confirm
important findings by a second method; research pipelines vary more.

A variant call is not an interpretation. Deciding whether a called variant matters for health is a
separate step, called classification, done by comparing it with databases and published evidence.
A list of variants from a sequencing file therefore tells a reader where a genome differs, not what
the differences mean.
