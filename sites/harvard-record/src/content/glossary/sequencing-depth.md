---
term: "Sequencing depth"
short: "The average number of times each position in the DNA is read during sequencing; more reads give more confidence in the result."
category: "Genetics and biomedical research"
aliases: ["coverage", "read depth", "depth of coverage"]
related: ["whole-genome-sequencing", "exome-sequencing", "clinical-grade-vs-research-grade-sequencing", "dna-sequencing"]
---

Sequencing depth is the number of times a given position in the DNA is read. Sequencing machines
read many overlapping fragments, and each position ends up covered by a stack of reads. Depth is
usually reported as an average with an "x" suffix. A figure of 30x, a common benchmark for a human
whole genome from short reads, means each position was read about thirty times on average.

Depth matters because individual reads contain errors and because people carry two copies of most of
their DNA. Several independent reads are needed to tell a real variant from a machine error, and to
see both copies where they differ. Low-depth sequencing is cheaper and is useful for some research
purposes, but it yields less certain results for any one person.

The related word coverage is used in two ways. Sometimes it is a synonym for depth. Sometimes it
means breadth, the share of the target region that was read at least a minimum number of times. An
average hides unevenness: a genome sequenced at a high average depth can still have regions with few
or no reads. Both depth and breadth are needed to judge how complete a sequence is.
