import CoreConcept from "./CoreConcept";
import {CORE_CONCEPTS} from "../data";
import Section from "./Section";

export default function CoreConcepts() {
    return (
        <Section id="core-concepts" title="Core Concepts">
            <ul>
                {CORE_CONCEPTS.map((conceptItem) => (
                    <CoreConcept key={conceptItem.title} {...conceptItem}/>
                ))}
            </ul>
        </Section>
    )
}
