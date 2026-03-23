import '../styles/TableOfContent.styles.js';

const TableOfContent = ({ guides }) => {
    {
        return (
            <nav>
                <ul>
                    {guides.flatMap(g =>
                        g.steps
                            .filter((step) => step.title.trim() !== "")
                            .map((step, index) => (
                                <li key={`${g._id} - ${index}`}>
                                    <a href={`#${g._id}-${step.title.replace(/\s+/g, "-")}`}> {step.title} </a>
                                </li>
                            ))
                    )}
                </ul>
            </nav>
        )
    };
}

export default TableOfContent;