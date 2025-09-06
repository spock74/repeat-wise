'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"

export default function ManagePage() {
    const t = useTranslations('Manage');

    const questionSets = [
        { name: t('exampleSets.set1.name'), discipline: t('exampleSets.set1.discipline'), topic: t('exampleSets.set1.topic'), questions: 45, nextReview: t('exampleSets.set1.nextReview') },
        { name: t('exampleSets.set2.name'), discipline: t('exampleSets.set2.discipline'), topic: t('exampleSets.set2.topic'), questions: 82, nextReview: t('exampleSets.set2.nextReview') },
        { name: t('exampleSets.set3.name'), discipline: t('exampleSets.set3.discipline'), topic: t('exampleSets.set3.topic'), questions: 120, nextReview: t('exampleSets.set3.nextReview') },
        { name: t('exampleSets.set4.name'), discipline: t('exampleSets.set4.discipline'), topic: t('exampleSets.set4.topic'), questions: 33, nextReview: t('exampleSets.set4.nextReview') },
    ];

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>{t('title')}</CardTitle>
                    <CardDescription>
                        {t('description')}
                    </CardDescription>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {t('newSet')}
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('setName')}</TableHead>
                            <TableHead>{t('discipline')}</TableHead>
                            <TableHead>{t('topic')}</TableHead>
                            <TableHead className="text-right">{t('questions')}</TableHead>
                            <TableHead>{t('nextReview')}</TableHead>
                            <TableHead>
                                <span className="sr-only">{t('actions')}</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {questionSets.map((set) => (
                            <TableRow key={set.name}>
                                <TableCell className="font-medium">{set.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{set.discipline}</Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{set.topic}</TableCell>
                                <TableCell className="text-right">{set.questions}</TableCell>
                                <TableCell>{set.nextReview}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                                        <DropdownMenuItem>{t('edit')}</DropdownMenuItem>
                                        <DropdownMenuItem>{t('study')}</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">{t('delete')}</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
