import { useEffect } from 'react';
import { playback } from '@/features/playback';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ReleaseSection } from '@/widgets/release';
import { releases } from './model';

const PageId = 'home';

const tracks = releases.flatMap(release => release.tracks ?? []);

export const Page = () => {
    useEffect(() => playback.setQueue(tracks), []);

    return (
        <>
            <Header scrollTarget={PageId} />

            <main id={PageId}>
                {releases.map((release, index) => (
                    <ReleaseSection
                        key={release.title}
                        release={release}
                        reverse={index % 2 === 1}
                    />
                ))}
            </main>

            <Footer />
        </>
    );
};
