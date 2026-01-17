import React from 'react';
import { render, screen } from '@testing-library/react';
import { BaseLayout } from './BaseLayout';

describe('BaseLayout Component', () => {
  it('renders children content', () => {
    render(
      <BaseLayout>
        <div>Main Content Area</div>
      </BaseLayout>
    );
    expect(screen.getByText('Main Content Area')).toBeInTheDocument();
  });

  it('renders custom header', () => {
    render(
      <BaseLayout headerSlot={<nav>Custom Nav</nav>}>
        <main>Content</main>
      </BaseLayout>
    );
    expect(screen.getByText('Custom Nav')).toBeInTheDocument();
  });

  it('renders custom footer', () => {
    render(
      <BaseLayout footerSlot={<footer>Custom Footer</footer>}>
        <main>Content</main>
      </BaseLayout>
    );
    expect(screen.getByText('Custom Footer')).toBeInTheDocument();
  });

  it('renders render default slots when not provided', () => {
    render(
      <BaseLayout>
        <main>Content</main>
      </BaseLayout>
    );
    expect(screen.getByText('App Logo')).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });
});
