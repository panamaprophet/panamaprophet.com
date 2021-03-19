import Section from '../components/Section';
import Header from '../components/Header';
import Meta from '../components/Meta';
import Footer from '../components/Footer';

import styles from '../styles/Home.module.css'

/**
 * @TODO:
 * - switch to webp
 */


const sections = [
    {
        image: '/images/cover-garden.jpg',
        title: 'В моём саду',
        description: [
            'С некоторым опозданием, но с не меньшей актуальностью представляю пиратский гимн всех садоводов, растениеводов и сочувствующих.',
            'Ритм от песни «La La La Means I Love You», слова и исполнение - Prophet P. Оформление - домашнее',
        ],
        player: {
            url: '//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/424083687',
            height: 166,
            color: '113322',
        },
    },
    {
        image: '/images/cover-jungle.jpg',
        title: 'Обитатели джунглей',
        description: [
            'На этот раз речь пойдёт о человечности и животных инстинктах: своей новой песней призываю в любой ситуации оставаться людьми!',
            'Ритм, слова и песня - мои, на гитаре и за микшерным пультом - Ребелстеппа, на бэк-вокале - Алина. Оформление - Milky Way',
        ],
        player: {
            url: '//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/379197794',
            height: 284,
            color: 'bd2929',
        },
    },
    {
        image: '/images/cover-rasta.jpg',
        title: 'Раста, Раста',
        description: [
            'Свежая песня! Специальное послание всем, кто устал от слухов и подстрекательства: не дай давлению размять тебя!',
            'Песня написана, записана и спродюссирована Профетом, на гитаре - Ребелстеппа, на бэк-вокале - Алина, сведением занимался Малей. Оформление - товарищ MilkyWay.',
        ],
        player: {
            url: '//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/339815677',
            color: 'bd2929',
            height: 166,
        },
    },
    {
        image: '/images/cover.jpg',
        title: 'P',
        description: [
            'Рад представить вам мой новый альбом «P», в ра;бо;те над которым я выступил не только в роли ис;пол;ни;теля, но и продюсера, весело орудуя кла;ви;ша;ми, семплами, изолентой и клеем с ножницами.',
            'Записывать и сводить материал помогали мои ста;рые друзья - такие ребята, как Rebelsteppa, Tenor Youthman, Fayah Temple, General Culture, Дима Шиш;кин, Аина и Алина, а обложку, как я уже говорил ра;нее, нарисовал Лёха Бархан.',
        ],
        player: {
            url: '//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/277798237',
            color: 'ff5500',
            height: 528,
        },
    },
    {
        title: 'Мне нравится любить тебя!',
        description: [
            'Сняли с Алиной видео на песню «Мне нравится любитиь тебя» при помощи мобильного телефона и изрядной доли терпения',
            '//www.youtube.com/embed/rGfBQQomMf0?showinfo=0&amp;autoplay=1',
        ],
    },
];


export default function Home() {
    return (
        <div className={styles.root}>
            <Meta />
            <Header />

            {sections && sections.map((section, index) => (<Section
                key={index}
                title={section.title}
                image={section.image}
                player={section.player}
                description={section.description}
            />))}

            <Footer />
        </div>
    )
};