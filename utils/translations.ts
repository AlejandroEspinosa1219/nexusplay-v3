import { Language } from '../types';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const translations: Record<Language, any> = {
  en: {
    nav: { home: 'Home', streaming: 'Streaming', music: 'Music', about: 'About', contact: 'Contact', signup: 'Sign Up' },
    hero: {
      badge: 'Premium Subscriptions Live Now',
      title: 'Access All Your Favorite Platforms',
      subtitle: 'One account, unlimited entertainment. Save up to 50% on Netflix, Spotify, and more. Starting at just $5/month.',
      shopNow: 'Shop Now',
      learnMore: 'Learn More'
    },
    sections: {
      streaming: { title: 'Streaming Services', sub: 'ENTERTAINMENT' },
      music: { title: 'Music Services', sub: 'AUDIO & PODCASTS' },
      features: { title: 'Why Choose NexusPlay?', subtitle: 'We simplify your digital life by consolidating subscriptions and offering the best market rates.' },
      testimonials: { title: 'What Users Say', subtitle: 'Trusted by over 10,000 subscribers worldwide.' }
    },
    card: { buyNow: 'Buy Now', month: '/mo', subscription: 'Subscription' },
    modal: {
      checkout: 'Checkout',
      subscribingTo: 'You are subscribing to',
      email: 'Email Address',
      card: 'Card Details',
      pay: 'Pay',
      processing: 'Processing...',
      secure: 'Payments are secure and encrypted.',
      success: 'Success!',
      successMsg: 'Your subscription is now active.',
      done: 'Done'
    },
    footer: {
      tagline: 'The ultimate destination for managing and saving on all your digital subscriptions.',
      platform: 'Platform',
      company: 'Company',
      newsletter: 'Newsletter',
      subscribe: 'Subscribe',
      subText: 'Subscribe to get special offers and updates.',
      rights: 'All rights reserved.',
      links: { privacy: 'Privacy Policy', terms: 'Terms of Service', cookies: 'Cookie Settings' }
    },
    features: {
      oneStop: { title: 'One-Stop Shop', desc: 'Manage all your entertainment subscriptions in a single dashboard.' },
      secure: { title: 'Secure Payments', desc: 'Bank-grade encryption ensures your financial data is always protected.' },
      instant: { title: 'Instant Activation', desc: 'Get immediate access to your accounts as soon as payment is confirmed.' },
      cancel: { title: 'Cancel Anytime', desc: 'No hidden contracts. Cancel your subscription whenever you want.' }
    },
    serviceDescs: {
      netflix: 'Watch Netflix movies & TV shows online or stream right to your smart TV.',
      disney: 'The home for your favorite movies and shows from Disney, Pixar, Marvel, and more.',
      hulu: 'All the TV you love. Stream full seasons of exclusive series, current episodes, and movies.',
      prime: 'Enjoy exclusive Amazon Originals as well as popular movies and TV shows.',
      hbo: 'Say hello to Max, the streaming platform that bundles all of HBO together with more.',
      apple: 'Stream Apple Originals on the Apple TV app. Ad-free. On Demand.',
      spotify: 'Play millions of songs and podcasts on your device. Listen for free.',
      applemusic: 'Listen to over 100 million songs, ad-free. Hear sound all around with Spatial Audio.',
      youtube: 'A new music streaming service from YouTube. Made for music discovery.',
      soundcloud: 'Discover and play over 320 million tracks from 40 million artists on SoundCloud.'
    },
    plans: {
      basic: 'Basic', premium: 'Premium', trio: 'Trio', adSupported: 'Ad-Supported', noAds: 'No Ads',
      monthly: 'Monthly', annual: 'Annual', adLite: 'Ad-Lite', adFree: 'Ad-Free',
      individual: 'Individual', duo: 'Duo', family: 'Family', goPlus: 'Go+', dj: 'DJ'
    }
  },
  es: {
    nav: { home: 'Inicio', streaming: 'Streaming', music: 'Música', about: 'Nosotros', contact: 'Contacto', signup: 'Regístrate' },
    hero: { badge: 'Suscripciones Premium Disponibles', title: 'Accede a tus Plataformas Favoritas', subtitle: 'Una cuenta, entretenimiento ilimitado. Ahorra hasta un 50% en Netflix, Spotify y más. Desde $5/mes.', shopNow: 'Comprar', learnMore: 'Leer Más' },
    sections: { streaming: { title: 'Servicios de Streaming', sub: 'ENTRETENIMIENTO' }, music: { title: 'Servicios de Música', sub: 'AUDIO Y PODCASTS' }, features: { title: '¿Por qué NexusPlay?', subtitle: 'Simplificamos tu vida digital consolidando suscripciones con las mejores tarifas.' }, testimonials: { title: 'Testimonios', subtitle: 'Con la confianza de más de 10,000 suscriptores.' } },
    card: { buyNow: 'Comprar', month: '/mes', subscription: 'Suscripción' },
    modal: { checkout: 'Pagar', subscribingTo: 'Te estás suscribiendo a', email: 'Correo Electrónico', card: 'Datos de la Tarjeta', pay: 'Pagar', processing: 'Procesando...', secure: 'Pagos seguros y encriptados.', success: '¡Éxito!', successMsg: 'Tu suscripción está activa.', done: 'Listo' },
    footer: { tagline: 'El destino definitivo para gestionar tus suscripciones.', platform: 'Plataforma', company: 'Empresa', newsletter: 'Boletín', subscribe: 'Suscribirse', subText: 'Recibe ofertas especiales y actualizaciones.', rights: 'Todos los derechos reservados.', links: { privacy: 'Privacidad', terms: 'Términos', cookies: 'Cookies' } },
    features: { oneStop: { title: 'Todo en Uno', desc: 'Gestiona todas tus suscripciones en un solo panel.' }, secure: { title: 'Pagos Seguros', desc: 'Encriptación bancaria para proteger tus datos.' }, instant: { title: 'Activación Instantánea', desc: 'Acceso inmediato tras confirmar el pago.' }, cancel: { title: 'Cancela Cuando Quieras', desc: 'Sin contratos ocultos. Cancela cuando desees.' } },
    serviceDescs: { netflix: 'Ve películas y series de Netflix online o en tu Smart TV.', disney: 'El hogar de tus películas favoritas de Disney, Pixar, Marvel y más.', hulu: 'Toda la TV que amas. Temporadas completas y series exclusivas.', prime: 'Disfruta de Amazon Originals exclusivos y películas populares.', hbo: 'Di hola a Max, la plataforma que reúne todo HBO y más.', apple: 'Stream Apple Originals en la app Apple TV. Sin anuncios.', spotify: 'Reproduce millones de canciones y podcasts. Escucha gratis.', applemusic: 'Más de 100 millones de canciones sin anuncios con Audio Espacial.', youtube: 'Un nuevo servicio de música de YouTube para descubrir música.', soundcloud: 'Descubre más de 320 millones de pistas de 40 millones de artistas.' },
    plans: { basic: 'Básico', premium: 'Premium', trio: 'Trío', adSupported: 'Con Anuncios', noAds: 'Sin Anuncios', monthly: 'Mensual', annual: 'Anual', adLite: 'Ad-Lite', adFree: 'Ad-Free', individual: 'Individual', duo: 'Dúo', family: 'Familiar', goPlus: 'Go+', dj: 'DJ' }
  },
  fr: {
    nav: { home: 'Accueil', streaming: 'Streaming', music: 'Musique', about: 'À propos', contact: 'Contact', signup: 'S\'inscrire' },
    hero: { badge: 'Abonnements Premium Disponibles', title: 'Accédez à Vos Plateformes Préférées', subtitle: 'Un compte, divertissement illimité. Économisez jusqu\'à 50% sur Netflix, Spotify, etc. Dès 5$/mois.', shopNow: 'Acheter', learnMore: 'En Savoir Plus' },
    sections: { streaming: { title: 'Services de Streaming', sub: 'DIVERTISSEMENT' }, music: { title: 'Services Musicaux', sub: 'AUDIO & PODCASTS' }, features: { title: 'Pourquoi NexusPlay ?', subtitle: 'Nous simplifions votre vie numérique en regroupant vos abonnements au meilleur prix.' }, testimonials: { title: 'Avis Utilisateurs', subtitle: 'Approuvé par plus de 10 000 abonnés.' } },
    card: { buyNow: 'Acheter', month: '/mois', subscription: 'Abonnement' },
    modal: { checkout: 'Paiement', subscribingTo: 'Vous vous abonnez à', email: 'Adresse Email', card: 'Détails de la Carte', pay: 'Payer', processing: 'Traitement...', secure: 'Paiements sécurisés et cryptés.', success: 'Succès !', successMsg: 'Votre abonnement est actif.', done: 'Terminé' },
    footer: { tagline: 'La destination ultime pour gérer vos abonnements numériques.', platform: 'Plateforme', company: 'Entreprise', newsletter: 'Newsletter', subscribe: 'S\'abonner', subText: 'Recevez des offres spéciales.', rights: 'Tous droits réservés.', links: { privacy: 'Confidentialité', terms: 'Conditions', cookies: 'Cookies' } },
    features: { oneStop: { title: 'Tout-en-un', desc: 'Gérez tous vos abonnements sur un seul tableau de bord.' }, secure: { title: 'Paiements Sécurisés', desc: 'Cryptage bancaire pour protéger vos données.' }, instant: { title: 'Activation Instantanée', desc: 'Accès immédiat après confirmation du paiement.' }, cancel: { title: 'Annulez à tout moment', desc: 'Pas de contrats cachés. Annulez quand vous voulez.' } },
    serviceDescs: { netflix: 'Regardez des films et séries Netflix en ligne ou sur votre Smart TV.', disney: 'La maison de vos films préférés Disney, Pixar, Marvel, et plus.', hulu: 'Toute la télé que vous aimez. Saisons complètes et séries exclusives.', prime: 'Profitez des exclusivités Amazon Originals et des films populaires.', hbo: 'Dites bonjour à Max, la plateforme qui regroupe tout HBO.', apple: 'Regardez Apple Originals sur l\'app Apple TV. Sans pub.', spotify: 'Écoutez des millions de chansons et podcasts. Gratuitement.', applemusic: 'Plus de 100 millions de chansons sans pub avec Audio Spatial.', youtube: 'Un nouveau service de musique par YouTube.', soundcloud: 'Découvrez plus de 320 millions de titres.' },
    plans: { basic: 'Basique', premium: 'Premium', trio: 'Trio', adSupported: 'Avec Pubs', noAds: 'Sans Pubs', monthly: 'Mensuel', annual: 'Annuel', adLite: 'Ad-Lite', adFree: 'Ad-Free', individual: 'Individuel', duo: 'Duo', family: 'Famille', goPlus: 'Go+', dj: 'DJ' }
  },
  de: {
    nav: { home: 'Start', streaming: 'Streaming', music: 'Musik', about: 'Über Uns', contact: 'Kontakt', signup: 'Anmelden' },
    hero: { badge: 'Premium-Abos Jetzt Verfügbar', title: 'Zugriff auf alle Ihre Lieblingsplattformen', subtitle: 'Ein Konto, unbegrenzte Unterhaltung. Sparen Sie bis zu 50%. Ab 5 $/Monat.', shopNow: 'Jetzt Kaufen', learnMore: 'Mehr Erfahren' },
    sections: { streaming: { title: 'Streaming-Dienste', sub: 'UNTERHALTUNG' }, music: { title: 'Musik-Dienste', sub: 'AUDIO & PODCASTS' }, features: { title: 'Warum NexusPlay?', subtitle: 'Wir vereinfachen Ihr digitales Leben durch Bündelung von Abonnements.' }, testimonials: { title: 'Was Nutzer sagen', subtitle: 'Vertraut von über 10.000 Abonnenten.' } },
    card: { buyNow: 'Kaufen', month: '/Monat', subscription: 'Abonnement' },
    modal: { checkout: 'Kasse', subscribingTo: 'Sie abonnieren', email: 'E-Mail-Adresse', card: 'Kartendaten', pay: 'Bezahlen', processing: 'Verarbeitung...', secure: 'Zahlungen sind sicher und verschlüsselt.', success: 'Erfolg!', successMsg: 'Ihr Abonnement ist jetzt aktiv.', done: 'Fertig' },
    footer: { tagline: 'Das ultimative Ziel für die Verwaltung Ihrer Abonnements.', platform: 'Plattform', company: 'Firma', newsletter: 'Newsletter', subscribe: 'Abonnieren', subText: 'Erhalten Sie Sonderangebote.', rights: 'Alle Rechte vorbehalten.', links: { privacy: 'Datenschutz', terms: 'AGB', cookies: 'Cookies' } },
    features: { oneStop: { title: 'Alles aus einer Hand', desc: 'Verwalten Sie alle Abos in einem Dashboard.' }, secure: { title: 'Sichere Zahlungen', desc: 'Verschlüsselung auf Bankniveau schützt Ihre Daten.' }, instant: { title: 'Sofortige Aktivierung', desc: 'Sofortiger Zugriff nach Zahlungsbestätigung.' }, cancel: { title: 'Jederzeit kündbar', desc: 'Keine versteckten Verträge. Jederzeit kündbar.' } },
    serviceDescs: { netflix: 'Netflix-Filme & Serien online oder auf dem Smart TV ansehen.', disney: 'Das Zuhause für Ihre Lieblingsfilme von Disney, Pixar, Marvel.', hulu: 'Alles TV, das Sie lieben. Ganze Staffeln und exklusive Serien.', prime: 'Genießen Sie exklusive Amazon Originals und beliebte Filme.', hbo: 'Sagen Sie Hallo zu Max, der Plattform, die alles von HBO bündelt.', apple: 'Streamen Sie Apple Originals auf der Apple TV App.', spotify: 'Millionen von Songs und Podcasts abspielen.', applemusic: 'Über 100 Millionen Songs werbefrei hören.', youtube: 'Ein neuer Musik-Streaming-Dienst von YouTube.', soundcloud: 'Entdecken Sie über 320 Millionen Titel.' },
    plans: { basic: 'Basis', premium: 'Premium', trio: 'Trio', adSupported: 'Mit Werbung', noAds: 'Ohne Werbung', monthly: 'Monatlich', annual: 'Jährlich', adLite: 'Ad-Lite', adFree: 'Werbefrei', individual: 'Einzel', duo: 'Duo', family: 'Familie', goPlus: 'Go+', dj: 'DJ' }
  },
  pt: {
    nav: { home: 'Início', streaming: 'Streaming', music: 'Música', about: 'Sobre', contact: 'Contato', signup: 'Inscrever-se' },
    hero: { badge: 'Assinaturas Premium Disponíveis', title: 'Acesse Todas as Suas Plataformas Favoritas', subtitle: 'Uma conta, entretenimento ilimitado. Economize até 50%. A partir de $5/mês.', shopNow: 'Comprar Agora', learnMore: 'Saiba Mais' },
    sections: { streaming: { title: 'Serviços de Streaming', sub: 'ENTRETENIMENTO' }, music: { title: 'Serviços de Música', sub: 'ÁUDIO & PODCASTS' }, features: { title: 'Por que NexusPlay?', subtitle: 'Simplificamos sua vida digital consolidando assinaturas.' }, testimonials: { title: 'Depoimentos', subtitle: 'Confiança de mais de 10.000 assinantes.' } },
    card: { buyNow: 'Comprar', month: '/mês', subscription: 'Assinatura' },
    modal: { checkout: 'Pagamento', subscribingTo: 'Você está assinando', email: 'E-mail', card: 'Dados do Cartão', pay: 'Pagar', processing: 'Processando...', secure: 'Pagamentos seguros e criptografados.', success: 'Sucesso!', successMsg: 'Sua assinatura está ativa.', done: 'Pronto' },
    footer: { tagline: 'O destino final para gerenciar suas assinaturas.', platform: 'Plataforma', company: 'Empresa', newsletter: 'Newsletter', subscribe: 'Assinar', subText: 'Receba ofertas especiais.', rights: 'Todos os direitos reservados.', links: { privacy: 'Privacidade', terms: 'Termos', cookies: 'Cookies' } },
    features: { oneStop: { title: 'Tudo em Um', desc: 'Gerencie todas as assinaturas em um painel.' }, secure: { title: 'Pagamentos Seguros', desc: 'Criptografia bancária protege seus dados.' }, instant: { title: 'Ativação Instantânea', desc: 'Acesso imediato após confirmação do pagamento.' }, cancel: { title: 'Cancele a Qualquer Momento', desc: 'Sem contratos ocultos. Cancele quando quiser.' } },
    serviceDescs: { netflix: 'Assista filmes e séries Netflix online ou na Smart TV.', disney: 'O lar dos seus filmes favoritos da Disney, Pixar, Marvel.', hulu: 'Toda a TV que você ama. Temporadas completas e séries exclusivas.', prime: 'Desfrute de Amazon Originals exclusivos e filmes populares.', hbo: 'Diga olá para Max, a plataforma que reúne tudo da HBO.', apple: 'Transmita Apple Originals no app Apple TV.', spotify: 'Toque milhões de músicas e podcasts.', applemusic: 'Mais de 100 milhões de músicas sem anúncios.', youtube: 'Um novo serviço de streaming de música do YouTube.', soundcloud: 'Descubra mais de 320 milhões de faixas.' },
    plans: { basic: 'Básico', premium: 'Premium', trio: 'Trio', adSupported: 'Com Anúncios', noAds: 'Sem Anúncios', monthly: 'Mensal', annual: 'Anual', adLite: 'Ad-Lite', adFree: 'Sem Anúncios', individual: 'Individual', duo: 'Duo', family: 'Família', goPlus: 'Go+', dj: 'DJ' }
  },
  zh: {
    nav: { home: '首页', streaming: '流媒体', music: '音乐', about: '关于', contact: '联系', signup: '注册' },
    hero: { badge: '高级订阅现已上线', title: '一站式访问所有您喜爱的平台', subtitle: '一个账户，无限娱乐。Netflix, Spotify 等节省高达 50%。每月仅需 $5 起。', shopNow: '立即购买', learnMore: '了解更多' },
    sections: { streaming: { title: '流媒体服务', sub: '娱乐' }, music: { title: '音乐服务', sub: '音频与播客' }, features: { title: '为什么选择 NexusPlay？', subtitle: '我们整合订阅并提供最佳市场价格，简化您的数字生活。' }, testimonials: { title: '用户评价', subtitle: '全球超过 10,000 名订阅者的信赖。' } },
    card: { buyNow: '立即购买', month: '/月', subscription: '订阅' },
    modal: { checkout: '结账', subscribingTo: '您正在订阅', email: '电子邮件地址', card: '银行卡详情', pay: '支付', processing: '处理中...', secure: '支付安全且已加密。', success: '成功！', successMsg: '您的订阅现已激活。', done: '完成' },
    footer: { tagline: '管理和节省数字订阅费用的终极目的地。', platform: '平台', company: '公司', newsletter: '通讯', subscribe: '订阅', subText: '订阅以获取特别优惠和更新。', rights: '版权所有。', links: { privacy: '隐私政策', terms: '服务条款', cookies: 'Cookie 设置' } },
    features: { oneStop: { title: '一站式商店', desc: '在单个仪表板中管理所有的娱乐订阅。' }, secure: { title: '安全支付', desc: '银行级加密确保您的财务数据始终受保护。' }, instant: { title: '即时激活', desc: '付款确认后立即获得帐户访问权限。' }, cancel: { title: '随时取消', desc: '没有隐藏合同。随时取消您的订阅。' } },
    serviceDescs: { netflix: '在线观看 Netflix 电影和电视节目，或直接流式传输到智能电视。', disney: '迪士尼、皮克斯、漫威等您最喜爱的电影和节目的家园。', hulu: '您喜爱的所有电视节目。流式传输独家系列的全季剧集。', prime: '享受独家 Amazon Originals以及热门电影和电视节目。', hbo: '向 Max 问好，该平台捆绑了所有 HBO 内容。', apple: '在 Apple TV 应用程序上流式传输 Apple Originals。无广告。', spotify: '在您的设备上播放数百万首歌曲和播客。免费收听。', applemusic: '收听超过 1 亿首歌曲，无广告。通过空间音频聆听全方位声音。', youtube: '来自 YouTube 的全新音乐流媒体服务。专为音乐发现而打造。', soundcloud: '在 SoundCloud 上发现并播放来自 4000 万艺术家的超过 3.2 亿首曲目。' },
    plans: { basic: '基础', premium: '高级', trio: '三重奏', adSupported: '含广告', noAds: '无广告', monthly: '月度', annual: '年度', adLite: '轻广告', adFree: '免广告', individual: '个人', duo: '双人', family: '家庭', goPlus: 'Go+', dj: 'DJ' }
  },
  ja: {
    nav: { home: 'ホーム', streaming: 'ストリーミング', music: '音楽', about: '概要', contact: '連絡先', signup: '登録' },
    hero: { badge: 'プレミアム購読開始', title: 'お気に入りのプラットフォームにアクセス', subtitle: '1つのアカウントで無限のエンターテインメント。NetflixやSpotifyなどが最大50%OFF。月額$5から。', shopNow: '今すぐ購入', learnMore: '詳細' },
    sections: { streaming: { title: 'ストリーミング', sub: 'エンターテインメント' }, music: { title: '音楽サービス', sub: 'オーディオ & ポッドキャスト' }, features: { title: 'NexusPlayを選ぶ理由', subtitle: 'サブスクリプションを統合し、最安値で提供することでデジタルライフを簡素化します。' }, testimonials: { title: 'ユーザーの声', subtitle: '世界中の10,000人以上の登録者から信頼されています。' } },
    card: { buyNow: '購入する', month: '/月', subscription: 'サブスクリプション' },
    modal: { checkout: 'チェックアウト', subscribingTo: '申し込み中：', email: 'メールアドレス', card: 'カード情報', pay: '支払う', processing: '処理中...', secure: '支払いは安全に暗号化されています。', success: '成功！', successMsg: 'サブスクリプションが有効になりました。', done: '完了' },
    footer: { tagline: 'デジタルサブスクリプションを管理・節約するための究極の場所。', platform: 'プラットフォーム', company: '会社', newsletter: 'ニュースレター', subscribe: '登録', subText: '特別オファーやアップデートを受け取る。', rights: '全著作権所有。', links: { privacy: 'プライバシー', terms: '利用規約', cookies: 'クッキー' } },
    features: { oneStop: { title: 'ワンストップショップ', desc: 'すべてのエンタメサブスクを一元管理。' }, secure: { title: '安全な支払い', desc: '銀行レベルの暗号化でデータを保護します。' }, instant: { title: '即時有効化', desc: '支払い確認後、すぐにアクセス可能。' }, cancel: { title: 'いつでもキャンセル', desc: '隠された契約はありません。いつでもキャンセル可能。' } },
    serviceDescs: { netflix: 'Netflixの映画やテレビ番組をオンラインやスマートテレビで視聴。', disney: 'ディズニー、ピクサー、マーベルなどの名作が集まる場所。', hulu: '好きなテレビをすべて。独占シリーズや最新エピソードをストリーミング。', prime: 'Amazon Originalsや人気映画・テレビ番組を楽しもう。', hbo: 'HBOのすべてをまとめたプラットフォーム、Maxへようこそ。', apple: 'Apple TVアプリでApple Originalsをストリーミング。広告なし。', spotify: '数百万の曲やポッドキャストを再生。無料で聴けます。', applemusic: '1億曲以上を広告なしで。空間オーディオ対応。', youtube: 'YouTube発の新しい音楽ストリーミングサービス。', soundcloud: '4000万人のアーティストによる3億2000万以上のトラックを発見。' },
    plans: { basic: 'ベーシック', premium: 'プレミアム', trio: 'トリオ', adSupported: '広告あり', noAds: '広告なし', monthly: '月額', annual: '年額', adLite: '広告ライト', adFree: '広告フリー', individual: '個人', duo: 'デュオ', family: 'ファミリー', goPlus: 'Go+', dj: 'DJ' }
  },
  ru: {
    nav: { home: 'Главная', streaming: 'Стриминг', music: 'Музыка', about: 'О нас', contact: 'Контакты', signup: 'Регистрация' },
    hero: { badge: 'Премиум подписки доступны', title: 'Доступ ко всем любимым платформам', subtitle: 'Один аккаунт, безграничные развлечения. Экономьте до 50% на Netflix, Spotify и других. От $5/мес.', shopNow: 'Купить', learnMore: 'Подробнее' },
    sections: { streaming: { title: 'Стриминговые сервисы', sub: 'РАЗВЛЕЧЕНИЯ' }, music: { title: 'Музыкальные сервисы', sub: 'АУДИО И ПОДКАСТЫ' }, features: { title: 'Почему NexusPlay?', subtitle: 'Мы упрощаем вашу цифровую жизнь, объединяя подписки по лучшим ценам.' }, testimonials: { title: 'Отзывы', subtitle: 'Нам доверяют более 10 000 подписчиков по всему миру.' } },
    card: { buyNow: 'Купить', month: '/мес', subscription: 'Подписка' },
    modal: { checkout: 'Оплата', subscribingTo: 'Вы подписываетесь на', email: 'Email', card: 'Данные карты', pay: 'Оплатить', processing: 'Обработка...', secure: 'Платежи защищены и зашифрованы.', success: 'Успешно!', successMsg: 'Ваша подписка активна.', done: 'Готово' },
    footer: { tagline: 'Лучшее место для управления подписками.', platform: 'Платформа', company: 'Компания', newsletter: 'Рассылка', subscribe: 'Подписаться', subText: 'Получайте специальные предложения.', rights: 'Все права защищены.', links: { privacy: 'Конфиденциальность', terms: 'Условия', cookies: 'Cookies' } },
    features: { oneStop: { title: 'Всё в одном', desc: 'Управляйте всеми подписками в одном месте.' }, secure: { title: 'Безопасная оплата', desc: 'Банковское шифрование защищает ваши данные.' }, instant: { title: 'Мгновенная активация', desc: 'Доступ сразу после оплаты.' }, cancel: { title: 'Отмена в любое время', desc: 'Никаких скрытых контрактов. Отменяйте когда угодно.' } },
    serviceDescs: { netflix: 'Смотрите фильмы и сериалы Netflix онлайн или на Smart TV.', disney: 'Дом для ваших любимых фильмов от Disney, Pixar, Marvel и других.', hulu: 'Всё ТВ, которое вы любите. Полные сезоны и эксклюзивы.', prime: 'Наслаждайтесь эксклюзивами Amazon Originals и популярными фильмами.', hbo: 'Встречайте Max, платформу, объединяющую всё от HBO.', apple: 'Смотрите Apple Originals в приложении Apple TV. Без рекламы.', spotify: 'Миллионы песен и подкастов на вашем устройстве. Слушайте бесплатно.', applemusic: 'Более 100 млн песен без рекламы и с пространственным аудио.', youtube: 'Новый музыкальный сервис от YouTube.', soundcloud: 'Открывайте более 320 млн треков от 40 млн исполнителей.' },
    plans: { basic: 'Базовый', premium: 'Премиум', trio: 'Трио', adSupported: 'С рекламой', noAds: 'Без рекламы', monthly: 'Месячный', annual: 'Годовой', adLite: 'Лайт', adFree: 'Без рекламы', individual: 'Индивидуальный', duo: 'Дуо', family: 'Семейный', goPlus: 'Go+', dj: 'DJ' }
  },
};