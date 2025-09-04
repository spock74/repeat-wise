import QuestionViewer from "@/components/study/question-viewer";

export default function StudyPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Study Session</h1>
                <p className="text-muted-foreground">Focus and review your questions.</p>
            </div>
            <QuestionViewer />
        </div>
    );
}
