---
term: "Sequence data files (FASTQ, BAM, VCF)"
short: "The standard file formats produced at successive stages of DNA sequencing analysis: raw reads (FASTQ), reads aligned to a reference (BAM or CRAM), and a list of variants (VCF)."
category: "Genetics and biomedical research"
aliases: ["FASTQ", "BAM file", "CRAM file", "VCF file", "Variant call format", "Raw sequencing data"]
related: ["variant-calling", "reference-genome", "whole-genome-sequencing", "dna-sequencing", "genetic-database", "re-identification-risk"]
---

Sequencing data passes through several standard formats. A FASTQ file holds the raw reads produced
by the machine, each with a quality score for every base. After alignment to a reference genome,
the reads are stored in a BAM file or its compressed cousin, CRAM, which records where each read
falls. A VCF file, short for variant call format, lists the positions where the sample differs from
the reference, with genotypes and quality measures.

The files differ greatly in size and in what they allow. A whole-genome FASTQ or BAM can be very
large and lets an analyst re-run the analysis with different software. A VCF is far smaller but
reflects choices already made. A summary report from a laboratory or consumer service may be smaller
still. When someone says they have a person's "genome," it matters which of these they hold.

All of these files are identifying. A genome sequence is unique to a person, apart from identical
twins, and can reveal information about relatives. Removing the name from a file does not make it
anonymous, which is why genomic data is usually shared under controlled access and data use
agreements.
