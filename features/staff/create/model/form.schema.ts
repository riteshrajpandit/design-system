export type FieldType = 'text' | 'email' | 'password' | 'select';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[]; // For select inputs
}

export const STAFF_FORM_CONFIG: FieldConfig[] = [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    required: true,
    placeholder: 'e.g. John Doe',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'e.g. john.doe@company.com',
  },
  {
    name: 'role',
    label: 'Role',
    type: 'text', // Keeping as text for now as per requirement, but could be 'select' later
    required: true,
    placeholder: 'e.g. staff',
  },
];
