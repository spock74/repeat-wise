'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Check, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from 'next-intl';

const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 'Paris',
  },
  {
    id: 2,
    type: 'open-response',
    question: 'Explain the theory of relativity in simple terms.',
    answer: 'A theory developed by Albert Einstein that describes the relationship between space and time. A key idea is that the laws of physics are the same for all non-accelerating observers.',
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    answer: 'Mars',
  },
];

export default function QuestionViewer() {
  const t = useTranslations('Study');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    setShowAnswer(false);
    setUserAnswer('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setUserAnswer('');
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const renderQuestionBody = () => {
    if (showAnswer) {
      return (
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <p className="font-semibold">{t('correctAnswer')}</p>
          <p>{currentQuestion.answer}</p>
        </div>
      );
    }

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <RadioGroup value={userAnswer} onValueChange={setUserAnswer} className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="font-normal text-base">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'open-response':
        return (
          <Textarea
            placeholder={t('yourAnswer')}
            rows={5}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    if(type === 'multiple-choice') return t('multipleChoice')
    if(type === 'open-response') return t('openResponse')
    return type;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
            <CardTitle>{t('question')} {currentQuestionIndex + 1}</CardTitle>
            <span className="text-sm text-muted-foreground capitalize">{getQuestionTypeLabel(currentQuestion.type)}</span>
        </div>
        <p className="text-lg font-semibold">{currentQuestion.question}</p>
      </CardHeader>
      <CardContent className="min-h-[150px]">
        {renderQuestionBody()}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <Button variant="outline" onClick={() => setShowAnswer(!showAnswer)}>
            {showAnswer ? <RefreshCw className="mr-2 h-4 w-4" /> : <Check className="mr-2 h-4 w-4" />}
            {showAnswer ? t('tryAgain') : t('showAnswer')}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t('prev')}
            </Button>
            <Button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
              {t('next')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </CardFooter>
    </Card>
  );
}
