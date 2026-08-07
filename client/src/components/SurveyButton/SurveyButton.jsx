import Button from '../Button/Button.jsx';

// Replace with the real Google Form URL — kept as an env var so it can be
// swapped without a redeploy of code.
const SURVEY_URL = import.meta.env.VITE_SURVEY_URL || 'https://forms.gle/REPLACE_WITH_REAL_FORM_ID';

export default function SurveyButton({ label = 'Customer Survey', variant = 'outline' }) {
  return (
    <Button as="a" href={SURVEY_URL} target="_blank" variant={variant}>
      {label}
    </Button>
  );
}
