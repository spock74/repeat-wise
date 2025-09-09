import GenerateForm from '@/components/generate/generate-form';
import { getTranslations } from 'next-intl/server';

export default async function GeneratePage() {
    const t = await getTranslations('Generate');
    const tValidation = await getTranslations('Validation');
    
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
                <p className="text-muted-foreground">{t('description')}</p>
            </div>
            <GenerateForm />
        </div>
    );
}
