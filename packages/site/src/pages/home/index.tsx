import { useEffect } from 'react';
import { usePlayback } from '@/features/playback';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ReleaseSection } from '@/widgets/release';
import { releases } from './model';

const PageId = 'home';

const tracks = releases.flatMap(release => release.tracks ?? []);

export const Page = () => {
    const { setQueue } = usePlayback();

    useEffect(() => setQueue(tracks), [setQueue]);

    return (
        <>
            <Header scrollTarget={PageId} />

            <main id={PageId}>
                {releases.map(release => <ReleaseSection key={release.title} release={release} />)}
            </main>

            <Footer />
        </>
    );
};
