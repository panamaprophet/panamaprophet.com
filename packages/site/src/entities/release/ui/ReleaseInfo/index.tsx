import { Column } from '@/shared/ui/Layout';
import { Links } from '@/shared/ui/Links';
import { Description, Title } from '../Text';
import type { Release } from '../../model';

export const ReleaseInfo = ({ release }: { release: Release }) => (
    <Column style={{ justifyContent: 'center' }}>
        <Title text={release.title} />
        <Description text={release.description} />
        <Links urls={release.links ?? {}} />
    </Column>
);
