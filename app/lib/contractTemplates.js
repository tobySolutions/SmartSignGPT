export const CONTRACT_TYPES = {
  Employment: {
    name: 'Employment Contract',
    templates: {
      standard: {
        name: 'Standard Employment',
        sections: [
          'Job Description and Duties',
          'Compensation and Benefits',
          'Work Hours and Location',
          'Term and Termination',
          'Confidentiality',
          'Non-Compete'
        ]
      },
      detailed: {
        name: 'Detailed Employment',
        sections: [
          'Definitions',
          'Position and Duties',
          'Term of Employment',
          'Compensation Structure',
          'Benefits Package',
          'Work Schedule',
          'Location and Remote Work',
          'Performance Reviews',
          'Intellectual Property',
          'Confidentiality',
          'Non-Competition',
          'Non-Solicitation',
          'Termination Conditions',
          'Severance Terms',
          'Dispute Resolution'
        ]
      },
      simple: {
        name: 'Simple Employment',
        sections: [
          'Role and Responsibilities',
          'Compensation',
          'Duration',
          'Termination'
        ]
      }
    }
  },
  Service: {
    name: 'Service Agreement',
    templates: {
      standard: {
        name: 'Standard Service',
        sections: [
          'Scope of Services',
          'Payment Terms',
          'Timeline',
          'Deliverables',
          'Termination'
        ]
      },
      detailed: {
        name: 'Detailed Service',
        sections: [
          'Definitions',
          'Scope of Services',
          'Service Level Requirements',
          'Payment Structure',
          'Timeline and Milestones',
          'Deliverables',
          'Quality Standards',
          'Change Management',
          'Communication Protocol',
          'Intellectual Property Rights',
          'Confidentiality',
          'Liability and Indemnification',
          'Termination Conditions',
          'Dispute Resolution'
        ]
      },
      simple: {
        name: 'Simple Service',
        sections: [
          'Services',
          'Payment',
          'Timeline',
          'Terms'
        ]
      }
    }
  },
  NDA: {
    name: 'Non-Disclosure Agreement',
    templates: {
      standard: {
        name: 'Standard NDA',
        sections: [
          'Confidential Information',
          'Use Restrictions',
          'Term and Termination',
          'Return of Information'
        ]
      },
      detailed: {
        name: 'Detailed NDA',
        sections: [
          'Definitions',
          'Scope of Confidential Information',
          'Permitted Disclosures',
          'Security Measures',
          'Information Handling',
          'Term of Confidentiality',
          'Return or Destruction',
          'Breach and Remedies',
          'Exceptions',
          'Survival Terms'
        ]
      },
      simple: {
        name: 'Simple NDA',
        sections: [
          'Confidentiality',
          'Usage',
          'Duration'
        ]
      }
    }
  },
  Sales: {
    name: 'Sales Contract',
    templates: {
      standard: {
        name: 'Standard Sales',
        sections: [
          'Product Details',
          'Price and Payment',
          'Delivery Terms',
          'Warranty',
          'Return Policy'
        ]
      },
      detailed: {
        name: 'Detailed Sales',
        sections: [
          'Definitions',
          'Product Specifications',
          'Pricing Structure',
          'Payment Terms',
          'Delivery Schedule',
          'Quality Standards',
          'Inspection Rights',
          'Warranty Terms',
          'Return and Refund Policy',
          'Risk Transfer',
          'Insurance Requirements',
          'Force Majeure',
          'Dispute Resolution'
        ]
      },
      simple: {
        name: 'Simple Sales',
        sections: [
          'Product',
          'Price',
          'Delivery',
          'Terms'
        ]
      }
    }
  }
};
