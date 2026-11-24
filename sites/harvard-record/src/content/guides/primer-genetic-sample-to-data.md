---
title: "How a genetic sample becomes data"
description: "The path from a vial of saliva or blood to a genetic data file: collection, consent, laboratory work, storage and sharing, who controls each step, and which records show what happened."
audience: "Everyone"
series: "Primers"
order: 130
---

A genetic sample starts as a physical object: a tube of saliva, a blood draw, a cheek swab, a small
piece of skin. It ends, usually, as one or more computer files describing parts of a person's
[genome](/glossary/genome/), the full set of their [DNA](/glossary/dna/). Between those points the
sample and its data pass through several hands, and different rules apply at each. This primer
follows that path in the United States and says who controls each step and what records it leaves.

## Three settings with different rules

The same laboratory techniques are used in three settings that are governed very differently.

- Clinical testing, ordered by a clinician to inform a person's care. The laboratory must meet
  federal [CLIA](/law/clia/) quality standards, and the results go into the medical record, which
  the [HIPAA Privacy Rule](/law/hipaa-privacy-rule/) covers when the provider is a [covered
  entity](/glossary/covered-entity/).
- Research, where samples are collected to answer a scientific question. The [Common
  Rule](/law/common-rule/) and an [institutional review
  board](/glossary/institutional-review-board/) usually govern consent and use. Results may not be
  returned to participants at all.
- [Direct-to-consumer genetic tests](/glossary/direct-to-consumer-genetic-test/), bought by
  individuals. These are governed mainly by the company's terms of service and privacy policy,
  consumer-protection law and, increasingly, [state genetic privacy
  laws](/law/state-genetic-privacy-laws/), which differ from state to state.

Knowing which setting applies tells you most of what you need to know about who may do what with the
result.

## Step one: consent and collection

Before collection, the person is asked to agree. In research, the [consent
form](/glossary/consent-form/) should say what will be done, how long the sample will be kept,
whether it may be used for future studies, whether data will be shared, and what happens if the
person withdraws. Some studies ask for broad consent to unspecified future research. A few ask
participants to agree to public release of their data, an approach called [open
consent](/glossary/open-consent/). In the consumer setting, agreement is usually given by accepting
terms online, sometimes with separate opt-ins for research use.

Collection itself is simple. A [saliva sample](/glossary/saliva-sample/) or cheek swab can be taken
at home. Blood requires a trained person. A [skin biopsy](/glossary/skin-biopsy/) is used when
researchers want living cells to grow, for example to create a [cell line](/glossary/cell-line/).

## Step two: labeling and custody

Each sample gets a label, usually a code rather than a name. In research, the key that links codes
to names is typically held separately, by the study team, so that the laboratory sees only codes.
This is coding, not anonymity: someone can still link the sample to the person. The record of who
held the sample and when is called [sample custody](/glossary/sample-custody/), or chain of custody.
In clinical and forensic work, custody is documented carefully. In research, practice varies.

## Step three: laboratory processing

At the laboratory, technicians extract DNA from the sample and check its quantity and quality. Then
they read it, using one of several methods.

- A [genotyping array](/glossary/genotyping-array/) checks a preselected set of known positions,
  often hundreds of thousands of [SNPs](/glossary/snp/). It is cheap and is the usual method for
  consumer ancestry tests.
- [Exome sequencing](/glossary/exome-sequencing/) reads the protein-coding parts of genes.
- [Whole-genome sequencing](/glossary/whole-genome-sequencing/) reads nearly all of the genome.

How many times each position is read is called [sequencing depth](/glossary/sequencing-depth/).
Depth, quality checks and laboratory accreditation all affect how much the result can be trusted.
The distinction between [clinical-grade and research-grade
sequencing](/glossary/clinical-grade-vs-research-grade-sequencing/) matters here: a research result
has not necessarily been validated for medical decisions.

## Step four: from raw reads to findings

Sequencing produces raw data: very large files of short DNA fragments with quality scores.
[Bioinformatics](/glossary/bioinformatics/) software aligns those fragments to a reference genome
and identifies where the person's DNA differs from it. Each difference is a [genetic
variant](/glossary/genetic-variant/). The usual output is a file listing variants. Interpreting a
variant, deciding whether it is harmless or linked to a condition, is a further step that depends on
current scientific knowledge and can change over time. Scores built from many variants, such as a
[polygenic score](/glossary/polygenic-score/), are statistical estimates, not diagnoses.

