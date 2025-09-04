'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  generateQuestionsFromParameters,
  type GenerateQuestionsFromParametersInput,
} from '@/ai/flows/generate-questions-from-parameters';
import {
  generateQuestionsFromDocument,
  type GenerateQuestionsFromDocumentInput,
} from '@/ai/flows/generate-questions-from-document';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, FileUp, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const paramsFormSchema = z.object({
  topic: z.string().min(2, { message: 'Topic must be at least 2 characters.' }),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  numberOfQuestions: z.coerce.number().int().min(1).max(10),
  questionType: z.enum(['multiple-choice', 'open-response', 'quiz']),
});

const docFormSchema = z.object({
  documentDataUri: z.string().startsWith('data:', {message: "Please upload a valid document."}),
  questionType: z.enum(['multiple-choice', 'open-response', 'quiz']),
  numberOfQuestions: z.coerce.number().int().min(1).max(10),
});

function GenerateFromParametersForm({ setGeneratedQuestions }: { setGeneratedQuestions: (q: string[]) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof paramsFormSchema>>({
    resolver: zodResolver(paramsFormSchema),
    defaultValues: {
      topic: '',
      difficulty: 'medium',
      numberOfQuestions: 5,
      questionType: 'multiple-choice',
    },
  });

  async function onSubmit(values: z.infer<typeof paramsFormSchema>) {
    setIsSubmitting(true);
    setGeneratedQuestions([]);
    try {
      const result = await generateQuestionsFromParameters(values as GenerateQuestionsFromParametersInput);
      setGeneratedQuestions(result.questions);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Generating Questions",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="e.g., The Renaissance" {...field} />
              </FormControl>
              <FormDescription>What subject are the questions about?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="questionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="open-response">Open Response</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="numberOfQuestions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Questions (1-10)</FormLabel>
              <FormControl>
                <Input type="number" min="1" max="10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> Generate Questions</>
          )}
        </Button>
      </form>
    </Form>
  );
}

function GenerateFromDocumentForm({ setGeneratedQuestions }: { setGeneratedQuestions: (q: string[]) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();
  const form = useForm<z.infer<typeof docFormSchema>>({
    resolver: zodResolver(docFormSchema),
    defaultValues: {
      questionType: 'multiple-choice',
      numberOfQuestions: 5,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUri = loadEvent.target?.result as string;
        form.setValue('documentDataUri', dataUri, { shouldValidate: true });
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };
  
  async function onSubmit(values: z.infer<typeof docFormSchema>) {
    setIsSubmitting(true);
    setGeneratedQuestions([]);
    try {
      const result = await generateQuestionsFromDocument(values as GenerateQuestionsFromDocumentInput);
      setGeneratedQuestions(result.questions);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Generating Questions",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="documentDataUri"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="file" className="w-full h-10 opacity-0 absolute inset-0 z-10 cursor-pointer" accept=".pdf,.docx,.txt,.md" onChange={handleFileChange} />
                  <Button type="button" variant="outline" className="w-full h-10">
                    <FileUp className="mr-2 h-4 w-4" />
                    {fileName || 'Upload PDF, DOCX, TXT, or MD'}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="questionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="open-response">Open Response</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfQuestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Questions (1-10)</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting || !fileName}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> Generate Questions</>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default function GenerateForm() {
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  return (
    <div className="space-y-8">
      <Tabs defaultValue="topic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="topic">From Topic</TabsTrigger>
          <TabsTrigger value="document">From Document</TabsTrigger>
        </TabsList>
        <TabsContent value="topic" className="mt-6">
          <GenerateFromParametersForm setGeneratedQuestions={setGeneratedQuestions} />
        </TabsContent>
        <TabsContent value="document" className="mt-6">
          <GenerateFromDocumentForm setGeneratedQuestions={setGeneratedQuestions} />
        </TabsContent>
      </Tabs>
      {generatedQuestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Generated Questions</h3>
          <Textarea value={generatedQuestions.join('\n\n')} readOnly rows={10} className="bg-muted" />
          <Button>Save Questions</Button>
        </div>
      )}
    </div>
  );
}
