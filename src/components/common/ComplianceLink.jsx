import { FileText, ArrowUpRight } from 'lucide-react';
import './ComplianceLink.css';

export function ComplianceLink() {
  return (
    <div className="sa-compliance-wrap">
      <a
        className="sa-compliance-link"
        href="https://drive.google.com/file/d/1MCL02CjIcO6mZK2H0y17lQFm_bGNBX3-/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Click to view Compliance Reports (opens in a new tab)"
      >
        <FileText size={14} aria-hidden="true" />
        <span>Click to view Compliance Reports</span>
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </div>
  );
}
