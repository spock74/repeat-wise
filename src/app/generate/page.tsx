import GenerateForm from '@/components/generate/generate-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function GeneratePage() {
  return (
    <div className="flex justify-center items-start pt-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Adaptive Question Generation</CardTitle>
          <CardDescription>
            Use AI to create questions from your documents or by topic.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GenerateForm />
        </CardContent>
      </Card>
    </div>
  );
}
