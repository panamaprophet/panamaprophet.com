import type { Release } from '@/entities/release';

export const releases: Release[] = [
    {
        title: 'Калейдоскоп синглов',
        description: `
            Небольшая компиляция синглов, как и всегда, знатно настоявшаяся в ожидании релиза.
            Смикшировал всё Вадим Рутикал, полирнул Вован, внутри — сюрпризы и веселье!
        `,
        media: {
            image: 'https://s3.eu-west-1.amazonaws.com/panamaprophet.com/cover-singles-galore.jpg',
        },
        tracks: [
            { title: 'Поджигай чалис', duration: '3:34', url: 'https://soundcloud.com/panamaprophet/cncelfrmio2e' },
            { title: 'Во времени', duration: '3:22', url: 'https://soundcloud.com/panamaprophet/in-time' },
            { title: 'Песня мой помощник', duration: '3:39', url: 'https://soundcloud.com/panamaprophet/i-shall-sing' },
            { title: 'Поставь версию (feat. Jah Lee)', duration: '2:52', url: 'https://soundcloud.com/panamaprophet/version' },
            { title: 'Rootical V — Поджигай даб', duration: '3:34', url: 'https://soundcloud.com/panamaprophet/chalice-dub' },
            { title: 'Rootical V — Даб времени', duration: '3:06', url: 'https://soundcloud.com/panamaprophet/in-dub' },
            { title: 'Rootical V — Даб мой помощник', duration: '3:12', url: 'https://soundcloud.com/panamaprophet/i-shall-dub' },
            { title: 'Rootical V — Поставь даб-версию', duration: '3:44', url: 'https://soundcloud.com/panamaprophet/dub-version' },
        ],
        links: {
            soundcloud: '//soundcloud.com/panamaprophet/sets/singles-galore',
        },
    },
    {
        title: 'LP',
        description: `
            Материал для этого альбома семь лет добирался до сети из Малаховки, по пути побывав и в Израиле, и в Лесном городке.
            Но, как известно, у хорошей песни нет срока давности, и потому вашему вниманию — прекрасно настоявшийся рутс!
        `,
        media: {
            image: 'https://s3.eu-west-1.amazonaws.com/panamaprophet.com/cover-lp.jpg',
        },
        tracks: [
            { title: 'Prophet P — Деньги', duration: '4:19', url: 'https://soundcloud.com/panamaprophet/pp-lp-money' },
            { title: 'Prophet P — Система', duration: '3:41', url: 'https://soundcloud.com/panamaprophet/pp-lp-system' },
            { title: 'Prophet P — Располагает лишь Бог', duration: '3:01', url: 'https://soundcloud.com/panamaprophet/pp-lp-god-dispose' },
            { title: 'Prophet P — Где же любовь', duration: '3:16', url: 'https://soundcloud.com/panamaprophet/pp-lp-where-is-love' },
            { title: 'Prophet P — Лишь бы ты оказалась здесь', duration: '3:01', url: 'https://soundcloud.com/panamaprophet/pp-lp-if-only-you-were-here' },
            { title: 'Prophet P — Бедность', duration: '3:46', url: 'https://soundcloud.com/panamaprophet/pp-lp-poverty' },
            { title: 'Lion Posse Band — Акцент на даб (General Culture Mix)', duration: '4:17', url: 'https://soundcloud.com/panamaprophet/pp-lp-general-culture-mix' },
            { title: 'Lion Posse Band — Даб устроен так (Rebelsteppa Mix)', duration: '3:51', url: 'https://soundcloud.com/panamaprophet/pp-lp-rebelsteppa-mix' },
            { title: 'Lion Posse Band — Располагает лишь даб (Fyah Temple Mix)', duration: '3:01', url: 'https://soundcloud.com/panamaprophet/pp-lp-fyah-temple-mix' },
            { title: 'Lion Posse Band — Где же даб (Praise Jah Mix)', duration: '3:13', url: 'https://soundcloud.com/panamaprophet/pp-lp-praise-jah-mix-1' },
            { title: 'Lion Posse Band — Даб оказался здесь (Big Roba Mix)', duration: '3:08', url: 'https://soundcloud.com/panamaprophet/pp-lp-big-roba-mix' },
            { title: 'Lion Posse Band — Даб не преступление (Praise Jah Mix)', duration: '3:46', url: 'https://soundcloud.com/panamaprophet/pp-lp-praise-jah-mix-2' },
        ],
        links: {
            spotify: '//open.spotify.com/album/0Bmufp4rh1C1JHmGGZ9gHl',
            apple: '//music.apple.com/pl/album/prophet-p-lion-posse-band/1541125229',
            'youtube-music': '//music.youtube.com/playlist?list=OLAK5uy_mgohOMI5DiaMjb0hczgr0MSytMooZObnY',
            soundcloud: '//soundcloud.com/panamaprophet/sets/pp-lp-lp',
        },
    },
    {
        title: 'В моём саду',
        description: `
            С некоторым опозданием, но с не меньшей актуальностью представляю пиратский гимн всех садоводов, растениеводов и сочувствующих.
            Ритм от песни «La La La Means I Love You», слова и исполнение - Prophet P. Оформление - домашнее
        `,
        media: {
            image: 'https://s3.eu-west-1.amazonaws.com/panamaprophet.com/cover-garden.jpg',
        },
        tracks: [
            { title: 'В моём саду', duration: '3:14', url: 'https://soundcloud.com/panamaprophet/in-my-garden' },
        ],
        links: {
            soundcloud: '//soundcloud.com/panamaprophet/in-my-garden',
        },
    },
    {
        title: 'Обитатели джунглей',
        description: `
            На этот раз речь пойдёт о человечности и животных инстинктах: своей новой песней призываю в любой ситуации оставаться людьми!
            Ритм, слова и песня - мои, на гитаре и за микшерным пультом - Ребелстеппа, на бэк-вокале - Алина. Оформление - Milky Way
        `,
        media: {
            image: 'https://s3.eu-west-1.amazonaws.com/panamaprophet.com/cover-jungle.jpg',
        },
        tracks: [
            { title: 'Обитатели джунглей', duration: '3:30', url: 'https://soundcloud.com/panamaprophet/jungle-citizens' },
            { title: 'Rebelsteppa - Даб из джунглей', duration: '3:34', url: 'https://soundcloud.com/panamaprophet/jungle-dub' },
        ],
        links: {
            spotify: '//open.spotify.com/album/4cH8mygKhqXOXAa9IAKlFp',
            apple: '//music.apple.com/pl/album/1414839882',
            soundcloud: '//soundcloud.com/panamaprophet/sets/jungle-citizens',
        },
    },
    {
        title: 'Раста, Раста',
        description: `
            Свежая песня! Специальное послание всем, кто устал от слухов и подстрекательства: не дай давлению размять тебя!
            Песня написана, записана и спродюссирована Профетом, на гитаре - Ребелстеппа, на бэк-вокале - Алина, сведением занимался Малей. Оформление - товарищ MilkyWay.
        `,
        media: {
            image: 'https://s3.eu-west-1.amazonaws.com/panamaprophet.com/cover-rasta.jpg',
        },
        tracks: [
            { title: 'Раста, раста', duration: '3:49', url: 'https://soundcloud.com/panamaprophet/rasta-rasta' },
        ],
        links: {
            spotify: '//open.spotify.com/album/2zoEbWmnc20h7EZZjocPWx',
            apple: '//music.apple.com/pl/album/1413554804',
            soundcloud: '//soundcloud.com/panamaprophet/rasta-rasta',
        },
    },
    {
        title: 'P',
        description: `
            Рад представить вам мой новый альбом «P», в работе над которым я выступил не только в роли исполнителя, но и продюсера, весело орудуя клавишами, семплами, изолентой и клеем с ножницами.
            Записывать и сводить материал помогали мои старые друзья - такие ребята, как Rebelsteppa, Tenor Youthman, Fayah Temple, General Culture, Дима Шишкин, Аина и Алина, а обложку, как я уже говорил ранее, нарисовал Лёха Бархан.
        `,
        media: {
            image: 'https://s3.eu-west-1.amazonaws.com/panamaprophet.com/cover.jpg',
        },
        tracks: [
            { title: 'Благословлен', duration: '2:42', url: 'https://soundcloud.com/panamaprophet/blessed' },
            { title: 'Революция в сознании', duration: '3:29', url: 'https://soundcloud.com/panamaprophet/mental-revolution' },
            { title: 'Пусть завтра', duration: '2:53', url: 'https://soundcloud.com/panamaprophet/prophet-p-pust-zavtra' },
            { title: 'Когда вернешься ты домой?', duration: '3:13', url: 'https://soundcloud.com/panamaprophet/when-will-you-come-home' },
            { title: 'Мне нравится любить тебя', duration: '2:47', url: 'https://soundcloud.com/panamaprophet/love-to-love-you' },
            { title: 'Давно зовет тебя растафари', duration: '2:34', url: 'https://soundcloud.com/panamaprophet/so-long-rastafari-call-you' },
            { title: 'Жизнь это любовь', duration: '3:29', url: 'https://soundcloud.com/panamaprophet/life-equals-love' },
            { title: 'Лучше скручивать', duration: '3:38', url: 'https://soundcloud.com/panamaprophet/roll-up' },
        ],
        links: {
            spotify: '//open.spotify.com/album/0UjRV84pwTuEjE7MKbZOW9',
            apple: '//music.apple.com/pl/album/p/1178199096',
            'youtube-music': '//music.youtube.com/playlist?list=OLAK5uy_l4MgAs2h67IpWatoxk7y9q8Mg_f1ehS8c',
            soundcloud: '//soundcloud.com/panamaprophet/sets/p-lp',
        },
    },
    {
        title: 'Нравится любить тебя!',
        description: `
            Сняли с Алиной видео на песню «Мне нравится любитиь тебя» при помощи мобильного телефона и изрядной доли терпения.
            Оригинальный материал был утерян, превратившись в гифки, этот клип переснят за пятнадцать минут.
        `,
        media: {
            video: '//www.youtube.com/embed/rGfBQQomMf0?showinfo=0',
        },
    },
];
