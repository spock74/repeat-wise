import QuestionViewer from "@/components/study/question-viewer";
import { useTranslations } from "next-intl";

export default function StudyPage() {
    const t = useTranslations('Study');
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
                <p className="text-muted-foreground">{t('description')}</p>
            </div>
            <QuestionViewer />
        </div>
    );
}
