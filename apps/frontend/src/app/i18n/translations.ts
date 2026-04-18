export type AppLanguage = 'en' | 'ar';

export const languageDirections: Record<AppLanguage, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
};

type TranslationParams = Record<string, string | number>;

type TranslationMap = Record<AppLanguage, Record<string, string>>;

const translations: TranslationMap = {
  en: {
    'common.language': 'Language',
    'common.english': 'English',
    'common.arabic': 'Arabic',
    'common.unexpectedError': 'An unexpected error occurred',
    'common.loading': 'Loading...',

    'navbar.contactUs': 'Contact Us',
    'navbar.dashboard': 'Dashboard',
    'navbar.logout': 'Logout',
    'navbar.login': 'Login',
    'navbar.register': 'Register',

    'landing.hero.prefix': 'Are you ready to face the',
    'landing.hero.emphasis': 'truth?',
    'landing.hero.description':
      'Get honest feedback from your friends and coworkers anonymously, discover your strengths, and address your weaknesses.',
    'landing.hero.registerNow': 'Register Now',
    'landing.hero.login': 'Login',
    'landing.features.work.title': 'At Work',
    'landing.features.work.point1': 'Enhance your strengths',
    'landing.features.work.point2': 'Address your weaknesses',
    'landing.features.work.point3': 'Build professional transparency',
    'landing.features.friends.title': 'With Friends',
    'landing.features.friends.point1': 'Strengthen your friendships',
    'landing.features.friends.point2': 'Let your friends be honest',
    'landing.features.friends.point3': 'Know what people really think',
    'landing.footer.feedback': 'Feedback',
    'landing.footer.privacy': 'Privacy & Terms',
    'landing.footer.facebookGroup': 'Facebook Group',
    'landing.footer.contact': 'Contact Us',
    'landing.footer.copyright': '© Saraha 2026. All rights reserved.',

    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Login to check your messages',
    'auth.login.footerText': "Don't have an account?",
    'auth.login.footerLink': 'Register',
    'auth.login.emailOrUsername': 'Email or Username',
    'auth.login.emailPlaceholder': 'Enter your email',
    'auth.login.password': 'Password',
    'auth.login.forgot': 'Forgot?',
    'auth.login.submit': 'Login',
    'auth.login.submitting': 'Logging in...',
    'auth.login.google': 'Login with Google',
    'auth.login.facebook': 'Login with Facebook',
    'auth.login.success': 'Login successful! Welcome back.',
    'auth.login.failed': 'Login failed',
    'auth.login.socialPrompt': 'Paste your {provider} access token',
    'auth.login.socialSuccess': 'Logged in with {provider}',
    'auth.login.socialFailed': 'Failed to login with {provider}',

    'auth.register.title': 'Join the community',
    'auth.register.subtitle': 'Create your account in seconds',
    'auth.register.footerText': 'Already have an account?',
    'auth.register.footerLink': 'Login',
    'auth.register.firstName': 'First Name',
    'auth.register.lastName': 'Last Name',
    'auth.register.username': 'Unique Username',
    'auth.register.email': 'Email Address',
    'auth.register.password': 'Password',
    'auth.register.submit': 'Create Account',
    'auth.register.submitting': 'Creating...',
    'auth.register.google': 'Signup with Google',
    'auth.register.facebook': 'Signup with Facebook',
    'auth.register.success': 'Registration successful! Please login.',
    'auth.register.failed': 'Registration failed',
    'auth.register.socialSuccess': 'Signed up with {provider}',
    'auth.register.socialFailed': 'Failed to signup with {provider}',

    'auth.input.showPassword': 'Show password',
    'auth.input.hidePassword': 'Hide password',

    'dashboard.header.titlePrefix': 'My',
    'dashboard.header.titleEmphasis': 'Messages',
    'dashboard.header.received': '{count} Messages received',
    'dashboard.message.date2Hours': '2 hours ago',
    'dashboard.message.date5Hours': '5 hours ago',
    'dashboard.message.date1Day': '1 day ago',
    'dashboard.sidebar.yourLink': 'Your Link',
    'dashboard.sidebar.copyLink': 'Copy Link',
    'dashboard.sidebar.inbox': 'Inbox',
    'dashboard.sidebar.favorites': 'Favorites',
    'dashboard.sidebar.publicWall': 'Public Wall',
    'dashboard.sidebar.settings': 'Settings',

    'settings.page.titlePrefix': 'Account',
    'settings.page.titleEmphasis': 'Settings',
    'settings.profile.title': 'Profile Information',
    'settings.profile.displayName': 'Display Name',
    'settings.profile.updateName': 'Update Name',
    'settings.security.title': 'Security',
    'settings.security.changePassword': 'Change Password',
    'settings.danger.title': 'Danger Zone',
    'settings.danger.description':
      'Once you delete your account, there is no going back. Please be certain.',
    'settings.danger.delete': 'Delete Account',

    'profile.title': 'Send message to',
    'profile.subtitle': 'Leave a constructive message anonymously',
    'profile.placeholder': 'Type your anonymous message here...',
    'profile.send': 'Send Message Anonymously',
    'profile.footer.prompt': 'Want to receive anonymous messages?',
    'profile.footer.link': 'Create your account',

    'contact.titlePrefix': 'Contact',
    'contact.titleEmphasis': 'Us',
    'contact.subtitle': "Have questions or feedback? We'd love to hear from you.",
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',

    'privacy.titlePrefix': 'Privacy',
    'privacy.titleEmphasis': 'Policy',
    'privacy.intro':
      'At Saraha, we take your privacy seriously. This policy describes how we collect, use, and handle your information.',
    'privacy.section1.title': '1. Data Collection',
    'privacy.section1.body':
      'We collect minimal data required to provide our services, including your email and username.',
    'privacy.section2.title': '2. Anonymity',
    'privacy.section2.body':
      'Messages sent through Saraha are intended to be anonymous. We do not share sender identities with recipients unless required by law.',

    'terms.titlePrefix': 'Terms of',
    'terms.titleEmphasis': 'Use',
    'terms.intro':
      'By using Saraha, you agree to the following terms and conditions.',
    'terms.section1.title': '1. Acceptable Use',
    'terms.section1.body':
      'You agree not to use the service for harassment, bullying, or any illegal activities.',
    'terms.section2.title': '2. Termination',
    'terms.section2.body':
      'We reserve the right to terminate accounts that violate our community guidelines.',
  },
  ar: {
    'common.language': 'اللغة',
    'common.english': 'الإنجليزية',
    'common.arabic': 'العربية',
    'common.unexpectedError': 'حدث خطأ غير متوقع',
    'common.loading': 'جارٍ التحميل...',

    'navbar.contactUs': 'تواصل معنا',
    'navbar.dashboard': 'لوحة التحكم',
    'navbar.logout': 'تسجيل الخروج',
    'navbar.login': 'تسجيل الدخول',
    'navbar.register': 'إنشاء حساب',

    'landing.hero.prefix': 'هل أنت مستعد لمواجهة',
    'landing.hero.emphasis': 'الحقيقة؟',
    'landing.hero.description':
      'احصل على آراء صادقة من أصدقائك وزملائك بشكل مجهول، واكتشف نقاط قوتك، وحسّن نقاط ضعفك.',
    'landing.hero.registerNow': 'سجل الآن',
    'landing.hero.login': 'تسجيل الدخول',
    'landing.features.work.title': 'في العمل',
    'landing.features.work.point1': 'طوّر نقاط قوتك',
    'landing.features.work.point2': 'عالج نقاط ضعفك',
    'landing.features.work.point3': 'ابنِ شفافية مهنية',
    'landing.features.friends.title': 'مع الأصدقاء',
    'landing.features.friends.point1': 'قوّ صداقاتك',
    'landing.features.friends.point2': 'دع أصدقاءك يكونون صادقين',
    'landing.features.friends.point3': 'اعرف ما يفكر به الناس فعلًا',
    'landing.footer.feedback': 'ملاحظات',
    'landing.footer.privacy': 'الخصوصية والشروط',
    'landing.footer.facebookGroup': 'مجموعة فيسبوك',
    'landing.footer.contact': 'تواصل معنا',
    'landing.footer.copyright': '© صراحة 2026. جميع الحقوق محفوظة.',

    'auth.login.title': 'مرحبًا بعودتك',
    'auth.login.subtitle': 'سجّل الدخول لعرض رسائلك',
    'auth.login.footerText': 'ليس لديك حساب؟',
    'auth.login.footerLink': 'إنشاء حساب',
    'auth.login.emailOrUsername': 'البريد الإلكتروني أو اسم المستخدم',
    'auth.login.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'auth.login.password': 'كلمة المرور',
    'auth.login.forgot': 'نسيت؟',
    'auth.login.submit': 'تسجيل الدخول',
    'auth.login.submitting': 'جارٍ تسجيل الدخول...',
    'auth.login.google': 'الدخول عبر Google',
    'auth.login.facebook': 'الدخول عبر Facebook',
    'auth.login.success': 'تم تسجيل الدخول بنجاح!',
    'auth.login.failed': 'فشل تسجيل الدخول',
    'auth.login.socialPrompt': 'ألصق رمز وصول {provider}',
    'auth.login.socialSuccess': 'تم تسجيل الدخول عبر {provider}',
    'auth.login.socialFailed': 'تعذر تسجيل الدخول عبر {provider}',

    'auth.register.title': 'انضم إلى المجتمع',
    'auth.register.subtitle': 'أنشئ حسابك خلال ثوانٍ',
    'auth.register.footerText': 'لديك حساب بالفعل؟',
    'auth.register.footerLink': 'تسجيل الدخول',
    'auth.register.firstName': 'الاسم الأول',
    'auth.register.lastName': 'اسم العائلة',
    'auth.register.username': 'اسم مستخدم فريد',
    'auth.register.email': 'البريد الإلكتروني',
    'auth.register.password': 'كلمة المرور',
    'auth.register.submit': 'إنشاء حساب',
    'auth.register.submitting': 'جارٍ الإنشاء...',
    'auth.register.google': 'إنشاء عبر Google',
    'auth.register.facebook': 'إنشاء عبر Facebook',
    'auth.register.success': 'تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.',
    'auth.register.failed': 'فشل إنشاء الحساب',
    'auth.register.socialSuccess': 'تم إنشاء الحساب عبر {provider}',
    'auth.register.socialFailed': 'تعذر إنشاء الحساب عبر {provider}',

    'auth.input.showPassword': 'إظهار كلمة المرور',
    'auth.input.hidePassword': 'إخفاء كلمة المرور',

    'dashboard.header.titlePrefix': 'رسائلي',
    'dashboard.header.titleEmphasis': '',
    'dashboard.header.received': 'تم استلام {count} رسالة',
    'dashboard.message.date2Hours': 'منذ ساعتين',
    'dashboard.message.date5Hours': 'منذ 5 ساعات',
    'dashboard.message.date1Day': 'منذ يوم',
    'dashboard.sidebar.yourLink': 'رابطك',
    'dashboard.sidebar.copyLink': 'نسخ الرابط',
    'dashboard.sidebar.inbox': 'الوارد',
    'dashboard.sidebar.favorites': 'المفضلة',
    'dashboard.sidebar.publicWall': 'الحائط العام',
    'dashboard.sidebar.settings': 'الإعدادات',

    'settings.page.titlePrefix': 'إعدادات',
    'settings.page.titleEmphasis': 'الحساب',
    'settings.profile.title': 'معلومات الملف الشخصي',
    'settings.profile.displayName': 'الاسم الظاهر',
    'settings.profile.updateName': 'تحديث الاسم',
    'settings.security.title': 'الأمان',
    'settings.security.changePassword': 'تغيير كلمة المرور',
    'settings.danger.title': 'منطقة الخطر',
    'settings.danger.description':
      'عند حذف حسابك، لا يمكن التراجع. يرجى التأكد قبل المتابعة.',
    'settings.danger.delete': 'حذف الحساب',

    'profile.title': 'أرسل رسالة إلى',
    'profile.subtitle': 'اترك رسالة بنّاءة بشكل مجهول',
    'profile.placeholder': 'اكتب رسالتك المجهولة هنا...',
    'profile.send': 'إرسال الرسالة بشكل مجهول',
    'profile.footer.prompt': 'هل تريد استقبال رسائل مجهولة؟',
    'profile.footer.link': 'أنشئ حسابك',

    'contact.titlePrefix': 'تواصل',
    'contact.titleEmphasis': 'معنا',
    'contact.subtitle': 'هل لديك أسئلة أو ملاحظات؟ يسعدنا سماع رأيك.',
    'contact.form.name': 'الاسم',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.message': 'الرسالة',
    'contact.form.send': 'إرسال الرسالة',

    'privacy.titlePrefix': 'سياسة',
    'privacy.titleEmphasis': 'الخصوصية',
    'privacy.intro':
      'في صراحة، نأخذ خصوصيتك على محمل الجد. توضح هذه السياسة كيفية جمع معلوماتك واستخدامها والتعامل معها.',
    'privacy.section1.title': '1. جمع البيانات',
    'privacy.section1.body':
      'نجمع الحد الأدنى من البيانات اللازمة لتقديم خدماتنا، بما في ذلك بريدك الإلكتروني واسم المستخدم.',
    'privacy.section2.title': '2. إخفاء الهوية',
    'privacy.section2.body':
      'الرسائل المرسلة عبر صراحة يُفترض أن تكون مجهولة. لا نشارك هوية المرسل مع المستلم إلا إذا طُلب ذلك قانونيًا.',

    'terms.titlePrefix': 'شروط',
    'terms.titleEmphasis': 'الاستخدام',
    'terms.intro': 'باستخدامك صراحة، فأنت توافق على الشروط والأحكام التالية.',
    'terms.section1.title': '1. الاستخدام المقبول',
    'terms.section1.body':
      'توافق على عدم استخدام الخدمة للمضايقة أو التنمر أو أي أنشطة غير قانونية.',
    'terms.section2.title': '2. إنهاء الحساب',
    'terms.section2.body':
      'نحتفظ بالحق في إنهاء الحسابات التي تنتهك إرشادات مجتمعنا.',
  },
};

export function getDirection(language: AppLanguage): 'ltr' | 'rtl' {
  return languageDirections[language];
}

export function parseLanguage(value: string | null | undefined): AppLanguage {
  return value === 'ar' ? 'ar' : 'en';
}

export function translate(
  language: AppLanguage,
  key: string,
  params?: TranslationParams,
): string {
  const template = translations[language][key] ?? translations.en[key] ?? key;
  if (!params) {
    return template;
  }

  return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
    return acc.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
  }, template);
}
