---
term: "Reference genome"
short: "A standard, assembled DNA sequence for a species that researchers use as a common coordinate system for aligning reads and describing where variants lie."
category: "Genetics and biomedical research"
aliases: ["Reference assembly", "GRCh37", "GRCh38", "hg19", "hg38", "Genome build"]
related: ["variant-calling", "sequence-data-files", "genome", "whole-genome-sequencing", "genetic-variant"]
---

A reference genome is a representative sequence, not the genome of any one typical person. For
humans, the widely used references are maintained by an international consortium and released as
numbered builds. GRCh37, also called hg19, and GRCh38, also called hg38, are the two most common in
current use. A complete telomere-to-telomere human sequence, filling gaps left in earlier builds,
was published in 2022 and is increasingly used in research.

Positions in the genome are given relative to a build, so the same variant has different
coordinates in GRCh37 and GRCh38. Reports, VCF files and database entries should state which build
they use, and converting between builds is a routine but error-prone step. A difference from the
reference is called a variant even when it is the more common version in the population, because
the reference simply records one sequence at each position.

A reference genome is a tool, not a norm. Being different from it does not mean being abnormal, and
early references were built mostly from a small number of donors, which can make analysis less
accurate for some ancestries. Newer pangenome references aim to capture more human diversity.
