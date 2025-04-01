import quizLogo from '../assets/quiz-logo.png';

export function Header() {
    return (
        <header>
            <img src={quizLogo} alt="QuizLogo"/>
            <h1>ReactQuiz</h1>
        </header>
    );
}
