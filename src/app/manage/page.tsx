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

const questionSets = [
    { name: "Biology 101", discipline: "Science", topic: "Cell Biology", questions: 45, nextReview: "2 days" },
    { name: "WWII History", discipline: "History", topic: "European Theater", questions: 82, nextReview: "Tomorrow" },
    { name: "JavaScript Fundamentals", discipline: "Programming", topic: "ES6+", questions: 120, nextReview: "Today" },
    { name: "Art History: Renaissance", discipline: "Arts", topic: "Italian Renaissance", questions: 33, nextReview: "5 days" },
];


export default function ManagePage() {
    const t = useTranslations('Manage');

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
