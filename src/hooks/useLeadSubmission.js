import { useRef, useState } from 'react';
import { submitFormData } from '../services/formService';
import { goToThankYouPage } from '../utils/leadVisit';

export function useLeadSubmission() {
  const locked = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const submitLead = async (data) => {
    if (locked.current) return;
    locked.current = true;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      if (await submitFormData(data)) goToThankYouPage();
    } catch {
      setSubmitError('We could not complete your enquiry. Please try again.');
      locked.current = false;
      setIsSubmitting(false);
    }
  };

  return { submitLead, isSubmitting, submitError };
}
