import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
    return (
        <>
            <MainNavigation/>
            <main>
                <h1>Sorry, there was an error.</h1>
                <p>Could not find this page.</p>
            </main>
        </>
    );
}

export default ErrorPage;
