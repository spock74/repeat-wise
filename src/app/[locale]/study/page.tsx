import QuestionViewer from "@/components/study/question-viewer";
import { getTranslator } from 'next-intl/server';

export default async function StudyPage({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslator(locale, 'Study');
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
                <p className="text-muted-foreground">{t('description')}</p>
            </div>
            <QuestionViewer t={t} />
        </div>
    );
}
