export type Grade = 'A1' | 'A2' | 'B1' | 'B2';

export const grades: Record<Grade, { label: string; definition: string }> = {
  A1: {
    label: 'Primary official record',
    definition:
      'An official document speaking for itself: an institutional report, a court filing, a government release, a statute, or hearing minutes.',
  },
  A2: {
    label: 'Reporting that tracks the record',
    definition:
      'Reporting by an established outlet that quotes or closely follows primary documents, or records an on-the-record statement.',
  },
  B1: {
    label: 'Secondary analysis',
    definition:
      'Books, scholarship, or analysis with clear sourcing and context. Used for background and calibration, not for new factual claims about individuals.',
  },
  B2: {
    label: 'Thin or unverified',
    definition:
      'A single uncorroborated account, a second-hand recollection, or material we could not check against a primary document. Always flagged in the text.',
  },
};

export type EvidenceState = 'intent' | 'activity' | 'verified' | 'none';

export const states: Record<EvidenceState, { label: string; definition: string }> = {
  intent: {
    label: 'Stated intent',
    definition: 'Something was proposed, pitched, or said. The record does not show that it happened.',
  },
  activity: {
    label: 'Documented activity',
    definition: 'A record shows that something was done: a payment, a visit, a shipment, an order.',
  },
  verified: {
    label: 'Verified implementation',
    definition: 'An official finding or an independent result confirms the activity and what it produced.',
  },
  none: {
    label: 'Nothing on record',
    definition: 'We found no public record of this. Absence of a record is not proof of absence.',
  },
};
