export type InternshipStatus = string;

export default interface InternshipCardProps {
  id: number;
  position: string;
  company: string;
  location: string;
  duration: string;
  skills: string[];
  description: string;
  imageUrl?: string;
  showApplyButton?: boolean;
  clickable?: boolean;
  status?: InternshipStatus;
  linkTo?: string;
  actionLabel?: string;
  secondaryActionLabel?: string;
  secondaryLinkTo?: string;
}
