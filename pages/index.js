import Section from '../components/Section';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from '../styles/Home.module.css'

/**
 * @TODO:
 * - switch to webp
 */

export default function Home() {
	return (
		<div className={styles.container}>
        <Header/>

        <main className={styles.main}>
            <Logo />

            {/* style="max-width: 940px; width: 100%; height: 166px;" */}
            <Section
                image="/images/cover-garden.png"
                title="В моём саду"
                playerUrl="//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/424083687"
            >
                <p>С некоторым опозданием, но с не меньшей актуальностью представляю пиратский гимн всех садоводов, растениеводов и сочувствующих.</p>
                <p>Ритм от песни «La La La Means I Love You», слова и исполнение - Prophet P. Оформление - домашнее</p>
            </Section>


            {/* style="max-width: 940px; width: 100%; height: 284px;" */}
            {/* "&amp;show_user=false&amp;color=bd2929&amp;auto_play=false&amp;hide_related=true&amp;show_comments=true&amp;show_reposts=false&show_artwork=false" */}
            <Section
                image="/images/cover-jungle.jpg"
                title="Обитатели джунглей"
                playerUrl="//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/379197794"
            >
                <p>На этот раз речь пойдёт о человечности и животных инстинктах: своей новой песней призываю в любой ситуации оставаться людьми!</p>
                <p>Ритм, слова и песня - мои, на гитаре и за микшерным пультом - Ребелстеппа, на бэк-вокале - Алина. Оформление - Milky Way</p>
            </Section>


            {/* style="max-width: 940px; width: 100%; height: 166px;" */}
            {/* &amp;color=bd2929&amp;auto_play=false&amp;hide_related=true&amp;show_comments=true&amp;show_user=false&amp;show_reposts=false&amp;show_artwork=false */}
            <Section
                image="/images/cover-rasta.jpg"
                title="Раста, Раста"
                playerUrl="//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/339815677"
            >
                <p>Свежая песня! Специальное послание всем, кто устал от слухов и подстрекательства: не дай давлению размять тебя!</p>
                <p>Песня написана, записана и спродюссирована Профетом, на гитаре - Ребелстеппа, на бэк-вокале - Алина, сведением занимался Малей. Оформление - товарищ MilkyWay.</p>
            </Section>


            {/* style="max-width: 940px; width: 100%; height: 468px;" */}
            {/* &amp;color=ff5500&amp;auto_play=false&amp;hide_related=true&amp;show_comments=true&amp;show_user=false&amp;show_reposts=false&amp;show_artwork=false */}
            <Section
                image="/images/cover.jpg"
                title="P"
                playerUrl="//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/277798237"
            >
                <p>Рад представить вам мой новый альбом «P», в ра&shy;бо&shy;те над которым я выступил не только в роли ис&shy;пол&shy;ни&shy;теля, но и продюсера, весело орудуя кла&shy;ви&shy;ша&shy;ми, семплами, изолентой и клеем с ножницами.</p>
                <p>Записывать и сводить материал помогали мои ста&shy;рые друзья - такие ребята, как Rebelsteppa, Tenor Youthman, Fayah Temple, General Culture, Дима Шиш&shy;кин, Аина и Алина, а обложку, как я уже говорил ра&shy;нее, нарисовал Лёха Бархан.</p>
            </Section>


            {/* video section */}
            <Section
                title="Мне нравится любить тебя"
            >
                <p>Сняли с Алиной видео на песню «Мне нравится любитиь тебя» при помощи мобильного телефона и изрядной доли терпения</p>
                <p>//www.youtube.com/embed/rGfBQQomMf0?showinfo=0&amp;autoplay=1</p>
            </Section>
        </main>

        <Footer />
		</div>
	)
};