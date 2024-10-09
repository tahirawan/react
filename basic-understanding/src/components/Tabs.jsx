export default function Tabs({ buttons, ButtonsContainer = 'menu', children }) {
    return (
        <>
            <ButtonsContainer>
                { buttons }
            </ButtonsContainer>
            { children }
        </>
    )
}

