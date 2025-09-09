import GenerateForm from '@/components/generate/generate-form';
import { getTranslator } from 'next-intl/server';

export default async function GeneratePage({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslator(locale, 'Generate');
    const tValidation = await getTranslator(locale, 'Validation');
    
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
                <p className="text-muted-foreground">{t('description')}</p>
            </div>
            <GenerateForm t={t} tValidation={tValidation} />
        </div>
    );
}
