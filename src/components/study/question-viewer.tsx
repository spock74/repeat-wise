'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Check, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useAnimationStore } from '@/store/animation';
import { cn } from '@/lib/utils';

import { useTranslations } from 'next-intl';

export default function QuestionViewer() {
  const t = useTranslations('Study');
  const { useCardAnimation } = useAnimationStore();

  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: t('exampleQuestions.q1.question'),
      options: [
        t('exampleQuestions.q1.options.a'),
        t('exampleQuestions.q1.options.b'),
        t('exampleQuestions.q1.options.c'),
        t('exampleQuestions.q1.options.d'),
      ],
      answer: t('exampleQuestions.q1.answer'),
    },
    {
      id: 2,
      type: 'open-response',
      question: t('exampleQuestions.q2.question'),
      answer: t('exampleQuestions.q2.answer'),
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: t('exampleQuestions.q3.question'),
      options: [
        t('exampleQuestions.q3.options.a'),
        t('exampleQuestions.q3.options.b'),
        t('exampleQuestions.q3.options.c'),
        t('exampleQuestions.q3.options.d'),
      ],
      answer: t('exampleQuestions.q3.answer'),
    },
  ];

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
    if (currentQuestion.type === 'multiple-choice') {
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
    }
    if (currentQuestion.type === 'open-response') {
      return (
        <Textarea
          placeholder={t('yourAnswer')}
          rows={5}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
      );
    }
    return null;
  };
  
  const getQuestionTypeLabel = (type: string) => {
    if(type === 'multiple-choice') return t('multipleChoice')
    if(type === 'open-response') return t('openResponse')
    return type;
  }

  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  const motionProps = {
    variants: flipVariants,
    initial: "front",
    animate: showAnswer ? "back" : "front",
    transition: { duration: 0.6, ease: "easeInOut" },
    style: { transformStyle: "preserve-3d" as const },
  };

  return (
    <div style={{ perspective: "1200px" }}>
        <motion.div {...(useCardAnimation ? motionProps : {})}>
            <Card className={cn("w-full max-w-3xl mx-auto", useCardAnimation && "backface-hidden")}>
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

            {useCardAnimation && (
                <Card className="w-full max-w-3xl mx-auto absolute top-0 left-0 right-0 backface-hidden" style={{transform: "rotateY(180deg)"}}>
                    <CardHeader>
                        <div className="flex justify-between items-center mb-2">
                            <CardTitle>{t('question')} {currentQuestionIndex + 1}</CardTitle>
                            <span className="text-sm text-muted-foreground capitalize">{getQuestionTypeLabel(currentQuestion.type)}</span>
                        </div>
                        <p className="text-lg font-semibold">{currentQuestion.question}</p>
                    </CardHeader>
                    <CardContent className="min-h-[150px]">
                        <div className="space-y-4">
                            <p className="font-semibold text-lg">{t('correctAnswer')}</p>
                            <p>{currentQuestion.answer}</p>
                        </div>
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
            )}
        </motion.div>
        
        {!useCardAnimation && showAnswer && (
             <Card className="w-full max-w-3xl mx-auto mt-4">
                <CardHeader>
                    <CardTitle>{t('correctAnswer')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{currentQuestion.answer}</p>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