## Step five: storage

Two things are stored, and they may be stored in different places for different periods.

- The physical sample or extracted DNA, often frozen. A collection of stored samples with associated
  information is a [biobank](/glossary/biobank/). Cells may be kept alive indefinitely through
  [cryopreservation](/glossary/cryopreservation/) or made into an [immortalized cell
  line](/glossary/immortalized-cell-line/).
- The data files, on institutional or company servers or in cloud storage.

A consent form or privacy policy should say how long each is kept. In practice retention is often
long or open-ended.

## Step six: sharing

Genetic data are valuable mainly in large numbers, so sharing is common.

- Controlled-access repositories. Many federally funded studies deposit data in repositories where
  outside researchers must apply, describe their project and sign a data use agreement. A data
  access committee decides. The National Institutes of Health has a genomic data sharing policy that
  sets expectations for studies it funds; check the current version.
- Material transfer. Physical samples or cell lines sent to another institution usually travel under
  a [material transfer agreement](/glossary/material-transfer-agreement/), a contract that limits
  how they may be used.
- Open release. Some projects publish data openly with participants' agreement.
- Commercial sharing. Consumer companies may share data with research partners or others as their
  terms allow, often with an opt-in.

Removing names does not make genetic data anonymous. Apart from identical twins, each genome is
unique, and relatives share parts of it. [Re-identification risk](/glossary/re-identification-risk/)
and the limits of [de-identification](/glossary/de-identification/) are well documented. Withdrawal
usually stops future use, but data already shared or analyzed generally cannot be recalled.

## Who controls each step

- Consent: the participant or customer, within the options offered; the IRB or company decides what
  options exist.
- Collection and coding: the study team or company.
- Laboratory work: the laboratory, under its contract and any CLIA requirements.
- Analysis: the researchers or company analysts.
- Storage: the institution, biobank or company, under its retention policy.
- Sharing: the institution or company, subject to the consent, data access committees and
  agreements.

Legal protections are partial. [GINA](/law/gina-title-i/) limits the use of genetic information by
health insurers and, under a separate title, [by employers](/law/gina-title-ii/), but does not cover
life, disability or long-term-care insurance. [Certificates of
confidentiality](/law/certificates-of-confidentiality/) protect some research data from compelled
disclosure.

## A worked hypothetical

A volunteer joins a university study of a common trait. She signs a consent form that allows storage
of her saliva for future research and deposit of her coded data in a controlled-access repository.
The study team labels the tube with a code. A contract laboratory runs a genotyping array and
returns a data file keyed to the code. A postdoctoral researcher analyzes the file with others. Two
years later the coded data are deposited in the repository, and an outside team is approved to use
them. The volunteer later withdraws. The university destroys her remaining saliva and stops
including her data in new analyses, but the copy already used by the outside team, and published
aggregate results, remain.

## What the documents look like

- Consent form or terms of service. Held by the participant and the institution or company. Consumer
  terms are public. Research consent templates are sometimes public; signed forms are not.
- Sample requisition and custody logs. Internal laboratory and study records. Not public.
- Laboratory reports and quality metrics. Internal, returned to the study team or clinician.
  Clinical reports go in the medical record.
- Data files. Held by the laboratory, researchers or company. Not public unless deposited openly.
- Repository records. Study descriptions are often public. Some controlled-access repositories
  publish lists of approved data requests and their stated purposes.
- Material transfer and data use agreements. Contracts between institutions. Not usually public; a
  public institution's copies may be reachable by state records law.
- Publications. Public. They describe methods and often state where data are deposited.

## Questions worth asking

- Was the sample collected for care, research or a consumer product, and which rules followed from
  that?
- What did the person agree to about storage, future use and sharing, and in what words?
- Who holds the key linking codes to names?
- Was the laboratory certified for clinical work, and was the result confirmed?
- Where are the sample and the data now, and under what agreements were copies sent elsewhere?
- What happens to samples, data and shared copies if the person withdraws?

The site's [DNA and genetics](/dna-genetics/) section applies these questions to its own records,
and [how human-subjects research is approved and
overseen](/guides/primer-human-subjects-research-oversight/) explains the review that sits above the
research setting.
