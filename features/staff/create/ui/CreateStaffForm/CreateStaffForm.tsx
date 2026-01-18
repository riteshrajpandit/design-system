'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { STAFF_FORM_CONFIG } from '../../model/form.schema';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';

export const CreateStaffForm: React.FC = () => {
  const router = useRouter();
  console.log('Rendering CreateStaffForm with config:', STAFF_FORM_CONFIG);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    STAFF_FORM_CONFIG.forEach((field) => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Submitted Staff Data:', formData);
      alert('Staff member created successfully!'); // Simple feedback
      
      router.push('/dashboard');
    } catch (err) {
      console.error('Failed to create staff:', err);
      // In a real app, handle global form error here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white p-6 shadow-sm rounded-lg border border-gray-100">
      {STAFF_FORM_CONFIG.map((field) => (
        <Input
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name] || ''}
          onChange={handleChange}
          error={errors[field.name]}
          disabled={isLoading}
        />
      ))}
      
      <div className="pt-4">
        <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
        >
            Create Staff Member
        </Button>
      </div>
    </form>
  );
};
