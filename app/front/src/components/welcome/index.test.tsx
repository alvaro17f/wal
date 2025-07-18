import { render, screen } from '@testing-library/react';
import { Welcome } from './index';
import { useIcons } from '@/hooks/useIcons';
import { beforeEach, describe, expect, test, vi, type Mock } from 'vitest';

vi.mock('@/hooks/useIcons');

describe('<Welcome />', () => {
	beforeEach(() => {
		(useIcons as Mock).mockReturnValue({ Settings: 'settings.png' });
	});

	test('renders Welcome component correctly', () => {
		render(<Welcome />);
		expect(screen.getByText('Welcome to WAL')).toBeDefined();
		expect(
			screen.getByText('It seems to be your first time here.')
		).toBeDefined();
		expect(screen.getByRole('img', { name: /wal/i })).toBeDefined();
	});
});
