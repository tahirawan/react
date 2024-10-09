import {useState} from "react";

import TabButton from "./TabButton";
import {EXAMPLES} from "../data";
import Section from "./Section";
import Tabs from "./Tabs";

export default function Examples() {
    let [selectedTopic, setSelectedTopic] = useState('');

    function handleSelect(topic) {
        // console.log('Hello World!! Selected: ' + topic);
        setSelectedTopic(topic);
    }

    let tabContent = <p>Please select a topic.</p>;

    if (selectedTopic) {
        tabContent = (
            <div id="tab-content">
                <h3>{EXAMPLES[selectedTopic].title}</h3>
                <p>{EXAMPLES[selectedTopic].description}</p>
                <pre>
                    <code>
                        {EXAMPLES[selectedTopic].code}
                    </code>
                </pre>
            </div>
        );
    }

    return (
        <Section title="Examples" id="examples">
            <Tabs
                buttons={
                <>
                    <TabButton
                        isSelected={selectedTopic === 'components'}
                        onClick={() => handleSelect('components')}
                    >
                        Components
                    </TabButton>
                    <TabButton
                        isSelected={selectedTopic === 'jsx'}
                        onClick={() => handleSelect('jsx')}
                    >
                        JSX
                    </TabButton>
                    <TabButton
                        isSelected={selectedTopic === 'props'}
                        onClick={() => handleSelect('props')}
                    >
                        Props
                    </TabButton>
                    <TabButton
                        isSelected={selectedTopic === 'state'}
                        onClick={() => handleSelect('state')}
                    >
                        State
                    </TabButton>
                </>
            }>
                {tabContent}
            </Tabs>
        </Section>
    )
}
